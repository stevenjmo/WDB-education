const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const { model } = require("mongoose");

const auth = require("../middleware/auth");

// list
router.get("/list", auth, async (req, res) => {
    try {
        // todo
        const user = await User.findById(req.user.id);
        res.json(user.shoppinglist);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

// add
router.post("/add", auth, async (req, res) => {
    try {
        // todo
        const user = await User.findById(req.user.id);
        const shopList = user.shoppinglist;

        shopList.push(req.body["item"]);

        await user.save();
        
        res.json(shopList);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

// delete
router.delete("/delete", auth, async (req, res) => {
    try {
        // todo
        const user = await User.findById(req.user.id);
        const shopList = user.shoppinglist;

        const index = shopList.indexOf(req.body["item"]);
        if (index > -1) {
            shopList.splice(index, 1);
        }

        await user.save();
        
        res.json(shopList);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

module.exports = router;