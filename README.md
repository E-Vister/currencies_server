<h1 align="center">
  Currency Converter API
</h1>

<p align="center">
  <a href="#what-is-it">What is it?</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#running_the_app">Running the app</a>
  •
  <a href="#test">Test</a>
  •
  <a href="#documentation">Documentation</a>  
  •
  <a href="#contacts">Contacts</a>
  •
  <a href="#license">License</a>
</p>

What is it?
-----------
[currencies_server](https://github.com/E-Vister/currencies_server) is a REST API server
for [currency_converter](https://github.com/E-Vister/currency_converter) app. It provides some endpoints for effective
work
with the currencies.

Technologies that have been used:

* Express
* NestJS
* TypeScript
* Axios
* Jest
* Sequelize
* Swagger

Installation
-----------

- Open the terminal and run the following commands

```bash
$ git clone https://github.com/E-Vister/currencies_server

$ cd currencies_server

$ npm install
```

- Wait for all the dependencies to be installed
- Create environment files `.development.end` and `.production.env` similar to the `.env` file for working with the
  database

Running the app
-----------

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Test
-----------

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

Documentation
-------------
All documentation you can find on the endpoint `'/api/docs/'`.

Contacts
--------
If you want to contact the author, please send an e-mail via visterovegor@gmail.com

License
-----------

Nest is [MIT licensed](LICENSE).
