2021.2.22

- connecting to mongo database
- seeds/index.js
~> "accessing non-existent MongoError with circular dependency" error
~> version error.
~> npm install mongoose@5.11.15 to the latest version
~> fixed the error
~> https://stackoverflow.com/questions/66185671/warning-accessing-non-existent-property-mongoerror-of-module-exports-inside-c

- show.ejs
~> added quotes carousels


- using mapbox-sdk, enabled forward geocoding
(github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#fowardgeocode)

- introduced session
- the module 'connect-mongo'
~> V3 -> V4
~> migration guide: https://github.com/jdesboeufs/connect-mongo/blob/HEAD/MIGRATION_V4.md

- new.ejs
~> and post form

2021.2.23
- connected to cloudinary (file storage)

- edit form (U)
- virtual property for a thumbnail image
- req.body keeps being undefined
~> checked body-parser/JSON-parser
~> https://stackoverflow.com/questions/50569718/node-js-express-req-body-undefined
~> SOLVED!
: was because multer (multipart-form-data parsing module) was not called anywhere
: previous code - app.use('.../edit', buildingController.updateBuilding);
: updated code - app.use('.../edit', upload.array('image', buildingController.updateBuilding));, whereas upload is a part of multer
:https://github.com/expressjs/method-override/issues/13


- delete (D)

- split routes with express.Router()
~> TypeError: router.use() needs a middleware but got an object instead
~> SOLVED! forgot module.exports=router
: stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-but-got-a-object

- cluster map with virtual property - popUpMarkup

02/26
- error-handling
: schemas.js => to prevent client-side errors
    ~> Joi (validation tool)
    ~> sanitize HTML (the process of examining an HTML document and producing a new HTML document that preserves only whatever tags are designated "safe" and desired. used against cross-site scripting (XSS) by sanitizing any HTML code submitted by a usr)

: utils
    ~> catchAsync
    => codes called as fn by Express, which returns another function, which will run those codes and catch error if there is
    => to catch errors from async functions. applied to any async fn's.

    ~> ExpressError
    => catch errors before reaching database

: passport
=> Simple, unobtrusive authentication for Node.js
=> used passport,
        passport-local (for simple id & pw login),
=> passport.initialize() middleware for Express-based app
=> passport.session() fo persistent login sessions

=> serializeUser / deserializeUser to use sessions

: mongoSanitize
=> to prevent Mongo Injection!

: helmet
=. helps secure Express app by setting various HTTP headers

- added User
: model
: controller
: views
: route

- added Fact
: model
: controller
: view- buildings/show에 추가
: route

- added Middlewares in middleware.js!
: isLoggedIn (if (req.isAuthenticated() - of passport))
: validateBuilding(buildingSchema.validate(req.body))
: isAuthor (if (buliding.author.equals(req.user._id)))
: isFactAuthor (if (fact.author.equals(req.user._id)))
: validateFact (if (factSchema.validate(req.body)))

- Error
: "Refused to apply style from 'http://localhost:3000/public/stylesheets/app.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled"
=> path was wrong  (https://stackoverflow.com/questions/48248832/stylesheet-not-loaded-because-of-mime-type)

: "Error: failed to lookup view "error" in views directory"
=> order of codes was wrong

: error - <%- %> tag automatically ruined when "autoformatting": look into it!

- added FactSchema and modified .populate details!

- editing "fun facts" part~> made it into a separate page!

02/27
- index page => masonry layout applied
~> overflow happend but FIXED!
(https://stackoverflow.com/questions/41668228/css-column-count-overflow-issue-in-chrome)

~> combined pure css + bootstrap as implementing masonry layout in bootstrap is unstable



