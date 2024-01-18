
# Mongoose Crash Course - Beginner Through Advanced
### https://www.youtube.com/watch?v=DZBGEVgL2eE
## Shows Most of the Functionality using Mongoose

## initialize node project
$ npm init -y

## install project dependency
$ npm i mongoose dotenv

## install develop-env dependency (nodemon will refresh each change and re-run, dotenv to read environment V's)
$ npm i --save-dev nodemon

## create/edit env file
$ touch .env

## the file should contains:
ATLAS_URL=mongodb+srv://<user>:<pass>@<cluster.name>.mongodb.net/testdb?retryWrites=true&w=majority


##  RUN
$ nodemon script.js