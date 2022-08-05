# Welcome to Trelljoe!

## Overview
--- 

Trelljoe is a project management website. It allows users to create a personal account and create, modify, and delete projects and tasks. The user's account information along with all of the project and task information is stored in a database indefinitely. A working version of the website has been published on [Heroku](https://trelljoe.herokuapp.com/). If you would like to try it out you can use the "Guest" feature. 

*Note: All data created as a Guest will be destroyed when logged out.* 

### Languages/ Technologies Utilized
- Javascript
- Node.js
- Express
- Sequelize
- ES6 Template Engine
- ElephantSQL
- HTML/CSS
- Heroku

## Background
---
The creators of Trelljoe, [Andrea Tran](https://github.com/eyyytran) and [Jason Blunck](https://github.com/jasonian5000), are both students in the DigitalCrafts Web Developer program. This project is their first full stack assignment as well as their first team assignment in the program. The front end was primarily created by Andrea and the backend was primarily created by Jason. 

Why call it "Trelljoe"? The idea was to create a website with functionality similar to the project management site [Trello](https://trello.com/). The name "Trellojoe" is a portmanteau of "Trello" and the name of our beloved instructor [Joe Frasier](https://github.com/jwfrasier).

## Usage
---

If you just want to try it out you can find a published version on [Heroku](https://trelljoe.herokuapp.com/). If you would like to download the repo and run it locally you will need a few things.

1. Clone the repository using whatever method you are most comfortable. You may use the **Code** button above and follow one of the methods provided.

2. Make sure you have node.js and npm installed in your coding environment. For more information read the [npm documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). It is also recommended you install [nodemon](https://www.npmjs.com/package/nodemon).

3. Navigate your coding terminal to the `DC_Backend_Project` directory where the repository was downloaded and run the command `npm update`. This should install the necessary node modules. 

4. You will need to create a database. You may choose to do this locally using [PostgreSQL](https://www.postgresql.org/docs/current/tutorial.html) or through a free web service like [ElephantSQL](https://www.elephantsql.com/).

5. Navigate to the `DC_Backend_Project/db/config` directory and create a file called `config.json` if there is not one already. In the `config.json` you will need the following
```{
  "development": {
    "username": YOUR_USERNAME,
    "password": YOUR_PASSWORD,
    "database": YOUR_DATABASE_NAME,
    "host": YOUR_HOST_ADDRESS,
    "dialect": "postgres"
  },
  "test": {
    "username": YOUR_USERNAME,
    "password": YOUR_PASSWORD,
    "database": YOUR_DATABASE_NAME,
    "host": YOUR_HOST_ADDRESS,
    "dialect": "postgres"
  },
  "production": {
    "username": YOUR_USERNAME,
    "password": YOUR_PASSWORD,
    "database": YOUR_DATABASE_NAME,
    "host": YOUR_HOST_ADDRESS,
    "dialect": "postgres"
  }
}
```
Replace the lines starting with `YOUR` with corresponding information relevant to your database. This will depend on how you chose to setup your database.

*Note: It is recommended that you DO NOT SHARE your database login information and you DO NOT PUBLISH it on GitHub or any repository.*

6. Navigate your terminal to the `/DC_Backend_Project` directory and run the command `nodemon` or just `node` if you chose not to install nodemon.

7. With the local server running you may now open a browser and navigate to http://localhost:3001/index to use the app.

---
You can read more about how we created this project at [dev.to]()
