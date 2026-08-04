# Tableau de bord LCP

Tableau de bord commercial des Cuisiniers du Potager, connecté à l'Odoo de production. Destiné au suivi du chiffre d'affaires et des impayés.

## Ce que fait le plugin

**Tableau de bord** — une app qui s'ouvre dans le panneau latéral et lit Odoo en temps réel :

- CA facturé HT de l'année en cours, nombre de factures, mois en cours ;
- factures impayées (solde restant dû), triées par échéance, échéances dépassées signalées, avec lien direct vers la fiche Odoo ;
- comparaison du CA mensuel entre 2024, 2025 et l'année en cours (réel + projeté) ;
- cumul annuel et projection de fin d'année, lissée pour ne pas s'effondrer au changement de mois.

## Prérequis

Un connecteur Odoo nommé **exactement `odoo19_prod`** doit être disponible. Un Owner de l'organisation peut le provisionner pour tout le monde dans Paramètres → Connecteurs. Au premier lancement de l'app, autoriser le connecteur quand Cowork le demande.

## Utilisation

Demander « installe le tableau de bord » (ou « mets à jour le tableau de bord LCP ») : l'app est installée comme vue persistante, réutilisable ensuite sans repasser par la conversation. Les chiffres se rafraîchissent à chaque ouverture (bouton Reload de l'en-tête).

## À savoir sur les chiffres

- Le CA affiché est le **CA facturé** (factures clients validées, sur la date de facture). Il diffère volontairement du **compte de résultat** d'Odoo, qui est une vue comptable (date comptable, tous comptes de produits) — les deux ne coïncident jamais exactement.
- Le CA est en **brut** de factures, avoirs non déduits.
- L'historique 2024/2025 est embarqué dans l'app (2025 redressé à 387 000 € HT), Odoo ne contenant rien avant 2026.

## Mises à jour

La version de l'app est celle embarquée dans ce plugin. Pour diffuser une nouvelle version à toute l'équipe : republier le plugin avec le numéro de version incrémenté, puis chacun réinstalle et relance « mets à jour le tableau de bord LCP ».
