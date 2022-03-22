# HouseLooK API    
HouseLook API is a RESTful API tool that allows developers and other interested users to interact and create mock data about houses.    
This is the first segment of my portfolio project which will eventually aid in searching and renting houses in different places. 

## Prerequisites    
Please ensure the following requirements before you proceed:    
* You have Ubuntu 20.04 installed in your machine
* You have node.js installed
* You have npm manager

## Environment
The project was interpreted/tested on Ubuntu 20.04 LTS using node.js (version 14.19.0)    

## Installation    
* Clone this repository: `git clone "https://github.com/aloicerains/HouseLook_API"`
* Access the HouseLook_API directory: `cd HouseLook_API`
* Run npm to install dependencies: `npm install`
* Create `MySQL` database user with limited privileges
* Run the db_setup.sql: `cat db_setup.sql | sudo mysql`  
* Populate the database with your preferred data or use mock data in `populate_data.sql`: `cat populate_data.sql | sudo mysql`  
* Run the node server: `node server.js`
* Open your browser (firefox, chrome) and enter: `http://localhost:8080/api/v1/places`   
You can also open another terminal and `curl http://localhost:8080/api/v1/places'
