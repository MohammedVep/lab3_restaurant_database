const express = require("express");
const restaurantModel = require("../models/Restaurant");
const app = express();

// http://localhost:3000/restaurant
app.post("/restaurant", async (req, res) => {
    const restaurant = new restaurantModel(req.body);
    try {
        await restaurant.save((err) => {
            if (err) {
                res.send(err);
            } else {
                res.send(restaurant);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

// http://localhost:3000/restaurant
app.get("/restaurant", async (req, res) => {
    const restaurants = await restaurantModel.find({});
    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

// http://localhost:3000/restaurants/cuisine/Japanese
// http://localhost:3000/restaurants/cuisine/Bakery
// http://localhost:3000/restaurants/cuisine/Italian
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
    const restaurants = await restaurantModel.find({ cuisine: req.params.cuisine });
    try {
        if (restaurants.length != 0) {
            res.send(restaurants);
        } else {
            res.send(
                JSON.stringify({ status: false, message: "No data found" })
            );
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
app.get("/restaurants", async (req, res) => {
    sortBy = req.query.sortBy.toLowerCase();
    if (sortBy != "asc" && sortBy != "desc") {
        res.send(JSON.stringify({ status: false, message: "No data found" }));
    } else {
        const restaurants = await restaurantModel
            .find({})
            .select("_id cuisine name city restaurant_id")
            .sort({ restaurant_id: sortBy });
        try {
            res.send(restaurants);
        } catch (err) {
            res.status(500).send(err);
        }
    }
});

// http://localhost:3000/restaurants/Delicatessen
app.get("/restaurants/:cuisine", async (req, res) => {
    const cuisine = req.params.cuisine;
    const city = "Brooklyn";
    const restaurants = await restaurantModel
        .find({ cuisine: cuisine })
        .where("city")
        .ne(city)
        .select("cuisine name city")
        .sort({ name: "asc" });
    try {
        res.send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = app;