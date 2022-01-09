# nodejs-records-api

## Overview

RestApi that fetches data from MongoDB.

The solution consists of an API built using `Express` web framework. The API contains 2 endpoints:

- `GET ​/api/health`: can be used for health check. Returns 200 OK.
- `POST ​/api/records`: receives a query payload that is used to fetch data from MongoDB. Returns an object with code, message, and records fields. The filtered data, if any, will be present on `records` field. Returns 200 OK, 400 Bad Request (in case of validation errors), or 500 (in case of unexpected or database errors).

Regarding the design and implementation details, the `server.js` file contains the database connection and web server startup. The API routes are defined in the `routes/routes.js` file. And the implementation of the `POST /api/records` endpoint is present on `controllers/recordsController.js` file.

At the controller, the request is validated and the database is called. After getting the response from the database, or in case of any error, the `buildResponse` method is called to create a standard response contract.

For the database connection, `mongoose` lib was used. It provides a schema-based solution and query builders for MongoDB.

And the request validation was done with `Ajv` lib. Ajv allows JSON validations based on JSON schema. The schema can be found in the `validators/recordsValidator.js` file. JSON schema provides a standard to describe the contract rules, making it easy to create both simple and complex validation rules.

## Tests

There are 2 test suites in the project: `recordsController.test.js` and `recordsValidator.test.js`.

The test framework used is `jest`. For the `recordsController.test.js` suite, an additional lib called `supertest` was used to allow HTTP requests without running the server. The database call was mocked, so the unit tests don't depend on any external dependence.

## Usage

To run the project just type `npm start` or `nodemon server.js`. Default port is `5000`. Example: `http://localhost:5000/api/health`.

To run the tests: `npm run test`.

The database connection string is loaded from an environment variable called `MONGO_URI`. Locally, a file named `.env` can be created and the variable can be added to the file. Example of the contents for the `.env` file:

```
MONGO_URI=%MONGO_DB_URL%
```

Or run the following command: `echo MONGO_URI=%MONGO_DB_URL% > .env`. Place the real connection string at the `%MONGO_DB_URL%` placeholder.

## Deployment

The application was deployed at Heroku. It's connected to the GitHub repo, so the code is automatically deployed on every commit. The application is running [here](https://nodejs-records-api.herokuapp.com). Endpoints are:

- `GET ​/api/health`: [https://nodejs-records-api.herokuapp.com/api/health](https://nodejs-records-api.herokuapp.com/api/health)
- `POST ​/api/records`: [https://nodejs-records-api.herokuapp.com/api/record](https://nodejs-records-api.herokuapp.com/api/records)

## Future improvements

Here are some suggestions for future improvements:

- Add swagger documentation: it's a good practice for APIs, it makes it easier for the consumers of the API to know all the resources and operations available, and also to test or use them.
- Tests: despite the coverage of unit tests, it's important to create integration and/or E2E tests that target a fully running application.
