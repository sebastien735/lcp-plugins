# Étiquette LCP

Outil de génération des fiches étiquette des Cuisiniers du Potager, connecté à l'Odoo de production. Destiné aux graphistes et à la production.

## Ce que fait le plugin

**Générateur de Fiche Étiquette** — une app qui s'ouvre dans le panneau latéral et lit Odoo en temps réel :

- page d'accueil des ordres de fabrication en attente d'étiquetage, avec cases « Design fait » et « Imprimée » synchronisées dans Odoo ;
- ingrédients réellement consommés (et non la recette théorique), triés par poids décroissant, réordonnables ;
- sous-ingrédients des ingrédients composés, saisis une fois sur la fiche produit et partagés ;
- valeurs nutritionnelles calculées pour 100 g de produit fini, réduction à la cuisson prise en compte ;
- taux de réduction enregistré sur l'ordre de fabrication pour comparer les recettes ;
- aperçu de l'étiquette avec allergènes en gras, pourcentage QUID, impression ;
- export des données vers un gabarit Adobe Illustrator.

**Transfert Illustrator** — un script à installer dans Illustrator qui remplit les blocs de texte d'un gabarit à partir des données de l'app.

## Prérequis

Un connecteur Odoo nommé **exactement `odoo19_prod`** doit être disponible. Un Owner de l'organisation peut le provisionner pour tout le monde dans Paramètres → Connecteurs. Au premier lancement de l'app, autoriser le connecteur quand Cowork le demande.

## Utilisation

Demander « installe l'app étiquette » (ou « mets à jour l'étiquette LCP ») : l'app est installée comme vue persistante, réutilisable ensuite sans repasser par la conversation.

Pour le transfert graphique, demander « le script Illustrator » : le script et sa notice sont livrés avec la procédure de réglage.

## Mises à jour

La version de l'app est celle embarquée dans ce plugin. Pour diffuser une nouvelle version à toute l'équipe : republier le plugin avec le numéro de version incrémenté, puis chacun réinstalle et relance « mets à jour l'étiquette LCP ».

## Champs Odoo personnalisés utilisés

Sur les ordres de fabrication : étiquette imprimée, design fait, client, taux de réduction, masse entrante, masse produit fini.
Sur les fiches produit : sous-ingrédients, et les neuf valeurs nutritionnelles pour 100 g (énergie kcal et kJ, matières grasses, acides gras saturés, glucides, sucres, fibres, protéines, sel).

Ces champs doivent exister sur l'Odoo cible ; sinon les fonctions correspondantes restent inertes.
