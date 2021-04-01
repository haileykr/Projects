# Cities And Buildings
Web Application for Architects, Engineers, and All Other Building-Fanatics.

[citiesandbuildings.herokuapp.com](https://citiesandbuildings.herokuapp.com)

![home](../imgs/CAB_image.png)

## Functionalities
1. Explore Buildings around the World
- Check out brief information on the buildings of your interest
- Add fun facts to buildings!

2. Register As a User to Add More
- Once registered, you can add more buildings and edit / delete them

3. Filter Buildings per Various Criteria
- Filter by building name, *(to be completed from here)*height, architect, and engineer.

## Tech Stack
![tech_stack](../imgs/CAB_tech_stack.png)

#### Frontend
- Built on HTML, CSS, and JavaScript
- Bootstrap was used as a CSS framework to apply further styling and responsiveness to the app.

#### Backend
- Implemented RESTful Routes
- Express web framework was used to set up a server
- Express on Node.js was chosen to use JavaScript only for both frontend and backend sides
- MongoDB was used as a database based on
  * its well-known compatibility with Node and Express (ex. MERN / MEAN Stack, except that this project did not use neither R(React) or A(Angular))
  * intention to practice the use of NoSQL database.
- Miscellaneous Settings
  * _EJS_ as a templating language, as it uses JS syntax
  * _Axios_ to handle HTTP requests based on promises
  * _express-session_ to introduce sessions
  * _passport_ to easily manage authentication (w/ hashed password) and authorization
  * _Mongoose_ and _JOI_ to manage schema of and add validation to data
  * _express-mongo-sanitize_ to prevent Mongo Injection on top of Express-built-in and custom middlewares / classes
  * _sanitize-html_ to prevent XSS along with JOI
  * _helmet_ to strengthen security of the web, by setting several headers to prevent well-known security attacks
  * _flash_ to display alert messages
  * _cloudinary_ to successfully store images and further modify them
  * _multer_ to parse multipart form for file uploads
  * _mapbox_ to show maps with geocoded locations of buildings

#### Deployment
- App deployed on _heroku_
- Heroku was chosen for a relatively easy upload, considering it provides PaaS (Platform as a Service) and handles infrastructure operations. 
