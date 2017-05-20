# Typescript - InversifyJS - Express Application

A template for building applications using TypeScript & Express
This is built on

* NodeJs (v7)
* TypeScript
* Knex
* Gulp

## app-core

This module contains interfaces shared across all modules within the application...

## app-data-contracts

This module contains the data contracts a.k.a DTO's and IRepository Interfaces
* models (data transfer objects)
* repository interfaces


## app-data

This module contains the implementation for data contracts in [app-data-contracts]


## app-logic

This module would contain any business rules and logic that acts on the data pre-CRUD operations


## app-api

This module hosts the API Server written in express 4, you could swap this out using HAPI or any other NODE JS Servers


## app-ng-ui

This module hosts the application user interface, currently written in angular

* angular 4

