## Projet 7 GROUPOMANIA - Développeur web - OpenClassRooms 
## Création d'un réseau social pour l'entreprise Groupomania.

Version 1 de développement permettant un test par un employé du groupe.


## Développement du Projet :
Backend : NodeJS 17  + express + sequelize Base de données : MySQL2 ;

Backend_Package : ( bcryptjs, cookie-parser, dotenv, express, express-rate-limit, helmet, jsonwebtoken, moment, multer, mysql2, sequelize v6)

Frontend : React 18 + Sass ;

Frontend_Package : (emotion/react, emotion/styled, mui/icons-material, @mui/material, axios, node-sass, react, react-dom, react-router-dom, web-vitals)

## Configuration de l'application

Vous devez completer le fichier .sample.env dans le dossier back avec les données qui sont demandées.
Le fichier dois être renomé de .sample.env à .env

## Back-end :

Ouvrir une commande powershell. 

cd back

npm install

npm start


## Frontend :

Depuis le terminal de l'éditeur de code, se rendre sur le dossier "front" et exécuter la commande :

npm install

npm start

Ouvrir ensuite votre navigateur et accéder à : http://localhost:3000/

## Base de données :

Vous avez 2 choix:

## 1 - Création automatique de la base de donées

La base de données sera crée automatiquement la premiere fois que le serveur est lancé.
Les données pour configurer la base de données doivent etre remplis sur le fichier .env qui est sur le dossier "back".

Vous completez les champs demandées en ajoutant les données que vous avez choissi pour la base de donées sauf le champ HOST qui doit être "localhost". 

Un utilisateur administrateur serait crée automatiquement aussi avec les données remplis.
 
    Exemple: 

    DB_USER = "root"
    DB_PASSWORD = "6rssy3VkXLGNvSSzU"
    DEFAULT_DATABASE = "groupomania"
    HOST = "localhost"
    ADMIN_LASTNAME="Perez"
    ADMIN_NAME="Maria"
    ADMIN_PASS = "Admin1234."
    ACCESS_TOKEN_SECRET = "e9440169295fdd78cf875b7b2055224a2090c2637c5c5542e9e621f047e663c85e3324"
    REFRESH_TOKEN_SECRET = "9d9e7f4570476f3ab32031dc642066f3c195d3d059074495547174f9641b3a2a80b27"
    ORIGINS_ALLOWED = '["http://127.0.0.1:3000","http://localhost:3000","http://127.0.0.1:3001","http://localhost:3001","http://127.0.0.1:3002","http://localhost:3002"]'

Vous lancez le serveur. Si tout est correcte vous pouvez lancer le front. S'il y a un erreur, reesayée d'écrire sur la terminal "rs". Normalement ça solutionne le probleme.


## 2 - Création et configuration manuelle.

Se connecter à un serveur MySQL et créer une base de donnée Ex : 'CREATE DATABASE nomDeLaBase'

Importer le fichier database_groupomania.sql situé dans back/db/ dans la base de donnée

Ex : mysql -u root -p nomDeLaBase < chemin_vers_le_fichier_database_groupomania.sql

NB : Veuillez indiquer ci dessus le chemin complet vers le fichier database_groupomania.sql selon l'endroit ou vous l'aurez sauvegardé

User de la Base de Données: root
Password de la Base de Données: 6rssy3VkXLGNvSSzU

L'email administrateur est admin@groupomania.com et le password est Admin1234. (avec le point au final).




