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
* Remplacer dans Test.js et Authenticate.js l'url par localhost:3001 (s'il n'y a pas d'autre url c'est bon !)
* Créer un fichier config.json en utilisant le template et mettre http://localhost:3001 en domain
* Lancer le docker MySQL personnalisée dans le dossier bdd-chasse. Ne pas oublier de modifier MYSQL_ROOT_PASSWORD pour y mettre un mot de passe plus sécurisée. 

```
cd bdd-chasse/
```
```
docker build . -t bdd-chasse
```
```
docker run --name bdd-chasse -p 3306:3306 --env MYSQL_DATABASE=letresor --env MYSQL_USER=captain --env MYSQL_PASSWORD=sacrebleu --env MYSQL_ROOT_PASSWORD=poney -d bdd-chasse
```

* Relancer le back
* Lancer le front

Il est possible qu'il faille lancer un *npm install* après un changement de branche.
