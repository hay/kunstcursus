# Kunst kijken met Boijmans
Een online cursus om op een andere manier naar kunst te kijken.

## Over de cursus
* Om de cursus uit te proberen ga je naar [boijmans.nl/kunstkijken](https://www.boijmans.nl/kunstkijken).
* [Bekijk de video](https://www.youtube.com/watch?v=RD_nYjTIx9M)
* [Nieuwsartikel op de site van Boijmans](https://www.boijmans.nl/nieuws/art-mediation-en-de-digitale-tentoonstellingsruimte)

## Over deze applicatie
Deze applicatie is bedacht en ontworpen door [Brigitte Jansen](http://www.brigittejansen.com/) en gebouwd door [Hay Kranen](https://www.haykranen.nl/). Het is een volledig statisch gebouwde applicatie. Dat wil zeggen dat er geen backend-technologie aan vast zit, zoals een CMS of een database. De inhoud wordt beheerd door middel van een Google Spreadsheet. De applicatie zelf is gebouwd in HTML, CSS en Javascript, op basis van het [Vue.js](https://vuejs.org/) framework.

## Installatie
Je hebt een recente versie nodig van [Node.js](https://nodejs.org/en/). Eerst clone je deze repo:

    git clone git@github.com:hay/kunstcursus.git

Vervolgens installeer je alle benodigde dependencies met `npm` of `yarn`

    npm install

Met behulp van `parcel` kun je ontwikkelen

    npm run dev

De data van de Google Spreadsheet kun je ophalen met

    npm run fetch-data

Een distributie-versie kun je bouwen met

    npm run build

## Contact
* [Hay Kranen](https://www.haykranen.nl/)
* [Brigitte Jansen](http://www.brigittejansen.com/)