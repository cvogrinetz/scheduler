# Interview Scheduler

This scheduler allows students to book and manage an interview with a mentor. Appointments can be made between noon and 4pm for each day of the week.

## Technical Specifications:

- React
- Webpack, Babel
- Axios
- Storybook, Webpack Dev Server, Cypress, Jest, Testing Library

It is a SPA that makes data persist by the API server using a PostgreSQL database

The Scheduler client application was created using Create React App. Express is the basis for the Scheduler API server application.

The client application communicates with an API server over HTTP, using the JSON format.

## Screenshots

!["Screenshot of desktop sized screen"](https://github.com/cvogrinetz/scheduler/blob/master/public/images/filledForm.png)
!["Screenshot of desktop sized screen"](https://github.com/cvogrinetz/scheduler/blob/master/public/images/BasicShowPage.png)
!["Screenshot of desktop sized screen"](https://github.com/cvogrinetz/scheduler/blob/master/public/images/confirmDelete.png)
!["Screenshot of desktop sized screen"](https://github.com/cvogrinetz/scheduler/blob/master/public/images/emptyForm.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
