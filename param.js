<<<<<<< HEAD
class Epreuve { /*Cette classe permet de définir une épreuve pour la chasse au trésor de votre année !*/
    constructor(name, texteOrientation, texteEpreuve, texteFin) {
    
        this.name = name /*Nom de l'épreuve qui apparaitra dans la Bdd et sur le Leadeboard*/

        this.texteOrientation = texteOrientation /*Texte affiché aux participants pour se rendre à l'épreuve*/

        this.texteEpreuve = texteEpreuve /*Texte affiché lors de l'épreuve*/

        this.texteFin = texteFin /*Texte affiché une fois l'épreuve complétée*/
    
    }
}

const EpreuveCStudio = new Epreuve('Jeu Video', 'Pour obtenir la prochaine barre de réseau il faudra que vous complétiez un Jeu Vidéo. Rendez-vous en Sd.201 pour affronter vos adversaires !','Que le meilleur gagne !','Félicitation ! Ce jeu nous a permis de gagner une nouvelle barre !')

const ListeEpreuve = [EpreuveCStudio] /*Une fois que chaque épreuve est définie, tabulez les toutes dans cette liste*/

const nbEpreuve = ListeEpreuve.length

const ListeStaffeurs = ['2021brayto'] /*Cette liste permet de définir les staffeurs pour la chasser au Trésor. Ils auront accès à l'interface administrateur du leaderboard*/

=======
class Epreuve { /*Cette classe permet de définir une épreuve pour la chasse au trésor de votre année !*/
    constructor(name, texteOrientation, texteEpreuve, texteFin) {
    
        this.name = name /*Nom de l'épreuve qui apparaitra dans la Bdd et sur le Leadeboard*/

        this.texteOrientation = texteOrientation /*Texte affiché aux participants pour se rendre à l'épreuve*/

        this.texteEpreuve = texteEpreuve /*Texte affiché lors de l'épreuve*/

        this.texteFin = texteFin /*Texte affiché une fois l'épreuve complétée*/
    
    }
}

const EpreuveCStudio = new Epreuve('Jeu Vidéo', 'Pour obtenir la prochaine barre de réseau il faudra que vous complétiez un Jeu Vidéo. Rendez-vous en Sd.201 pour affronter vos adversaires !','Que le meilleur gagne !','Félicitation ! Ce jeu nous a permis de gagner une nouvelle barre !')

const ListeEpreuve = [EpreuveCStudio] /*Une fois que chaque épreuve est définie, tabulez les toutes dans cette liste*/

const nbEpreuve = ListeEpreuve.length

const ListeStaffeurs = ['2021brayto'] /*Cette liste permet de définir les staffeurs pour la chasser au Trésor. Ils auront accès à l'interface administrateur du leaderboard*/

>>>>>>> 020399a83cd05f73758b9b4ef27b204f52cf9216
export default Param