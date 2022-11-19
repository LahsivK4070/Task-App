const express = require("express");
const { body, validationResult } = require('express-validator');
const User = require("../models/Users");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const dotenv = require("dotenv");

router.use(bodyParser.json({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const JWT_SECRET = process.env.TOKKEN_SECRET;

// Create a new user
router.post("/createuser", [
    body('name', 'Name must be atleast 3 characters long').isLength({ min: 3 }),
    body('email', 'Enter a valid for email').isEmail(),
    body('password', 'Password must be 8 characters long').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    try {
        
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, message: "User already exist" });
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

// Authenticate an existing user
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({success, message: "Wrong Credentials" });
        }
        
        const passwordMatch = await  bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({success, message: "Wrong Credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Get user data
router.post("/getuser", fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;