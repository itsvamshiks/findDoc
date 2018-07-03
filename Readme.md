# [FindDoc - A web application to search and locate physicians]

## Aim:
To build a web application using Node.js and MongoDB, to search for physicians listed in the CMS dataset using their names.

Then show the location of the physician on the Map
For more details [refer here](https://www.csee.umbc.edu/~kalpakis/Courses/621-sp18/project/prj3.php)

## Prerequisites:
- Node.js
- Express.js
- NPM:
     Mongoose package
     MongoDB package
     Axios package

##Tools Used
-Front-End - EJS, CSS, Bootstrap
-Middleware - Node.js,Express.js
-Backend - MongoDB instance in mLab (Cloud platform for MongoDB)
-Version Control - Bitbucket

## How to execute:
- Run the Application.js file
- In the browser, go to http://localhost:8080/findPhysicians


## Implemention summary:
1. `db_config.js`: Defines all the variables required to connect to the MongoDB instance in mLab
2. `application.js`: Main file containing all the configurations. Renders the Front.ejs view on call.
3. `Front.ejs`: The view file for the Front page of the application. Collects details of the physician for a lookup
4. `search_request.js`: The router file which receives the data of the physician to lookup, from the user. Performs a search operation in the database and returns the appropriate physicians and their details
5. `results.ejs`: Rendered after the search_request.js retrieves the data of the physicians. Shows the details to the user.
6. `map_physician.js`: Gets the ID of the exact physician to locate on the map. Renders the Map.ejs view file. Geocodes the address of the physician and sends the coordinates to the view
7. `map.ejs`: Marks the location of the physician on a map frame. Waze iFrame Map API is used.



### Contributors:
- Vamshi Krishna Sai Nagabandi _(nvamshi1@umbc.edu)_
