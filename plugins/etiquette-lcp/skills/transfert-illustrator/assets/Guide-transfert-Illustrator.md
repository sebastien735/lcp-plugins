# Transfert app Étiquette → Illustrator

Objectif : remplir automatiquement les blocs de texte d'un gabarit Illustrator (ingrédients, nutrition, poids net, lot, dénomination, QUID) à partir des données de l'app, en 2 clics + un collage.

## 1. Réglage du gabarit (une seule fois par fichier .ai)

### a) Nommer les blocs de texte
Dans Illustrator, sélectionne chaque bloc de texte concerné, puis dans le panneau **Calques** double-clique sur son nom et donne-lui exactement l'un de ces identifiants :

| Bloc dans l'étiquette | Nom à donner |
|---|---|
| Liste d'ingrédients | `ingredients` |
| Dénomination de vente | `denomination` |
| Poids net | `poids_net` |
| N° de lot | `lot` |
| Mention QUID (« élaboré avec… ») | `quid` |
| Énergie (kcal) | `nutri_kcal` |
| Énergie (kJ) | `nutri_kj` |
| Matières grasses | `nutri_fat` |
| dont acides gras saturés | `nutri_satfat` |
| Glucides | `nutri_carbs` |
| dont sucres | `nutri_sugars` |
| Fibres (facultatif) | `nutri_fiber` |
| Protéines | `nutri_prot` |
| Sel | `nutri_salt` |

Facultatifs si tu les veux : `client`, `mo`, `date`, `quantite`.

> Seuls les blocs présents sont remplis. Un bloc absent est simplement signalé en fin de transfert, sans bloquer.

### b) Style de caractère « Allergene » (pour le gras)
Crée un **style de caractère** nommé exactement `Allergene`, réglé sur la graisse **Bold** de ta police. Le script l'applique automatiquement aux allergènes (gluten, lait, sulfites, fruits à coque…). Sans ce style, le texte passe quand même, mais sans gras.

### c) Installer le script
Copie `LCP-transfert-illustrator.jsx` dans le dossier Scripts d'Illustrator :
- **Mac** : `Applications/Adobe Illustrator [version]/Presets/fr_FR/Scripts/`

Redémarre Illustrator. Le script apparaît dans **Fichier ▸ Scripts ▸ LCP-transfert-illustrator**.
(Sinon, sans installation : **Fichier ▸ Scripts ▸ Autre script…** et pointe le fichier.)

## 2. Utilisation (à chaque étiquette)

1. Dans l'app, ouvre la fabrication, va sur **Aperçu étiquette**, règle l'affichage (case « Afficher les pourcentages » si besoin).
2. Clique **🎨 Illustrator** → les données sont copiées dans le presse-papier.
3. Dans Illustrator, ouvre le bon gabarit, puis lance **Fichier ▸ Scripts ▸ LCP-transfert-illustrator**.
4. Dans la fenêtre, **colle** (Cmd+V) et clique **Remplir**.
5. Les blocs se remplissent, allergènes en gras. Un récap signale ce qui manque éventuellement.

## Notes
- Les valeurs nutritionnelles sont celles **pour 100 g de produit fini** (après réduction) telles que calculées dans l'app.
- La dénomination et les noms d'ingrédients sont « nettoyés » (sans « préparé/pelé »).
- Rien n'est envoyé sur Internet : tout passe par le presse-papier local.
- Si le gras des allergènes ou le placement d'un bloc pose souci, note le message du récap et on ajuste le script.
