import logoVR from './assets/logos/logo.png'
import logoCStudio from './assets/logos/LogoCSTUDIO.png'
import logoClubTech from './assets/logos/ClubTech.png'
import logoAlgorithmics from './assets/logos/AlgorithmiCS.png'
import logoCSDesign from './assets/logos/CSDesign.png'
import logoLinkCS from './assets/logos/linkcs.png'
import logoPics from './assets/logos/pics.png'
import { createContext } from 'react'

const Session = createContext(null);

const assoCStudio = {
    name: 'CStudio',
    pathLogo: logoCStudio,
    texteAsso: "Les jeux vidéo c’est sympa, mais comment en concevoir un soi-même ? Avec CStudio, apprends toutes les bases pour créer un jeu : de la manipulation de moteur 3D comme Unity à celle de modélisateur 3D comme Blender en passant par les principes du Game Design. Avec nous, tu auras l’opportunité de mettre ces connaissances en pratique lors de sessions de code cohez, de projets persos ou de groupe, ou même lors de Game Jams ! Le club est ouvert à toutes et à tous pour redécouvrir la passion du jeu vidéo ensemble !CStudio est l'association de développement de Jeux Vidéo de CentraleSupélec, on est super cool et funs ! n'hésite pas à nous rejoindre quand tu veux =)",
    website: 'https://cstudio.cs-campus.fr/'
}

const assoVR = {
    name: "ViaRézo",
    pathLogo: logoVR,
    texteAsso: "ViaRézo (ou VR) est une association d'informatique et de réseaux omniprésente à CentraleSupélec et à Césal : nous fournissons un wifi haut débit aux étudiants dans les résidences à l'aide d'une infrastructure conséquente, constituée de matériel professionnel. De plus, nous développons des services web avec les technologies les plus répandues et nous organisons, en partenariat avec la DGSE, un grand tournoi de cybersécurité (TRACS) 🕵️‍♀️ L'apprentissage prend une très grande place à VR car beaucoup de nos membres y entrent débutant•e•s 😊 Enfin, nous nous retrouvons souvent ensemble pour chill dans notre local autour de bouffes ou films cohez !",
    website: "https://viarezo.fr/"
}

const assoClubTech = {
    name: "Club Tech",
    pathLogo: logoClubTech,
    texteAsso: "Le Club Tech est l’asso de tous les passionnés de robotique, mécanique et électronique. Aucun prérequis n'est demandé, nous te formerons lors de projets avec la Fabrique, le FabLab de CS. Tu réalisera de nombreux prototypes et laissera cours à ton imagination. Rejoins nous pour réaliser des projets/compétitions ensemble, comme une borne d’arcade, un robot Beer Pong ou la mythique Coupe de France de Robotique...",
    website: "https://linkcs.fr/association/club-tech-50"
}

const assoAlgorithmiCS = {
    name: 'AlgorithmiCS',
    pathLogo: logoAlgorithmics,
    texteAsso: "The Competitive Programming Association is the students' association whose goal is to organize training, share interesting competitive programming material and generally provide a context for cooperation in this field.Through the association's activities, members should acquire valuable algorithmic knowledge and will have a chance to compete with a decent level in prestigious competitive programming contests such as the SWERC, which is a qualifier to the ICPC.",
    website: "https://linkcs.fr/association/competitive-programming-association-430"
}

const assoCSDesign = {
    name: 'CS Design',
    pathLogo: logoCSDesign,
    texteAsso: "CS Design, ou juste « le Design », est le club regroupant toutes les personnes passionnées de design graphique. C'est notre club qui crée une grande partie des affiches d'evenements et des logos d'associations sur le campus ! Mais nous ne faisons pas que des affiches ou des logos, nous avons aussi des projets spéciaux. Parmi. eux figurent la carte du campus, la Plaquette Alpha, un jeu de carte aux couleurs de CS, et de nombreux autres projets. Et parce qu'une affiche sur ordinateur c'est bien, mais en papier c'est mieux, nous imprimons des affiches et stickers pour tout le campus. D'ailleurs, nos activités ne s'arrêtent pas aux portes de l'école, nous faisons des prestations extérieures pour l'école, pour des entreprises, des start-ups d'alumni et même un blason pour un satellite du CNES. Alors, si toi aussi tu trouves ça stylé d'embellir le monde autour avec tes créations, rejoins le Design à nos côtés !",
    website: 'https://csdesign.cs-campus.fr/'
}

const assoLinkCS = {
    name: 'LinkCS',
    pathLogo: logoLinkCS,
    texteAsso: "",
    website: 'https://linkcs.fr'
}

const assoPics = {
    name: 'Pics',
    pathLogo: logoPics,
    texteAsso: "Description Pics chasse au trésor : Pics est l’association de photographie de CentraleSupélec. Passionné.e.s de photos, nous immortalisons tous les évènements du campus, des soirées aux activités organisées par les autres associations : c'est l'occasion unique de découvrir de façon privilégiée les coulisses de l'associatif. Nous participons également à des prestations pour des clients extérieurs. Toutes nos photos sont disponibles sur galerie.pics, n'hésite pas à y faire un tour 📸 La plupart de nos membres ont commencé la photographie à CentraleSupélec, nous accueillons donc expert.e.s et débutant.e.s pour expérimenter avec nos nombreux boitiers, objectifs et accessoires divers ou pour tout simplement passer des bons moments avec nous !",
    website: "https://galerie.pics"
}

const listeAsso = [assoCStudio, assoVR, assoPics, assoLinkCS, assoCSDesign, assoClubTech, assoAlgorithmiCS]

export { Session, listeAsso }
