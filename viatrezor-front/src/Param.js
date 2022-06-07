import logo from './assets/logos/logo.png'
import logoCStudio from './assets/logos/LogoCSTUDIO.png'

class Epreuve { /*Cette classe permet de définir une épreuve pour la chasse au trésor de votre année !*/
    constructor(name, texteOrientation, texteEpreuve, texteFin) {
    
        this.name = name /*Nom de l'épreuve qui apparaitra dans la Bdd et sur le Leadeboard*/

        this.texteOrientation = texteOrientation /*Texte affiché aux participants pour se rendre à l'épreuve*/

        this.texteEpreuve = texteEpreuve /*Texte affiché lors de l'épreuve*/

        this.texteFin = texteFin /*Texte affiché une fois l'épreuve complétée*/
    
    }
}


const epreuveCStudio = new Epreuve('Jeu Vidéo', 'Pour obtenir la prochaine barre de réseau il faudra que vous complétiez un Jeu Vidéo. Rendez-vous en Sd.201 pour affronter vos adversaires !','Que le meilleur gagne !','Félicitation ! Ce jeu nous a permis de gagner une nouvelle barre !')

const listeEpreuve = [epreuveCStudio] /*Une fois que chaque épreuve est définie, tabulez les toutes dans cette liste*/

const assoCStudio = {    
    name:'CStudio',
    pathLogo: logoCStudio,
    texteAsso:"CStudio est l'association de développement de Jeux Vidéo de CentraleSupélec, on est super cool et funs ! n'hésite pas à nous rejoindre quand tu veux =)",
    website:'https://cstudio.cs-campus.fr/'
}

const assoVR = {
    name: "Test",
    pathLogo: logo,
    texteAsso: "VR est simplement la meilleure asso du campus !",
    website:"https://viarezo.fr/"
}

const listeAsso = [assoCStudio, assoVR]

const listeStaffeurs = ['2021brayto'] /*Cette liste permet de définir les staffeurs pour la chasser au Trésor. Il suffit de rentrer leurs identifiants auth. Ils auront accès à l'interface administrateur du leaderboard*/

export { listeEpreuve, listeAsso, listeStaffeurs }