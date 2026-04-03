# Banco API Test

![Node](https://img.shields.io/badge/node-%3E%3D18-green)
![Tests](https://img.shields.io/badge/tests-mocha-blue)
![Assertions](https://img.shields.io/badge/assertions-chai-orange)
![HTTP Testing](https://img.shields.io/badge/http-supertest-yellow)
![Reports](https://img.shields.io/badge/reports-mochawesome-red)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Automated REST API test suite for the **Paula Bank API**.

This repository demonstrates a professional-grade API testing structure
using **Node.js and modern QA automation tools**.\
It is designed as a **portfolio project for QA Engineers and Backend
Test Automation roles**.

Repository under test: https://github.com/paulacristinaqa/paula_bank_api

------------------------------------------------------------------------

# Project Goal

The purpose of this project is to demonstrate:

-   Automated REST API testing
-   Clean and maintainable test architecture
-   Professional reporting of automated tests
-   Practical use of modern JavaScript QA tooling

This project can be used as:

-   A **portfolio project for QA Engineers**
-   A **reference architecture for API test automation**
-   A **learning project for Node.js API testing**

------------------------------------------------------------------------

# Tech Stack

  Technology    Purpose
  ------------- ---------------------------
  Node.js       Runtime environment
  Mocha         Test runner
  Chai          Assertion library
  Supertest     HTTP endpoint testing
  Mochawesome   HTML test reporting
  Dotenv        Environment configuration

------------------------------------------------------------------------

# Test Architecture

The project follows a simple but scalable API testing structure.

                    ┌────────────────────────┐
                    │   Paula Bank REST API  │
                    └───────────▲────────────┘
                                │ HTTP Requests
                                │
                        ┌───────┴────────┐
                        │    Supertest   │
                        │ Request Layer  │
                        └───────▲────────┘
                                │
                        ┌───────┴────────┐
                        │      Mocha     │
                        │   Test Runner  │
                        └───────▲────────┘
                                │
                        ┌───────┴────────┐
                        │      Chai      │
                        │   Assertions   │
                        └───────▲────────┘
                                │
                        ┌───────┴────────┐
                        │  Mochawesome   │
                        │ HTML Reports   │
                        └────────────────┘

------------------------------------------------------------------------

# Project Structure

    banco-api-test
    │
    ├── fixtures
    │   ├── postLogin.json
    │   └── postTransferencias.json
    │   
    ├── helpers
    │   └── autenticacao.js
    │
    ├──mochawesome-report    │   
    │   └── (auto-generated HTML reports and Json)
    │    
    ├── test
    │   ├── login.test.js
    │   └── transfers.test.js
    ├── .env
    ├── .gitignore
    ├── package.json    
    └── README.md

### Directory Description

  Directory            Purpose
  --------------       -----------------------------
  tests                Automated API test cases
  fixtures & helpers   Auxiliars to test execution
  mochawesome          Generated HTML test reports
  .env                 Environment variables
  package.json         Dependencies and scripts

------------------------------------------------------------------------

# Environment Configuration

Create a `.env` file in the root directory.

Example:

    BASE_URL=http://localhost:3000

Variable description:

  Variable   Description
  ---------- --------------------------------
  BASE_URL   Base URL of the API under test

Example when running locally:

    BASE_URL=http://localhost:3000

------------------------------------------------------------------------

# Installation

Clone the repository:

    git clone https://github.com/paulacristinaqa/banco-api-test.git

Enter the project:

    cd banco-api-test

Install dependencies:

    npm install

------------------------------------------------------------------------

# Running the Tests

Run all tests:

    npm test

or

    npx mocha

------------------------------------------------------------------------

# Test Reports

This project uses **Mochawesome** to generate professional HTML reports.

After running the tests, the report will be generated in:

    /mochawesome

Open:

    mochawesome.html

in your browser to visualize:

-   Passed tests
-   Failed tests
-   Stack traces
-   Execution time

------------------------------------------------------------------------

# Example API Test

Example of a test validating account creation.

Example request:

    POST /accountslogin
    Content-Type: application/json

    {
  "username": "julio.lima",
  "senha": "123456"
    }

Example response:
Status code 200

    {
    "token": "token jwt"
    }

Example automated test:

``` javascript
it('Teste 1-Deve retornar 200 com token em string ao usar credenciais válidas', async () => {
      const bodyLogin = postLogin
        const resposta = await request(process.env.BASE_URL)
          .post('/login')
          .set('Content-Type','application/json')
          .send(bodyLogin)
          console.log(resposta.status);
          console.log(resposta.body);
        expect(resposta.status).to.equal(200);   
        expect(resposta.body.token).to.be.a('string');    
```

------------------------------------------------------------------------

# Useful Documentation

Node.js\
https://nodejs.org

Mocha\
https://mochajs.org

Chai\
https://www.chaijs.com

Supertest\
https://github.com/visionmedia/supertest

Mochawesome\
https://github.com/adamgruber/mochawesome

dotenv\
https://github.com/motdotla/dotenv

------------------------------------------------------------------------

# Author

Paula Cristina

QA Engineer \| Backend Test Automation \| API Testing

GitHub\
https://github.com/paulacristinaqa

------------------------------------------------------------------------

# License

MIT License
