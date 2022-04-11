# Appointment-Management-API
<p align="center">
  <img src="Screen_login.gif" height="400" />
</p>

This project is developed as a part of coursework for Cloud Computing taught by [Dr. Sukhpal Singh Gill]. We have developed REST API and have deployed our application on cloud using docker and kubernetes

## Table of Contents
- [About](#about)
- [System Architecture](#system-architecture)
- [Backend](#backend)
  - [CRUD Operations](#crud-operations)
  - [Cloud App](#cloud-app)
    - [Google Cloud](#google-cloud)
  - [Running Locally](#running-locally)
    - [Local Node.js Installation](#local-node-installation)
    - [NVM](#nvm)
    - [Docker Container](#docker-container)
 - [Front-end](#front-end)
 - [Conclusion](#conclusion)
# About
This application is created for managing appointments in hospitals, it can further be used in all the different kind of applications where we need to schedule meetings between two users and gather feedback.Our main focus is to collaborate doctors and patients across the region on one platform and patients can get online consulation using our platform. Currently we have developed API's to add, edit, get and delete patients and doctors in the platform.

# Note
This platform can be used as an POC and others features can be developed later on based on the use case.This platform will be developed using agile methodology and can be further divided into stages.The current version is more focused on backend API's using Nodejs with CRUD operations for patients, doctors and platform users. 

We have also used <b>api.1up.health</b> external api to get the list of hospitals and doctors.Security mechanisms are implemented in the project by using salt and hash based authenticatin. We have also implemented session management for the user.Currently the backend service is deployed on Cloud using docker and kubernetes. Also you can access the backend locally using the guide mention below.

## System Architecture

<p align="center">
  <img src="Architecture-Diagram.png" height="400" />
</p>


## Backend

