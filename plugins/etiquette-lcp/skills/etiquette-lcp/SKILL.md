---
name: etiquette-lcp
description: Installe ou met à jour l'app « Générateur de Fiche Étiquette » des Cuisiniers du Potager comme artifact Cowork connecté à Odoo. Use when the user says "installe l'app étiquette", "mets à jour l'étiquette LCP", "ouvre le générateur de fiche étiquette", "artifact étiquette", "fiche étiquette LCP", or asks to set up / refresh the LCP label tool.
---

# Installer / mettre à jour l'app Fiche Étiquette LCP

Crée (ou met à jour) l'artifact Cowork contenant l'app HTML fournie avec ce plugin. L'app lit l'Odoo de production en temps réel : ordres de fabrication à l'étiquetage, ingrédients réellement consommés triés par poids, contrôles qualité, lot, taux de réduction, valeurs nutritionnelles partagées, aperçu et impression de l'étiquette, export vers Illustrator.

## Prérequis à vérifier avant toute création

L'app appelle Odoo via l'outil `mcp__odoo19_prod__odoo_call`. Le connecteur doit s'appeler **exactement `odoo19_prod`** (un connecteur `odoo19_pre-prod` peut aussi exister — ne pas le confondre).

1. Vérifier que l'outil `mcp__odoo19_prod__odoo_call` est disponible.
2. Si absent : indiquer à l'utilisateur qu'un Owner de l'organisation doit provisionner le connecteur Odoo nommé `odoo19_prod` (Paramètres → Connecteurs), puis relancer. Ne pas créer l'artifact sans le connecteur.
3. Si présent : faire **un appel de test** pour enregistrer l'outil dans l'allowlist de la session, par exemple `search_read` sur `mrp.production` avec `{"domain": [], "fields": ["name"], "limit": 1}`.

## Procédure

1. Lire le fichier HTML fourni : `${CLAUDE_PLUGIN_ROOT}/skills/etiquette-lcp/assets/etiquette-app.html`. Ne **jamais** modifier son contenu : l'app est finalisée. La transmettre telle quelle.
2. Lister les artifacts existants pour voir si l'id `etiquette-lcp` est déjà présent.
3. Selon le cas :
   - absent → créer l'artifact avec l'id `etiquette-lcp` et `mcp_tools: ["mcp__odoo19_prod__odoo_call"]` ;
   - présent → le mettre à jour avec le même HTML, en résumant ce que la nouvelle version change.
4. Vérifier l'artifact après création/mise à jour, puis dire à l'utilisateur de l'ouvrir dans le panneau latéral et d'autoriser le connecteur `odoo19_prod` au premier lancement (bandeau d'autorisation ou menu ⋯).

## Format des appels Odoo (pour dépannage)

- Retour : `{"result": "<JSON stringifié>"}` — l'app parse `raw.result`.
- Params : `search_read` → `{domain, fields, limit, order}` ; `read` → `{ids, fields}` ; `write` → `{ids, vals}` ; `create` → `{vals_list}`.

## Champs Odoo utilisés par l'app

Sur `mrp.production` : `x_studio_etiquette_imprimee`, `x_studio_design_fait`, `x_studio_partner_id`, `x_studio_taux_reduction`, `x_studio_masse_entrante`, `x_studio_masse_produit_fini`.
Sur `product.template` : `x_studio_sous_ingredients`, `x_studio_nutri_kcal`, `x_studio_nutri_kj`, `x_studio_nutri_fat`, `x_studio_nutri_satfat`, `x_studio_nutri_carbs`, `x_studio_nutri_sugars`, `x_studio_nutri_fiber`, `x_studio_nutri_prot`, `x_studio_nutri_salt`.
Autres modèles lus : `mrp.workorder`, `x_wo_consumption_line`, `quality.check`, `stock.move`, `stock.move.line`, `stock.lot`, `product.product`.

Si un de ces champs manque sur l'Odoo cible, le signaler : les fonctions correspondantes de l'app resteront inertes.

## Notes de fonctionnement à rappeler si l'utilisateur s'interroge

- **Ordre des ingrédients** : poids réellement consommé décroissant (base entrante), réordonnable par glisser-déposer.
- **Pourcentages** : par défaut seul le QUID (ingrédient cité dans la dénomination de vente) est affiché ; au-delà de 100 g/100 g il devient « élaboré avec X g pour 100 g de produit fini ». Une case « Afficher les pourcentages » permet de tout afficher.
- **Réduction** : masse entrante vs bocaux × poids net du contrôle qualité ; une marge de sécurité de 20 % (pertes empotage) est appliquée au calcul de concentration nutritionnelle, pas au taux réel écrit dans Odoo.
- **Nutrition** : priorité aux champs de la fiche produit Odoo, puis cache local, puis estimation Ciqual intégrée. Les produits « séchés » et les produits de conditionnement client (catégorie « Produits clients ») n'ont **pas** d'estimation automatique.
