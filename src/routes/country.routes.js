const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware.js");
const CountryController = require("../controllers/country.controller.js");

router.get("/countries", requireAuth, CountryController.loadCountries)

router.post("/update-country", requireAuth, CountryController.setCountry)

module.exports = router;
