var Sequelize = require("sequelize");
var db = require("../configs/db.js");

const Restaurant = db.define("restaurant_details", {
  restaurant_name: {
    type: Sequelize.STRING
  },
  cusines: {
    type: Sequelize.TEXT                        
  },
  avg_cost_for_two: {
    type: Sequelize.STRING
  },
  currency: {
    type: Sequelize.STRING
  },
  has_booking: {
    type: Sequelize.STRING
  },
  has_delivery: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.FLOAT(10, 1)
  },
  rating_color: {
    type: Sequelize.STRING
  },
  votes_txt: {
    type: Sequelize.STRING
  },
  votes: {
    type: Sequelize.STRING
  }
});

module.exports = Restaurant;

