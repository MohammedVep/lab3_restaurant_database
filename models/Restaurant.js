const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please specify Restaurant Name"],
        trim: true,
        lowercase: true
    },
    cuisine: {
        type: String,
        required: [true, 'Please specify cuisine of restaurant'],
        trim: true,
        lowercase: true
    },
    city: {
        type: String,
        required: [true, 'Please specify  city'],
        trim: true,
        lowercase: true
    },
    restaurant_id:{
        type: String,
        required: true,
        trim: true
    },
    address: [{
        building: String,
        street:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        zipcode: String
    }]
});

RestaurantSchema.pre('save', (next) => {
    console.log("Starting to save")
    let now = Date.now();
    this.updateDate = now;
    if(!this.created) {
        this.created = now
    }
    next()
});

RestaurantSchema.pre('findOneAndUpdate', (next) => {
    console.log("Starting findOneAndUpdate")
    let now = Date.now()
    this.updatedat = now;
    console.log(this.updatedat)
    next()
});

RestaurantSchema.post('init', (doc) => {
    console.log('%s has been initalized from the db', doc._id);
});

RestaurantSchema.post('validate', (doc) => {
    console.log('%s has been validated (but not saved yet)', doc._id);
  });
  
  RestaurantSchema.post('save', (doc) => {
    console.log('%s has been saved', doc._id);
  });
  
  RestaurantSchema.post('remove', (doc) => {
    console.log('%s has been removed', doc._id);
  });
  
  const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
  module.exports = Restaurant;