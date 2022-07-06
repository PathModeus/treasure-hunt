# Chasse au Trésor

This project gathers the code of the treasure hunt realized during the Weild Weeks.
If you have any questions, please contact Noxov, Byejablek or Path!

## ATTENTION: A FAIRE AVANT UN EVENEMENT

* S'assurer que la bdd a bien été réinitialisée juste avant l'événement.

## Structure

This repository is divided in two main folders: viatrezor-front and viatrezor-back.

The website is currently hosted on ViaRézo's Kubernetes cluster on chasseautresor.cs-campus.fr.

There is a gitlab CI that automatically deploys what is pushed on the main branch on chasseautresor.cs-campus.fr so that the changes immediately take place on the site while whatever was most recently pushed on chasseautresor.test.cs-campus.fr

## Front-end

The front-end is written using the Javascript framework React.

## Back-end

The back-end is written using the Javascript framework ExpressJs.

## Database

The database can be set up locally using a simple MySQL Docker.


## Attention, Pour lancer en local, suivez les instructions suivantes :

* Créer le .env en utilisant le template dans viatrezor-front
* Créer un fichier config.json en utilisant le template (demander à un admin auth)
* Lancer un docker MySQL avec les paramètres donnés dans back/src/diverse/bdd.js
```
docker run -p 3306:3306 --env MYSQL_DATABASE=letresor --env MYSQL_USER=captain --env MYSQL_PASSWORD=sacrebleu --env MYSQL_ROOT_PASSWORD=poney -d mysql
```
* S'y connecter
```
docker exec -it <id/nom du docker> bash
```
* Entrer dans MySQL en tant que root
```
mysql -p
```
* Lancer la commande suivante
```
ALTER USER 'captain'@'%' IDENTIFIED WITH mysql_native_password BY 'sacrebleu';
```
* Quitter le Docker
* Lancer le back
* Lancer le front

Il est possible qu'il faille lancer un *npm install* après un changement de branche.

## Points d'amélioration :

- Améliorer le front, le rendre joli
- Documenter le code
- Ajouter une page où on peut voir toutes les équipes et leur activité en cours (notamment pour que les VRgens puissent être vraiment superadmins)
- Ajouter les champs description, logopath, etc à la table activités, pour que l'on puisse juste ajouter des activités dans la bdd et ue ce soit pris en compte
- Avoir la liste des joueurs inscrits
- Faire que les websockets actualisent le front partout
- npm audit fix --force
- Remove filter on team_name dans l'algo next_chall
- Effacer la session auth quand on clique sur se déconnecter
- Rajouter une websocket pour la création d'équipe
- HANDLE LA FIN DU JEU
- Mettre les noms des assos comme clés primaires de la table activité
- Faire en sorte que les Vr gens puissent avoir accès à toutes les épreuves
- Faire en sorte que le menu se referme dès qu'on clique dessus
- Update les barres de réseau quand on passe une épreuve (websockets)
- Changer la CI et l'env pour mettre REACT_APP_SOCKETURL
- Revert les modif pour drop la bdd à chaque redémarrage du back
