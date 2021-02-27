const mongoose = require('mongoose');
const Building = require('../models/building.js');

const dbUrl = "mongodb://localhost:27017/citiesandbuildings"
// const dbUrl = "mongodb+srv://our-first-user:eifImy7VrSVnBER9@cluster0.olnwy.mongodb.net/yelp-camp?retryWrites=true&w=majority"

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Building.deleteMany({});//delete everything
    for (let i = 0; i < 10; i++) {
        const building = new Building({
            //mongo atlas
            name: 'Chrysler Building',
            author:'6038fb8d6da546387cc42688',
            geometry: {
                type: 'Point',
                coordinates: [-73.975502, 40.751621]
            },
            images: [{
                url: 'https://static.dezeen.com/uploads/2019/01/chrysler-building-for-sale-news-architecture-new-york-city-dezeen-2364-shutterstock-65007532-sq.jpg',
            }],

            year: 1930,
            height: 1046,
            architect: 'William Van Alen',
            engineer: 'Ralph Squire & Sons',
            description: 'art-deco style building',
            location: 'New York, NY, USA'
        })
        await building.save();
    }
}

seedDB().then(() => {
    //seedDB() returns promise because it's an async function
    mongoose.connection.close()
})