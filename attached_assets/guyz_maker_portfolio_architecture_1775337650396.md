# Architecture du Portfolio Guyz Maker
**Site multi-pages · Bilingue FR/EN · Hub de conversion B2B**
*INOVA Makers · Version 1.0 · 2026*

---

## Navigation principale

```
GUYZ MAKER   |   Accueil   Projets   Services   Blog   À propos   Contact
```

---

## 01 — ACCUEIL

> *Objectif : Convaincre un décideur B2B en moins de 10 secondes.*

### Hero Section

- **Arrière-plan** : Photo authentique de l'atelier INOVA Makers (full-width, overlay sombre 50%)
- **Portrait** : Photo de profil en portrait semi-professionnel (bras croisés ou au travail sur un circuit), positionnée à droite ou en superposition sur le fond
- **Titre principal (H1)** :
  > L'ingénierie au service de l'innovation : De l'idée au produit intelligent.
- **Sous-titre** :
  > Développeur IoT & entrepreneur tech basé au Bénin. Je conçois, prototypage et déploie des systèmes embarqués et des solutions numériques sur mesure.
- **CTA principal** : `Discutons de votre projet →` *(lien vers page Contact)*
- **CTA secondaire** : `Voir mes réalisations` *(lien vers page Projets)*

### Bande de crédibilité (social proof rapide)

```
+10 ans d'expérience   |   Bénin & International   |   IoT · Domotique · Smart City
```

### Les 3 Pôles d'Expertise (cards)

| Pôle | Description courte | Lien |
|------|--------------------|------|
| 🛠 INOVA Makers | Conseil, prototypage & fabrication numérique | [inovamakers.io](https://inovamakers.io) |
| 📈 Optimatics | Growth Hacking IA & systèmes d'acquisition | Page Services |
| 🏠 Aura Controle | Domotique & gestion intelligente du bâtiment | Page Services |

### 3 Projets Vedettes (avec métriques)

Chaque carte projet affiche :
- Nom du projet + visuel réel (photo atelier ou prototype)
- Problème résolu en une phrase
- Métrique clé mesurable (ex : "–40% de consommation énergétique")
- Bouton : `Voir le projet →`

**Projets à afficher :**
1. **LuxPulse** — Systèmes d'affichage dynamique IoT (sDisplay, sTime, sLED, sNumber)
2. **Aura Controle** — Solution domotique centralisée pour bâtiments intelligents
3. **INOVA Display** — Horloges numériques, enseignes LED et journaux lumineux (depuis 2016)

### Section Newsletter (capture email)

- Titre : *"Signal du Maker — La newsletter tech du jeudi"*
- Sous-titre : *"Ce que je construis, ce que j'apprends, 1 ressource utile. Chaque jeudi à 8h."*
- Champ email + bouton `S'abonner`

---

## 02 — PROJETS

> *Objectif : Apporter la preuve concrète du savoir-faire. Zéro discours, 100% réalisations.*

### Structure de la page

- **Filtres par pôle** : Tous | IoT | Domotique | Affichage & LED | Smart City | Formation
- **Grille de cartes projets** (2 colonnes desktop, 1 colonne mobile)

---

### Fiche type — Structure détaillée de chaque projet

Chaque projet suit le même template :

```
1. Titre du projet
2. Bannière visuelle (photo réelle du prototype ou du déploiement)
3. Contexte client
4. Problème identifié
5. Solution apportée
6. Stack technique complète
7. Résultats mesurables
8. Galerie photos (atelier, composants, déploiement)
9. CTA : "Vous avez un besoin similaire ? Contactez-moi →"
```

---

### Projet 1 — LuxPulse (Affichage Dynamique & IoT)

**Pôle :** INOVA Makers / INOVA Display
**Statut :** En production depuis 2016

**Contexte :** Besoin croissant de systèmes d'affichage connectés, intelligents et adaptatifs pour environnements urbains et professionnels.

**Problème :** Les enseignes classiques sont statiques, énergivores et sans interaction avec l'environnement.

**Solution :** Famille de produits d'affichage LED dynamiques connectés (IoT), réagissant en temps réel aux données contextuelles.

**Sous-projets :**
- **sDisplay** : Mini-afficheurs connectés pour gestion du temps — diffusion météo, rappels, données en temps réel
- **sTime** : Horloges monumentales sur façades de bâtiments — repères temporels urbains grande échelle
- **sNumber** : Visualisation dynamique de chiffres et statistiques avec animations fluides
- **sLED** : Enseignes interactives intégrant capteurs de mouvement et d'environnement

**Stack technique :** ESP32 · Arduino · LED matricielles · Capteurs PIR · MQTT · API météo · FreeCAD (boîtiers 3D)

**Résultats :** Systèmes déployés au Bénin · Clients PME et institutions · Production en série de modules LED

---

### Projet 2 — Aura Controle (Domotique & Intelligence)

**Pôle :** Aura Controle
**Statut :** Actif

**Contexte :** PME et particuliers béninois cherchant à réduire leur facture énergétique et améliorer la sécurité de leurs bâtiments.

**Problème :** Les solutions domotiques importées sont coûteuses, inadaptées aux réseaux locaux et difficiles à maintenir.

**Solution :** Système de gestion intelligente du bâtiment développé localement — pilotage centralisé des infrastructures électriques via interface simple.

**Fonctionnalités :**
- Pilotage à distance (éclairage, climatisation, prises)
- Alertes sécurité en temps réel
- Tableau de bord de consommation énergétique
- Compatible réseau GSM et WiFi local

**Stack technique :** Raspberry Pi · ESP8266/ESP32 · Relais intelligents · Interface web locale · Node-RED · MQTT

**Résultats :** Réduction de consommation énergétique · Renforcement sécurité · Interface utilisateur accessible sans formation

---

### Projet 3 — INOVA MakerSpace (Incubation IoT)

**Pôle :** INOVA Makers
**Rôle :** Co-Fondateur & CEO

**Contexte :** Absence d'infrastructure d'accompagnement local pour les porteurs de projets tech au Bénin.

**Problème :** Les makers et entrepreneurs IoT béninois manquent d'équipements, de mentors et d'espace de prototypage.

**Solution :** Création d'un MakerSpace dédié à l'incubation et au développement de projets IoT avec équipements de fabrication numérique.

**Services offerts :**
- Accès imprimantes 3D, découpe laser, électronique
- Accompagnement technique de porteurs de projets
- Ateliers de fabrication numérique
- Mentorat en développement produit IoT

**Stack technique :** FreeCAD · Impression 3D FDM · Arduino · Raspberry Pi · Outils de prototypage rapide

**Résultats :** Projets smart city accompagnés · Communauté makers locale en croissance · Partenariats avec institutions

---

### Projet 4 — BLOLAB FabLab (Porto-Novo & Cotonou)

**Rôle :** FabLab Manager
**Contexte :** Gestion opérationnelle d'un FabLab avec focus sur les projets d'innovation urbaine.

**Missions réalisées :**
- Gestion de projets smart city
- Animation d'ateliers de fabrication numérique
- Formation de communautés de makers locaux
- Coordination des ressources et équipements

---

## 03 — SERVICES INOVA

> *Objectif : Permettre à un décideur B2B de comprendre l'offre, son tarif indicatif et le processus en moins de 2 minutes.*

---

### Processus en 3 étapes (affiché en haut de page)

```
① Brief → ② Prototype → ③ Livraison
Vous décrivez votre besoin   On valide ensemble   Je livre et je documente
```

---

### Pôle 1 — 🛠 INOVA Makers : Conseil & Ingénierie Matérielle

> Site officiel : [inovamakers.io](https://inovamakers.io)

**Mission :** Accompagner les entreprises de l'idée au prototype physique.

**Offres :**

| Service | Description | Tarif indicatif |
|---------|-------------|-----------------|
| Conseil IoT | Audit, cadrage technique, architecture système | Sur devis |
| Prototypage rapide | Du schéma au prototype fonctionnel en quelques semaines | Sur devis |
| Impression 3D & boîtiers | Modélisation FreeCAD + impression FDM | Sur devis |
| Systèmes embarqués | Développement firmware, intégration capteurs | Sur devis |
| Accompagnement projet | Suivi technique de A à Z pour porteurs de projets | Sur devis |

**Technologies maîtrisées :**
`Arduino` · `ESP32/ESP8266` · `Raspberry Pi` · `MQTT` · `LoRa` · `FreeCAD` · `Impression 3D` · `Protocoles IoT`

**CTA :** `Demander un brief INOVA Makers →` *(lien contact)*
**Site complet :** [inovamakers.io](https://inovamakers.io)

---

### Pôle 2 — 📈 Optimatics : Digital & Croissance

**Mission :** Fusionner l'IA générative et l'ingénierie des tunnels de vente pour créer des systèmes d'acquisition automatisés à haute conversion.

**Offres :**

| Service | Description | Tarif indicatif |
|---------|-------------|-----------------|
| Stratégie Growth Hacking | Audit de croissance + plan d'action personnalisé | Sur devis |
| Création de contenu IA | Contenus viraux optimisés multi-canaux | Sur devis |
| Tunnel de vente | Conception et déploiement de funnels automatisés | Sur devis |
| Système d'acquisition | Automatisation des leads et nurturing | Sur devis |

**Outils & stack :**
`IA générative` · `Make (Integromat)` · `Airtable` · `Notion` · `Systeme.io` · `LinkedIn automation`

**CTA :** `Demander un brief Optimatics →` *(lien contact)*

---

### Pôle 3 — 🏠 Aura Controle : Domotique & Intelligence

**Mission :** Solution globale pour la gestion intelligente du bâtiment — confort, sécurité, économie d'énergie.

**Offres :**

| Service | Description | Tarif indicatif |
|---------|-------------|-----------------|
| Audit domotique | Analyse de l'existant + recommandations | Sur devis |
| Installation système | Déploiement infrastructure intelligente complète | Sur devis |
| Pilotage centralisé | Interface de contrôle éclairage, clim, sécurité | Sur devis |
| Maintenance & suivi | Support technique et mise à jour système | Sur devis |

**Bénéfices clients :**
- ✅ Réduction drastique de la consommation énergétique
- ✅ Renforcement de la sécurité des biens
- ✅ Confort et pilotage à distance
- ✅ Solution 100% locale, maintenable sur place

**CTA :** `Demander un brief Aura Controle →` *(lien contact)*

---

### Formation NoCode — Airtable · Notion · Automatisation

**Pour qui :** Équipes d'entreprises, entrepreneurs, porteurs de projets voulant structurer et automatiser leurs processus sans coder.

**Modules disponibles :**

| Module | Contenu | Format |
|--------|---------|--------|
| Airtable fondamentaux | Bases de données, vues, formules, automatisations | Atelier 1 jour |
| Notion avancé | Workspace, templates, bases de données liées | Atelier 1 jour |
| Automatisation NoCode | Connexion d'outils, workflows, triggers | Atelier 2 jours |
| Pack complet | Les 3 modules + accompagnement personnalisé | Sur mesure |

**CTA :** `Demander un programme de formation →` *(lien contact)*

---

## 04 — BLOG

> *Objectif : Asseoir l'autorité technique, attirer du trafic SEO, fidéliser la communauté.*

### Structure de la page

- **Article vedette** en grand format (dernier article publié)
- **Grille articles** (3 colonnes desktop, 1 mobile)
- **Filtres par pilier** : BUILD | TEACH | INSPIRE | CONVERT

---

### Thématiques SEO prioritaires

**Pilier TEACH (30% du contenu) :**
- Arduino + Capteur DHT22 de A à Z
- MQTT vs HTTP : lequel choisir en Afrique ?
- 5 composants IoT sous 5000 CFA disponibles au Bénin
- C'est quoi un système embarqué ? (guide débutant)
- FreeCAD pour débutants : modéliser son premier boîtier IoT

**Pilier BUILD (40% du contenu) :**
- Série "Du Brouillon au Prototype" — toutes les phases sans filtre
- Post-mortem : ce projet qui a échoué et ce que j'en ai appris
- LuxPulse : comment j'ai conçu un système d'affichage IoT depuis Cotonou
- Build in Public au Bénin — pourquoi j'ai choisi de tout montrer

**Pilier INSPIRE (20% du contenu) :**
- Backstage INOVA Makers : l'atelier, les projets, l'ambiance réelle
- Makers africains qui construisent — portraits
- La Deep Tech au Bénin : c'est maintenant, pas dans 10 ans

**Pilier CONVERT (10% du contenu) :**
- Étude de cas : automatisation entrepôt PME béninoise
- D'INOVA Makers au premier client — comment j'ai structuré

---

### Format des articles

- **Longueur :** 800 à 2000 mots
- **Structure :** Introduction · Problème · Solution · Étapes · Résultat · CTA
- **Hashtags systématiques :** `#IoT` `#DeepTech` `#MadeInBenin` `#BuildInPublic` `#TechAfrique`
- **CTA de fin d'article :** Invitation à la newsletter + lien vers page Contact

### Capture newsletter (barre latérale ou footer article)

- *"Vous avez aimé cet article ? Recevez le Signal du Maker chaque jeudi."*
- Champ email + `S'abonner`

---

## 05 — À PROPOS

> *Objectif : Humaniser la marque. Ton histoire, pas ton CV. Le pourquoi avant le quoi.*

### Structure de la page

#### Hero — L'homme derrière Guyz Maker

- **Photo** : Portrait authentique dans l'atelier (lumière naturelle, circuits visibles en fond)
- **Titre** : *"Je construis en public depuis le Bénin — pour le Bénin et pour le monde entier."*
- **Introduction** :
  > Derrière Guyz Maker se trouve un ingénieur IoT, autodidacte et entrepreneur, animé par une conviction simple : la Deep Tech peut être créée ici, avec les contraintes réelles du terrain africain, et livrer des résultats concrets.

---

#### La Vision

> Vous montrez votre atelier, vos circuits, vos échecs et vos victoires. Pas de discours marketing lissé. L'incarnation vivante de ce que la tech embarquée peut produire depuis le Bénin.

**Les 5 mots de marque Guyz Maker :**

| Mot | Ce que cela signifie |
|-----|----------------------|
| **BRUT** | Les schémas, les bugs, les itérations réelles. Le vrai atelier, le vrai processus. |
| **ANCRÉ** | Chaque contenu a une racine béninoise ou africaine. Construit ICI, pour ICI. |
| **PÉDAGOGUE** | Expliquer pour que ça serve réellement. Pas pour impressionner. |
| **AMBITIEUX** | Un travail local à portée mondiale. Assumé et incarné. |
| **FIABLE** | Ce qui est annoncé est livré. Toujours. Et documenté pour être vérifiable. |

---

#### Parcours — Les jalons clés

```
2016        Co-Fondateur & CTO — INOVA Display
            Conception et production d'horloges numériques, enseignes LED, journaux lumineux

???         FabLab Manager — BLOLAB (Porto-Novo & Cotonou)
            Gestion de projets smart city · Ateliers de fabrication numérique

???         Co-Fondateur & CEO — INOVA MakerSpace
            Incubation et développement de projets IoT · Accompagnement porteurs de projets

2026        Fondateur — Guyz Maker
            Marque personnelle · Build in Public · Ecosystème INOVA Makers + Optimatics + Aura Controle
```

---

#### L'Écosystème

Trois pôles complémentaires qui couvrent la chaîne de valeur technologique de bout en bout :

- 🛠 **[INOVA Makers](https://inovamakers.io)** — Cabinet d'ingénierie matérielle : de l'idée au prototype
- 📈 **Optimatics** — Agence Growth : IA générative + tunnels de vente
- 🏠 **Aura Controle** — Domotique : bâtiment intelligent, confort et économie d'énergie

---

#### Compétences & Stack

**Développement & IoT :**
`Arduino` · `ESP32/ESP8266` · `Raspberry Pi` · `MQTT` · `HTTP` · `LoRa`

**Fabrication numérique :**
`FreeCAD` · `Impression 3D FDM` · `Prototypage rapide` · `Design industriel`

**Automatisation & NoCode :**
`Airtable` · `Notion` · `Make` · `Systeme.io`

**Gestion de projet :**
Management opérationnel · Planification · Accompagnement smart city · Product Management

---

#### Photo de l'atelier

*(Section galerie : 3 à 6 photos réelles de l'espace de travail, des prototypes en cours, des équipements)*

---

#### CTA

- `Voir mes projets →` *(lien Projets)*
- `Travaillons ensemble →` *(lien Contact)*

---

## 06 — CONTACT

> *Objectif : Réduire la friction au maximum. Un formulaire simple, un délai clair, une invitation à agir.*

### En-tête de page

- **Titre** : *"Parlons de votre projet"*
- **Sous-titre** : *"Vous avez une idée, un besoin technique ou une question ? Je réponds à chaque message. Sous 48h ouvrées, toujours."*

---

### Formulaire de contact

```
Prénom & Nom          [champ texte]
Entreprise / Structure [champ texte]
Type de besoin        [sélecteur : IoT · Domotique · Growth/Digital · Formation · Autre]
Budget indicatif      [sélecteur : < 500$ · 500–2000$ · 2000–5000$ · > 5000$ · À définir]
Votre message         [textarea]
                      [Bouton : Envoyer le message →]
```

---

### Informations complémentaires

- 📬 **Délai de réponse** : *Sous 48h ouvrées*
- 🌍 **Localisation** : Cotonou, Bénin (disponible en remote pour tout projet)
- 🔗 **Site INOVA Makers** : [inovamakers.io](https://inovamakers.io)

---

### Liens réseaux sociaux

| Plateforme | Rôle |
|------------|------|
| LinkedIn | Autorité B2B · Études de cas · Réseau décideurs |
| TikTok | Démos techniques · Notoriété · Viralité |
| YouTube | Tutoriels · Projets en profondeur |
| Newsletter | Signal du Maker · Chaque jeudi à 8h |

---

## Charte Graphique (Rappel pour intégration)

### Couleurs

| Rôle | Valeur hex |
|------|------------|
| Noir Anthracite (texte & symbole) | `#333333` |
| Blanc / Off-White (fond) | `#f9f9f9` |
| Bleu Électrique / Tech (CTA, liens) | `#0064ff` |
| Gris Acier (textes secondaires) | `#707070` |

### Typographie

| Usage | Police |
|-------|--------|
| Titres H1–H2 | Orbitron Black — 28 à 48pt |
| Sous-titres | Orbitron Bold — 18 à 24pt |
| Corps de texte | Cascadia Mono Regular — 11 à 13pt |
| Extraits de code | JetBrains Mono — fond `#F4F4F4` |
| Overlays vidéo | Orbitron ExtraBold |

### Règles logo

- **Fond sombre** : logo blanc
- **Fond clair** : logo noir
- Ne jamais déformer, pivoter ou étirer le logo
- Espace de protection = hauteur de la lettre "G" tout autour

### Photos recommandées

- Prototypes réels et gros plans circuits imprimés
- Vues atelier propre et organisé
- Portrait semi-professionnel dans l'atelier (lumière naturelle)
- Fond hero page Accueil : photo atelier + overlay sombre 50%
- Éviter les photos génériques ou banques d'images

---

*© INOVA Makers · Guyz Maker · 2026 — Document de référence portfolio*
*[inovamakers.io](https://inovamakers.io)*
