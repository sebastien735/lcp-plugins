---
name: tableau-de-bord-lcp
description: Installe ou met à jour le « Tableau de bord » des Cuisiniers du Potager comme artifact Cowork connecté à Odoo. Use when the user says "installe le tableau de bord", "mets à jour le tableau de bord LCP", "ouvre le tableau de bord", "artifact tableau de bord", "dashboard LCP", "tableau de bord CA", or asks to set up / refresh the LCP dashboard.
---

# Installer / mettre à jour le Tableau de bord LCP

Crée (ou met à jour) l'artifact Cowork contenant l'app HTML fournie avec ce plugin. L'app lit l'Odoo de production en temps réel : CA facturé HT de l'année, mois en cours, factures impayées avec liens directs vers Odoo, comparaison mensuelle 2024/2025/année en cours, cumul annuel et projection de fin d'année lissée.

## Prérequis à vérifier avant toute création

L'app appelle Odoo via l'outil `mcp__odoo19_prod__odoo_call`. Le connecteur doit s'appeler **exactement `odoo19_prod`** (un connecteur `odoo19_pre-prod` peut aussi exister — ne pas le confondre).

1. Vérifier que l'outil `mcp__odoo19_prod__odoo_call` est disponible.
2. Si absent : indiquer à l'utilisateur qu'un Owner de l'organisation doit provisionner le connecteur Odoo nommé `odoo19_prod` (Paramètres → Connecteurs), puis relancer. Ne pas créer l'artifact sans le connecteur.
3. Si présent : faire **un appel de test** pour enregistrer l'outil dans l'allowlist de la session, par exemple `read_group` sur `account.move` avec `{"domain": [["move_type","=","out_invoice"],["state","=","posted"]], "fields": ["amount_untaxed:sum"], "groupby": []}`.

## Procédure

1. Lire le fichier HTML fourni : `${CLAUDE_PLUGIN_ROOT}/skills/tableau-de-bord-lcp/assets/tableau-de-bord-app.html`. Ne **jamais** modifier son contenu : l'app est finalisée. La transmettre telle quelle.
2. Lister les artifacts existants pour voir si l'id `tableau-de-bord-lcp` est déjà présent.
3. Selon le cas :
   - absent → créer l'artifact avec l'id `tableau-de-bord-lcp` et `mcp_tools: ["mcp__odoo19_prod__odoo_call"]` ;
   - présent → le mettre à jour avec le même HTML, en résumant ce que la nouvelle version change.
4. Vérifier l'artifact après création/mise à jour, puis dire à l'utilisateur de l'ouvrir dans le panneau latéral et d'autoriser le connecteur `odoo19_prod` au premier lancement (bandeau d'autorisation ou menu ⋯).

## Format des appels Odoo (pour dépannage)

- Retour : `{"result": "<JSON stringifié>"}` — l'app parse `raw.result` (double décodage si nécessaire).
- Params : `read_group` → `{domain, fields, groupby}` ; `search_read` → `{domain, fields, limit, order}` ; `read` → `{ids, fields}`.
- `read_group` avec `groupby: ["invoice_date:month"]` renvoie `__range` avec bornes ISO (`from`/`to`) ; l'app lit le mois via `__range["invoice_date:month"].from`.

## Règles de calcul (implémentées dans l'app, ne pas modifier)

- **CA** = CA facturé HT : `account.move`, `move_type='out_invoice'`, `state='posted'`, somme `amount_untaxed`, daté sur `invoice_date`.
- **Impayés** : mêmes filtres + `payment_state in ('not_paid','partial')`, somme `amount_residual`, triés par échéance, échéances dépassées signalées.
- **Historique 2024/2025** : constantes embarquées dans l'app (2025 redressé à 387 000 € HT). Odoo ne contient rien avant 2026.
- **Base pondérée** mensuelle = 0,4 × CA 2024 + 0,6 × CA 2025.
- **Projection** : mois pleins écoulés = réel ; mois en cours = mélange (extrapolation du réel × jours + attendu base × rythme), pondéré par l'avancement dans le mois pour éviter l'effondrement en début de mois ; mois à venir = base × rythme, où rythme = réels des mois pleins ÷ base de ces mois.
- **Liens Odoo** : `https://www.lescuisiniersdupotager.com/web#id=<ID>&model=<MODEL>&view_type=form`, nouvel onglet.

## Notes de fonctionnement à rappeler si l'utilisateur s'interroge

- Le CA affiché est le **CA facturé** (factures clients, date de facture), qui diffère volontairement du **compte de résultat** d'Odoo (base comptable, date comptable, tous comptes de produits). Les deux ne coïncident jamais exactement.
- Le CA est en **brut** (factures), sans retrancher les avoirs.
- Les données se rafraîchissent à chaque ouverture via le bouton **Reload** de l'en-tête de l'artifact.
