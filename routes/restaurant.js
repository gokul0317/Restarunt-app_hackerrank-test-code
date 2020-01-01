const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../configs/db");
const sortableFields = {
  votes: "votes",
  rating: "rating",
  avg_cost_for_two: " avg_cost_for_two"
};
const order = {
  high: "DESC",
  low: "ASC"
};

//List All Restaurants
router.get("/", async (req, res) => {
  try {
    let data = await Restaurant.findAll();
    res.status(200).json([{ data }, { type: "success" }]);
  } catch (err) {
    res.status(400).json([{ data: err }, { type: "error" }]);
  }
});

//List Restaurants By Id
router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let data = await Restaurant.findOne({
      where: {
        id: id
      }
    });
    res.status(200).json([{ data }, { type: "success" }]);
  } catch (err) {
    res.status(400).json([{ data: err }, { type: "error" }]);
  }
});

//Search by Restaurant name
router.get("/search/:text", async (req, res) => {
  let searchText = req.params.text;
  try {
    let data = await Restaurant.findAll({
      where: {
        restaurant_name: {
          [Op.like]: "%" + searchText + "%"
        }
      }
    });
    res.status(200).json([{ data }, { type: "success" }]);
  } catch (err) {
    res.status(400).json([{ data: err }, { type: "error" }]);
  }
});

//filer by

router.get("/filter/:query", async (req, res) => {
  let filers = req.params.query.split("&");
  let query = "SELECT * FROM `restaurant_details` WHERE ";
  filers.map((item, i) => {
    let or = "";
    if (i < filers.length - 1) {
      or = "or";
    }
    query += " `cusines` like '%" + item + "%' " + or + " ";
  });
  try {
    let data = await db.query(query);
    res.status(200).json([{ data }, { type: "success" }]);
  } catch (e) {
    res.status(400).json([{ data: err }, { type: "error" }]);
  }
});

//sort data

router.get("/sorting/:param/:type", async (req, res) => {
  let { param, type } = req.params;
  if (!sortableFields[param] || !order[type]) {
    return res.json({ data: "Invalid sort criterias", type: "error" });
  }
  try {
    let data = await Restaurant.findAll({
      order: [[sortableFields[param], order[type]]]
    });
    res.status(200).json([{ data }, { type: "success" }]);
  } catch (err) {
    res.status(400).json([{ data: err }, { type: "error" }]);
  }
});

//Get All Cusines

router.get("/categories", async (req, res) => {
  try {
    let data = await Restaurant.findAll({
      attributes: ["cusines"],
      raw: true
    });
    let filterdArray = [];
    data.map(item => {
      let dataItem = item.cusines.split(",");
      for (var dataList of dataItem) {
        let trimmed_data = dataList.trim();
        if (filterdArray.indexOf(trimmed_data) == -1) {
          filterdArray.push(trimmed_data);
        }
      }
    });
    res.status(200).json([{ data: filterdArray }, { type: "success" }]);
  } catch (err) {
    res.status(400).json([{ data: err }, { type: "error" }]);
  }
});

module.exports = router;
