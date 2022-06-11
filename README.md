# Chasse au Trésor

This project gathers the code of the treasure hunt realized during the Weild Weeks.
If you have any questions, please contact Noxov, Byejablek or Path!

## Attention, Pour lancer en local, suivez les instructions suivantes :
* Remplacer dans Test.js et Authenticate.js l'url par localhost:3001
* Lancer un docker MySQL avec les paramètres donnés dans back/src/diverse/bdd.js
* S'y connecter en tant que root
* Entrer dans MySQL
* Lancer la commande suivante
```
ALTER USER 'captain'@'%' IDENTIFIED WITH mysql_native_password BY 'sacrebleu';
```
* Quitter le Docker
* Décommenter les instructions SQL d'initialisation de la BDD dans back/src/diverse/bdd.js
* Lancer le back
* Commenter les instructions
* Relancer le back
* Lancer le front

Il est possible qu'il faille lancer un *npm install* après un changement de branche.

