---
name: tracabilite-bio-lcp
description: Installe ou met à jour l'app « Traçabilité BIO » des Cuisiniers du Potager comme artifact Cowork connecté à Odoo. Use when the user says "installe la traçabilité", "traçabilité bio", "ouvre la traçabilité LCP", "artifact traçabilité", "généalogie des lots bio", "mets à jour la traçabilité LCP", or asks to set up / refresh the LCP bio traceability tool.
---

# Installer / mettre à jour l'app Traçabilité BIO LCP

Crée (ou met à jour) l'artifact Cowork contenant l'app HTML fournie avec ce plugin. L'app présente la traçabilité BIO des Cuisiniers du Potager : réceptions, fabrications, consommations et livraisons des lots bio, avec un onglet de **généalogie amont/aval**. Les données sont un instantané d'Odoo 19 production, rafraîchissables via le connecteur `odoo19_prod`.

## Prérequis à vérifier avant toute création

L'app appelle Odoo via l'outil `mcp__odoo19_prod__odoo_call`. Le connecteur doit s'appeler **exactement `odoo19_prod`** (un connecteur `odoo19_pre-prod` peut aussi exister — ne pas le confondre).

1. Vérifier que l'outil `mcp__odoo19_prod__odoo_call` est disponible.
2. Si absent : indiquer à l'utilisateur qu'un Owner de l'organisation doit provisionner le connecteur Odoo nommé `odoo19_prod` (Paramètres → Connecteurs), puis relancer. Ne pas créer l'artifact sans le connecteur.
3. Si présent : faire **un appel de test** pour enregistrer l'outil dans l'allowlist de la session, par exemple `search_read` sur `stock.lot` avec `{"domain": [], "fields": ["name"], "limit": 1}`.

## Procédure

1. Lire le fichier HTML fourni : `${CLAUDE_PLUGIN_ROOT}/skills/tracabilite-bio-lcp/assets/tracabilite-app.html`. Ne **jamais** modifier son contenu : l'app est finalisée. La transmettre telle quelle.
2. Lister les artifacts existants pour voir si l'id `tracabilite-bio-v2` est déjà présent.
3. Selon le cas :
   - absent → créer l'artifact avec l'id `tracabilite-bio-v2` et `mcp_tools: ["mcp__odoo19_prod__odoo_call"]` ;
   - présent → le mettre à jour avec le même HTML, en résumant ce que la nouvelle version change.
4. Vérifier l'artifact après création/mise à jour, puis dire à l'utilisateur de l'ouvrir dans le panneau latéral et d'autoriser le connecteur `odoo19_prod` au premier lancement (bandeau d'autorisation ou menu ⋯).

## Format des appels Odoo (pour dépannage)

- Retour : `{"result": "<JSON stringifié>"}` — l'app parse `raw.result` (double décodage si nécessaire).
- Params : `search_read` → `{domain, fields, limit, order}` ; `read` → `{ids, fields}` ; `read_group` → `{domain, fields, groupby}`.

## Notes de fonctionnement à rappeler si l'utilisateur s'interroge

- L'app affiche un **instantané** d'Odoo 19 production (date de génération indiquée dans l'app) ; les données se rafraîchissent via le connecteur `odoo19_prod`.
- Le suivi couvre le cycle complet des lots bio : **réceptions → fabrications → consommations → livraisons**.
- L'onglet **généalogie** remonte (amont) et descend (aval) la chaîne d'un lot pour retrouver ses composants et ses destinations.
