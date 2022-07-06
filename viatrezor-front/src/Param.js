import logo from './assets/logos/logo.png'
import logoCStudio from './assets/logos/LogoCSTUDIO.png'
import { createContext } from 'react'

const Session = createContext(null);

const assoCStudio = {
    name: 'CStudio',
    pathLogo: logoCStudio,
    texteAsso: "CStudio est l'association de développement de Jeux Vidéo de CentraleSupélec, on est super cool et funs ! n'hésite pas à nous rejoindre quand tu veux =)",
    website: 'https://cstudio.cs-campus.fr/'
}

const assoVR = {
    name: "Test",
    pathLogo: logo,
    texteAsso: "VR est simplement la meilleure asso du campus !",
    website: "https://viarezo.fr/"
}

const listeAsso = [assoCStudio, assoVR]

export { Session, listeAsso }
