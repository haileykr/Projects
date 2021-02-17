// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').config();
// }
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash')
const methodOverride = require('method-override');

const { v4: uuid } = require('uuid'); //For generating ID's

//To parse form data in POST req.body:
app.use(express.urlencoded({extended:true}));
//To parse incoming JSON in POST req.body:
app.use(express.json());
//To 'fake' PUT/PATCH/DELETE requests:
app.use(methodOverride('_method'));
//Views folder and EJS Setup:

app.engine('ejs',ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let buildings = [
    {
        id: 0,
        title: 'Chrysler Building',
        geometry: {
            type: 'Point',
            coordinates: [-73.975502,40.751621]
        },
        images: [{
            url: "https://static.dezeen.com/uploads/2019/01/chrysler-building-for-sale-news-architecture-new-york-city-dezeen-2364-shutterstock-65007532-sq.jpg",

        }],

        year: 1930,
        height: 1046,
        architect: 'William Van Alen',
        engineer: 'Ralph Squire & Sons',
        description: 'art-deco style building',
        location: 'New York, NY, USA'
    },
    {
        id: 1,
        title: 'Empire State Building',
        geometry: {
            coordinates: [-73.983221,40.763211]
        },

        year: 1931,
        height: 1454,
        architect: 'Shreve, Lamb and Harmon',
        engineer: 'Homer Gage Balcom',
        description: 'iconic',
        location: 'New York, NY, USA'
    },
    {
        id: 2,
        title: 'fake',
        geometry: {
            coordinates: [-73.983221,40.763211]
        },

        year: 1931,
        height: 1454,
        architect: 'Shreve, Lamb and Harmon',
        engineer: 'Homer Gage Balcom',
        description: 'iconic',
        location: 'New York, NY, USA'
    },
    {
        id: 3,
        title: 'another!',
        geometry: {
            coordinates: [-73.983221,40.763211]
        },

        year: 1931,
        height: 1454,
        architect: 'Shreve, Lamb and Harmon',
        engineer: 'Homer Gage Balcom',
        description: 'iconic',
        location: 'New York, NY, USA'
    }
]

app.get('/buildings', (req, res) => {
    console.log(buildings[0])
    res.render('buildings/index', {buildings});
});

app.get('/buildings/:id',(req,res)=>{
    const {id} = req.params;
    console.log(buildings[id])
    res.render('buildings/show', {building:buildings[id]})
})

app.listen(3000, ()=> {
    console.log(`Serving on port 3000!`);
});