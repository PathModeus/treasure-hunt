# Chasse au Trésor

This project gathers the code of the treasure hunt realized during the Weild Weeks.
If you have any questions, please contact Noxov, Byejablek or Path!

## Structure

This repository is divided in two main folders: viatrezor-front and viatrezor-back.

The website is currently hosted on ViaRézo's Kubernetes cluster on chasseautresor.cs-campus.fr.

There is a gitlab CI that automatically deploys what is pushed on the main branch so that the changes immediately take place on the site.

## Front-end

The front-end is written using the Javascript framework React.

## Back-end

The back-end is written using the Javascript framework ExpressJs.

## Database

The database is not currently hosted on Kubernetes but can be set up locally using a simple MySQL Docker.


## Attention, Pour lancer en local, suivez les instructions suivantes :
* Remplacer dans Test.js et Authenticate.js l'url par localhost:3001
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
mysql -u root -p
```
* Lancer la commande suivante
```
ALTER USER 'captain'@'%' IDENTIFIED WITH mysql_native_password BY 'sacrebleu';
```
* Quitter le Docker
* Décommenter les instructions SQL d'initialisation de la BDD dans back/src/diverse/bdd.js
* Lancer le back
* Commenter les instructions (Sinon on obtient un problème à chaque fois qu'on relance le back, puisqu'on ne peut pas réinsérer les valeurs d'initialisation. @Chenow doit régler ca en s'arrangeant pour que l'image Docker créée contienne les instructions d'initialisation)
* Relancer le back
* Lancer le front

Il est possible qu'il faille lancer un *npm install* après un changement de branche.
