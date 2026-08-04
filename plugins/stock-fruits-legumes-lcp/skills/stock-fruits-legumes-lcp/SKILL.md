---
name: stock-fruits-legumes-lcp
description: Installe ou met à jour l'app « Stock fruits & légumes par client » des Cuisiniers du Potager comme artifact Cowork connecté à Odoo. Use when the user says "installe le stock", "stock fruits et légumes", "ouvre le stock LCP", "artifact stock", "stock par client", "mets à jour le stock LCP", or asks to set up / refresh the LCP stock tool.
---

# Installer / mettre à jour le Stock fruits & légumes par client LCP

Crée (ou met à jour) l'artifact Cowork contenant l'app HTML fournie avec ce plugin. L'app lit l'Odoo de production en temps réel : onglet **Stock** (lots en stock net > 0, KPIs, graphique BIO/non-BIO par client, cartes clients, filtres, modes Vue globale / Par produit) et onglet **Réceptions** (lignes de mouvement entrantes par période).

## Prérequis à vérifier avant toute création

L'app appelle Odoo via l'outil `mcp__odoo19_prod__odoo_call`. Le connecteur doit s'appeler **exactement `odoo19_prod`** (un connecteur `odoo19_pre-prod` peut aussi exister — ne pas le confondre).

1. Vérifier que l'outil `mcp__odoo19_prod__odoo_call` est disponible.
2. Si absent : indiquer à l'utilisateur qu'un Owner de l'organisation doit provisionner le connecteur Odoo nommé `odoo19_prod` (Paramètres → Connecteurs), puis relancer. Ne pas créer l'artifact sans le connecteur.
3. Si présent : faire **un appel de test** pour enregistrer l'outil dans l'allowlist de la session, par exemple `search_read` sur `stock.quant` avec `{"domain": [], "fields": ["quantity"], "limit": 1}`.

## Procédure

1. Lire le fichier HTML fourni : `${CLAUDE_PLUGIN_ROOT}/skills/stock-fruits-legumes-lcp/assets/stock-app.html`. Ne **jamais** modifier son contenu : l'app est finalisée. La transmettre telle quelle.
2. Lister les artifacts existants pour voir si l'id `stock-fruits-legumes-clients-lcp` est déjà présent.
3. Selon le cas :
   - absent → créer l'artifact avec l'id `stock-fruits-legumes-clients-lcp` et `mcp_tools: ["mcp__odoo19_prod__odoo_call"]` ;
   - présent → le mettre à jour avec le même HTML, en résumant ce que la nouvelle version change.
4. Vérifier l'artifact après création/mise à jour, puis dire à l'utilisateur de l'ouvrir dans le panneau latéral et d'autoriser le connecteur `odoo19_prod` au premier lancement (bandeau d'autorisation ou menu ⋯).

## Format des appels Odoo (pour dépannage)

- Retour : `{"result": "<JSON stringifié>"}` — l'app parse `raw.result` (double décodage si nécessaire).
- Params : `search_read` → `{domain, fields, limit, order}` ; `read` → `{ids, fields}` ; `read_group` → `{domain, fields, groupby}`.

## Notes de fonctionnement à rappeler si l'utilisateur s'interroge

- L'onglet **Stock** ne montre que les lots dont le **stock net est supérieur à 0**, regroupés par client puis par produit.
- La répartition **BIO / non-BIO** est déterminée par produit (ou lot) et agrégée par client, avec un graphique et des cartes par client.
- Les **filtres** et les deux modes d'affichage (**Vue globale** / **Par produit**) ne changent que la présentation, pas les données lues dans Odoo.
- L'onglet **Réceptions** liste les mouvements de stock entrants sur la période choisie.
- Les données se rafraîchissent à chaque ouverture via le bouton **Reload** de l'en-tête de l'artifact.
