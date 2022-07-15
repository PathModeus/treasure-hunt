# Chasse au Trésor

This project gathers the code of the treasure hunt realized during the Weild Weeks.
If you have any questions, please contact Noxov, Byejablek or Path!

## ATTENTION: A FAIRE AVANT UN EVENEMENT

- S'assurer que la bdd a bien été réinitialisée juste avant l'événement.

## Structure

This repository is divided in two main folders: viatrezor-front and viatrezor-back.

The website is currently hosted on ViaRézo's Kubernetes cluster on chasseautresor.cs-campus.fr.

There is a gitlab CI that automatically deploys what is pushed on the main branch on chasseautresor.cs-campus.fr so that the changes immediately take place on the site while whatever was most recently pushed on chasseautresor.test.cs-campus.fr

## Front-end

The front-end is written using the Javascript framework React.

## Back-end

The back-end is written using the Javascript framework ExpressJs.

## Database

The database runs within a pod on Kubernetes, in order to access the database here's the recipe:

- 1. ssh to the cluster:

  - `ssh 138.195.140.221` for production
  - `ssh 138.195.139.68` for staging

- 2. become root: `sudo su`
- 3. set current namespace to **chasseautresor** :

  - `kcn chasseautresor`

- 4. get the mysql password:

  - `kubectl get secret chasseautresor-mysql -o jsonpath="{.data.mysql-password}" | base64 -d`

- 5. connect to the database with the precedent password:

  - `kubectl exec -it mysql-0 -- mysql -u chasseautresor -p`

## Attention, Pour lancer en local, suivez les instructions suivantes :

- Créer le .env en utilisant le template dans viatrezor-front
- Créer un fichier config.json en utilisant le template (demander à un admin auth)
- Lancer un docker MySQL avec les paramètres donnés dans back/src/diverse/bdd.js

```bash
docker run -p 3306:3306 --env MYSQL_DATABASE=letresor --env MYSQL_USER=captain --env MYSQL_PASSWORD=sacrebleu --env MYSQL_ROOT_PASSWORD=poney -d mysql
```

- S'y connecter

```bash
docker exec -it <id/nom du docker> bash
```

- Entrer dans MySQL en tant que root

```bash
mysql -p
```

- Lancer la commande suivante

```bash
ALTER USER 'captain'@'%' IDENTIFIED WITH mysql_native_password BY 'sacrebleu';
```

- Quitter le Docker
- Lancer le back
- Lancer le front

Il est possible qu'il faille lancer un _npm install_ après un changement de branche.

## Points d'amélioration:

- Améliorer le front, le rendre joli
- Vérifier que les pages sont responsives
- Documenter le code
- Proprifier le code --> Restructurer
- Ajouter une page où on peut voir toutes les équipes et leur activité en cours (notamment pour que les VRgens puissent être vraiment superadmins) --> Hamza
- Ajouter les champs description, logopath, etc à la table activités, pour que l'on puisse juste ajouter des activités dans la bdd et que ce soit pris en compte
- Avoir la liste des joueurs inscrits --> Hamza
- Faire que les websockets actualisent le front partout (Tests à faire pour déterminer où ca ne fonctionne pas et pinger Hamza si on en trouve)
- npm audit fix --force (A voir après la rentrée)
- Rajouter une websocket pour que tous les admins fetch les nouvelles équipes qui arrivent sur leur activité (dont après la création d'équipe) --> Hamza
- Mettre les noms des assos comme clés primaires de la table activité et faire les modifs qui vont avec (Réfléchir au nouveau schéma) --> Antoine
- Faire en sorte que les Vr gens puissent avoir accès à toutes les épreuves (toutes les interfaces admin réunies)
- Faire en sorte que le menu se referme dès qu'on clique dessus --> Antoine
- Update les barres de réseau quand on passe une épreuve (websockets) --> Hamza & Aymeric
- Trouver un moyen d'accéler l'inscription des équipes (côté joueur) --> Antoine
- Ajouter des websockets pour le classement
- Centrer les éléments du leaderboard
- Changer le résultat de la page login après connexion
- Faire que s'authentifier devienne déconnexion dans la navbar après connexion
