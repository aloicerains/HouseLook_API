# HouseLooK API    
HouseLook API is a RESTful API tool that allows developers and other interested users to interact and create mock data about houses.    
This is the first segment of my portfolio project which will eventually aid in searching and renting houses in different places. 

## Table of Contents
* [Prerequisites](#prere)
* [Environment](#env)
* [Installation](#install)
* [File Description](#fd)
* [app](#app)
* [Examples of use](#examples)
* [Bugs](#bugs)
* [Authors](#auth)
* [License](#license)

<a name="prere"></a>
## Prerequisites    
Please ensure the following requirements before you proceed:    
* You have Ubuntu 20.04 installed in your machine
* You have node.js installed
* You have npm manager

<a name="env"></a>
## Environment
The project was interpreted/tested on Ubuntu 20.04 LTS using node.js (version 14.19.0)    

<a name="install"></a>
## Installation    
* Clone this repository: `git clone "https://github.com/aloicerains/HouseLook_API"`
* Access the HouseLook_API directory: `cd HouseLook_API`
* Run npm to install dependencies: `npm install`
* Create `MySQL` database user with limited privileges
* Run the db_setup.sql: `cat db_setup.sql | sudo mysql`  
* Populate the database with your preferred data or use mock data in `populate_data.sql`: `cat populate_data.sql | sudo mysql`  
* Run the node server: `node server.js`
* Open your browser (firefox, chrome) and enter: `http://localhost:8080/api/v1/places`   
You can also open another terminal and `curl "http://localhost:8080/api/v1/places"`   

<a name="fd"></a>
## File Descriptions
[server.js](https://github.com/aloicerains/HouseLook_API/blob/master/server.js) - the server contains the entry point to the API. Some of the functionalities of the server inlcude:   
* `app` : the `express` server application
* `routes`: the routing paths for various application endpoints
* `port`: The listening port for the application
* `ejs`: the view engine for html files

<a name="app"></a>
### app
[**app/ directory**](https://github.com/aloicerains/HouseLook_API/tree/master/app) - the directory contains all the directories for running the application including configuration and route directories. The files and directories include:  
[config/](https://github.com/aloicerains/HouseLook_API/tree/master/app/config):
The `config/` directory contains the configuration file for the node application. The configuration file contains information about the host, user, password, and the database used to connect the server app to mysql databse.
[controllers/](https://github.com/aloicerains/HouseLook_API/tree/master/app/controllers)    
The controllers directory provides a range of functions for interacting and controlling the user requests and ensure the right response formats. Some of the functions in this section include:
* `browser (req, result)`: For formating the response object based on the `user-agent`
* `create (req, res)`: For creating new objects such as `places, houses, rooms, users,` and `owners`
* `findAll (req, res)`: Function retrieves all the objects types requested
* `findOne (req, res)`: Function retrieves a single object of particular `id`
* `update (req, res)`: Funtion updates a particular object of given `id`
* `delete (req, res)`: Function deletes a particulr object of given `id`
* `getAllVacant(req, res)`: Function retrieves all vacant rooms
* `getAllSingles (req, res)`: Function retrieves a single rooms
* `getAllSitters (req, res)`: Function retrieves all bedsitter rooms
* `getAllOnebeds (req, res)`: Function retrieves all one bedrooms 
* `getAllTwobeds (req, res)`: Function retrieves all two bedrooms    
Each object has got a list of controller functions for handling user request and responses in the controllers files.

[models/](https://github.com/aloicerains/HouseLook_API/tree/master/app/models)     
The `models` folder provides the functions for interacting with the database and the user requests. Each user request is handled by the model files. Some of the functions in the model folder include:
* `connection`: Function established connection to mysql database
* `create (newPlace, result)`: Function creates an object such as  `newPlace` object within the database.   
`newPlace` must contains all the parameters needed to create the new object.
* `findById (id, result)`: Function queries the database for an object of given `id`
* `findAll ()`: Function queries the database for all objects of a given type e.g `rooms` or `houses`
* `updateById (id, name, result)`: Function updates an existing object with new set of data
* `remove (id, result)`: Function deletes a given object from the database
* `findAllSingles ()`: Function queries and returns single rooms from the database
* `findAllSitters ()`: Function queries and returns bedsitter rooms in the database
* `findAllOnebeds ()`: Function queries and returns all one bedrooms in the database
* `findAllTwobeds ()`: Function queries and returns all two bedrooms in the database
Each object has got a list of model functions for quering the database and obtaining responses    

[static/](https://github.com/aloicerains/HouseLook_API/tree/master/static)    
The `static` folder contains the static files for the application. These include the `images` and the `syles` folders where images and css styles are stored.    
`home.html`, and `index.html` are landing and API guide pages

[views/pages/](https://github.com/aloicerains/HouseLook_API/tree/master/views/pages)    
The `views/pages/` folder provide the ejs file definition for formating the browser API responses    

[routes/](https://github.com/aloicerains/HouseLook_API/tree/master/app/routes)    
The `routes` folder defines the API methods and the corresponding route middleware to use. The methods include:   
* `get`: Retrieving objects
* `post`: Creating objects
* `put`: Updating objects
* `delete`: Deletes an object  
**Router Middleware definitions**   
* `router.post('/object', object.create)`: Routes all post requests to `create` middleware
* `router.get('/object', object.findAll)`: Routes all get requests to `findAll` middleware
* `router.put('/object/id', object.update)`: Routes all put requests to `update` middleware
* `router.delete('/object/id', object.delete)`: Routes all delete request to `delete` middleware

<a name="examples"></a>
## Examples of use
* Terminal: `curl "http://localhost:8080/api/v1/places"` retrieves a list of places in the database
* Browser: `"http://localhost:8080/api/v1/places"` retrieves a list of places in the database
* `curl "http://localhost:8080/api/v1/rooms"` retrieves a list of rooms in the database
* `curl "http://localhost:8080/api/v1/rooms/1"` retrieves room 1 from the database
* `curl "http://localhost:8080/apiv/v1/owners"` retrieves a list of owners from the database    
The [API guideline](https://web-02.onezacchaeus.tech/api/v1/) proivides futher information on API usage examples

<a name="bugs"></a>
## Bugs
Incorrect JSON syntax during `put` or `post` request result to errors as the ouput.  
The entire object variables must be updated during the `put` requests.    
Wrong foreign key input during `put` or `post` request has not been handled

<a name="auth"></a>
## Authors
Aloice Okoth: aloiceokoth98@gmail.com/zacchaeusokoth4@gmail.com

<a name="license"></a>
## License
Public Domain
