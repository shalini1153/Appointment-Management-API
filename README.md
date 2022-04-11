# Appointment-Management-API
![til](./Screen_login.gif)

## Table of Contents

* [ About ](#About)
* [ System Architecture](#System Architecture)
* [ Development server](#Development-server) 
* [ Build](#Build)
* 
# About
This application is created for managing appointments in hospitals, it can further be used in all the different kind of applications where we need to schedule meetings between two users and gather feedback.Our main focus is to collaborate doctors and patients across the region on one platform and patients can get online consulation using our platform. Currently we have developed API's to add, edit, get and delete patients and doctors in the platform.

# Note
This platform can be used as an POC and others features can be developed later on based on the use case.This platform will be developed using agile methodology and can be further divided into stages.The current version is more focused on backend API's using Nodejs with CRUD operations for patients, doctors and platform users. 

We have also used <b>api.1up.health</b> external api to get the list of hospitals and doctors.Security mechanisms are implemented in the project by using salt and hash based authenticatin. We have also implemented session management for the user.Currently the backend service is deployed on Cloud using docker and kubernetes. Also you can access the backend locally using the guide mention below.

## System Architecture

![alt text](./Architecture-Diagram.png)



