# Marketplace — Les Cuisiniers du Potager

Catalogue des plugins internes LCP, connectés à l'Odoo de production.

## Plugins disponibles

- **tableau-de-bord-lcp** — Tableau de bord : CA facturé, mois en cours, impayés, comparaison 2024/2025 et projection annuelle, en direct d'Odoo.

## Installer (côté utilisateur)

1. Ajouter le marketplace : `/plugin marketplace add lescuisiniersdupotager/lcp-plugins`
   (ou l'URL / le chemin où ce dépôt est hébergé).
2. Installer un plugin : `/plugin install tableau-de-bord-lcp@lcp-plugins`
3. Dire « installe le tableau de bord » pour créer la vue, puis autoriser le connecteur `odoo19_prod` au premier lancement.

## Prérequis

Chaque utilisateur doit disposer du connecteur Odoo nommé exactement `odoo19_prod`
(provisionné par un Owner de l'organisation dans Paramètres → Connecteurs).

## Publier une mise à jour

Incrémenter le numéro de version du plugin (`plugins/<nom>/.claude-plugin/plugin.json`
et l'entrée correspondante dans `.claude-plugin/marketplace.json`), pousser sur le dépôt.
Chaque utilisateur rafraîchit avec `/plugin marketplace update`.
