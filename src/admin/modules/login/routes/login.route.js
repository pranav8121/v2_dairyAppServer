'use strict';
let router = require('express').Router();
const jwt = require("jsonwebtoken");

let loginService = new (require("../service/member.service"))();
const responseHandler= require('../../../../../response-handler/response-handler');

router.post('/authenticate', responseHandler(loginService.authenticate));

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "test" && password === "test@123") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.json({ message: "Login successful", token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});
module.exports = router;