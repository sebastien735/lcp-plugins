// ============================================================================
//  LCP — Transfert Fiche Étiquette → Illustrator
//  Colle les données copiées depuis l'app (bouton « 🎨 Illustrator »)
//  et remplit les blocs de texte nommés du document ouvert.
//
//  Blocs de texte à nommer dans le gabarit (panneau Calques) :
//    denomination, poids_net, lot, quid, ingredients,
//    nutri_kcal, nutri_kj, nutri_fat, nutri_satfat, nutri_carbs,
//    nutri_sugars, nutri_fiber, nutri_prot, nutri_salt
//  (facultatifs : client, mo, date, quantite)
//
//  Gras des allergènes : créer un style de caractère nommé « Allergene »
//  (en gras) dans le document. Le script l'applique automatiquement.
// ============================================================================

#target illustrator

(function () {
  if (app.documents.length === 0) {
    alert("Ouvre d'abord ton fichier étiquette dans Illustrator, puis relance le script.");
    return;
  }

  // — Fenêtre de collage —
  var dlg = new Window('dialog', 'Transfert LCP → Illustrator');
  dlg.orientation = 'column';
  dlg.alignChildren = 'fill';
  dlg.add('statictext', undefined,
    "Colle ici les données copiées dans l'app (bouton « 🎨 Illustrator ») :");
  var ed = dlg.add('edittext', undefined, '', { multiline: true, scrollable: true });
  ed.preferredSize = [520, 200];
  var g = dlg.add('group'); g.alignment = 'right';
  g.add('button', undefined, 'Annuler', { name: 'cancel' });
  g.add('button', undefined, 'Remplir', { name: 'ok' });
  if (dlg.show() != 1) return;

  var raw = ed.text;
  if (!raw || !raw.replace(/\s/g, '')) { alert('Rien à coller.'); return; }

  var data;
  try { data = eval('(' + raw + ')'); }
  catch (e) { alert('Données illisibles (copie incomplète ?).\n\n' + e); return; }

  var doc = app.activeDocument;
  var report = [];

  function findFrame(name) {
    for (var i = 0; i < doc.textFrames.length; i++) {
      if (doc.textFrames[i].name === name) return doc.textFrames[i];
    }
    return null;
  }
  function setText(name, val) {
    if (val === undefined || val === null) return;
    var f = findFrame(name);
    if (!f) { report.push('bloc manquant : ' + name); return; }
    f.contents = String(val);
  }

  // — Champs simples —
  setText('denomination', data.denomination);
  setText('poids_net',    data.poids_net);
  setText('lot',          data.lot);
  setText('quid',         data.quid);
  // facultatifs
  if (findFrame('client'))   setText('client',   data.client);
  if (findFrame('mo'))       setText('mo',       data.mo);
  if (findFrame('date'))     setText('date',     data.date);
  if (findFrame('quantite')) setText('quantite', data.quantite);

  // — Nutrition (nutri_<clé>) —
  if (data.nutri) {
    for (var k in data.nutri) {
      var fn = 'nutri_' + k;
      if (findFrame(fn)) setText(fn, data.nutri[k]);
    }
  }

  // — Ingrédients + gras des allergènes —
  var f = findFrame('ingredients');
  if (!f) {
    report.push('bloc manquant : ingredients');
  } else if (data.ingredients && data.ingredients.length) {
    var plain = '';
    for (var r = 0; r < data.ingredients.length; r++) plain += data.ingredients[r].t;
    f.contents = plain;

    var cs = null;
    try { cs = doc.characterStyles.getByName('Allergene'); } catch (e) { cs = null; }
    if (cs) {
      var pos = 0;
      for (var r2 = 0; r2 < data.ingredients.length; r2++) {
        var seg = data.ingredients[r2];
        var len = seg.t.length;
        if (seg.b && len > 0) {
          try {
            var tr = f.textRange;
            tr.start = pos;
            tr.end = pos + len;
            cs.applyTo(tr);
          } catch (e) {}
        }
        pos += len;
      }
    } else {
      report.push('style de caractère « Allergene » absent → allergènes non mis en gras');
    }
  }

  app.redraw();
  alert('✅ Transfert terminé.' +
    (report.length ? '\n\nÀ vérifier :\n• ' + report.join('\n• ') : ''));
})();
