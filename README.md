# Chasse au Trésor

This project gathers the code of the treasure hunt realized during the Weild Weeks.
If you have any questions, please contact Noxov, Byejablek or Path!

## WARNING: To launch it on your machine, you must replace the URL in Test.js and Authenticate.js by localhost:3001

## Structure

This repository is divided in two main folders: viatrezor-front and viatrezor-back.

The website is currently hosted on ViaRézo's Kubernetes cluster on chasseautresor.cs-campus.fr.

There is a gitlab CI that automaically deploys what is pushed on the main branch so that the changes immediately take place on the site.

## Front-end

The front-end is written using the Javascript framework React.

## Back-end

The back-end is written using the Javascript framework ExpressJs.

## Database

The database is not currently hosted on Kubernetes but can be set up locally using a simple MySQL Docker.

**WARNING:** The authentication method doesn't currently work, you need to manually connect to the database and then run the following command: 
```
ALTER USER 'captain'@'%' IDENTIFIED WITH mysql_native_password BY 'sacrebleu';
```

Be careful, to initiate the database, you need to start the back the first time with the queries uncommented in bdd.js
