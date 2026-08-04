---
name: transfert-illustrator
description: Fournit et explique le script de transfert des données d'étiquette (ingrédients, nutrition, poids net, lot, QUID) vers un gabarit Adobe Illustrator. Use when the user says "transfert Illustrator", "script Illustrator", "remplir l'étiquette dans Illustrator", "installer le script jsx", "importer les ingrédients dans Illustrator", or asks how to get label data into an .ai template.
---

# Transfert des données d'étiquette vers Illustrator

Livre le script ExtendScript et sa notice, et guide le réglage d'un gabarit Illustrator pour que les données de l'app Fiche Étiquette s'y déversent en un collage.

## Fichiers fournis

- Script : `${CLAUDE_PLUGIN_ROOT}/skills/transfert-illustrator/assets/LCP-transfert-illustrator.jsx`
- Notice : `${CLAUDE_PLUGIN_ROOT}/skills/transfert-illustrator/assets/Guide-transfert-Illustrator.md`

## Procédure

1. Copier les deux fichiers dans le dossier de travail de l'utilisateur, puis les présenter avec l'outil de partage de fichiers.
2. Résumer en clair le réglage à faire une fois par gabarit et l'usage quotidien (ci-dessous). Ne pas recopier tout le guide dans la réponse.
3. Si l'utilisateur signale une erreur au lancement, se référer au récapitulatif affiché en fin d'exécution du script : il liste les blocs manquants et l'absence éventuelle du style de caractère.

## Réglage du gabarit (une fois par fichier .ai)

Nommer les blocs de texte dans le panneau Calques avec ces identifiants exacts :

`ingredients`, `denomination`, `poids_net`, `lot`, `quid`, `nutri_kcal`, `nutri_kj`, `nutri_fat`, `nutri_satfat`, `nutri_carbs`, `nutri_sugars`, `nutri_fiber`, `nutri_prot`, `nutri_salt`.

Facultatifs : `client`, `mo`, `date`, `quantite`. Seuls les blocs présents sont remplis.

Créer un **style de caractère** nommé exactement `Allergene` réglé en gras : le script l'applique aux allergènes détectés. Sans ce style, le texte passe sans gras.

Installer le script dans `Applications/Adobe Illustrator [version]/Presets/fr_FR/Scripts/` puis redémarrer Illustrator, ou le lancer via **Fichier ▸ Scripts ▸ Autre script…**.

## Usage quotidien

1. Dans l'app, ouvrir la fabrication, onglet **Aperçu étiquette**, régler la case « Afficher les pourcentages » si besoin.
2. Cliquer **🎨 Illustrator** (les données partent dans le presse-papier).
3. Dans Illustrator, ouvrir le gabarit, lancer **Fichier ▸ Scripts ▸ LCP-transfert-illustrator**.
4. Coller dans la fenêtre, cliquer **Remplir**.

## Points à signaler

- Les valeurs nutritionnelles transférées sont celles pour 100 g de **produit fini** (après réduction, marge empotage incluse).
- Les noms d'ingrédients sont nettoyés de leur adjectif de préparation (« Tomate préparée » → « Tomate »).
- Tout passe par le presse-papier local : rien n'est envoyé sur Internet.
