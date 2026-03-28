const CountryService = require("../repositories/country.repository.js");

class CountryController {
  async loadCountries(req, res) {
    const loadCountries = await CountryService.loadCountries();
    if (!loadCountries) {
      res.status(500).json({
        message: "Failed load countries",
      });
    }
    res.status(200).json(loadCountries);
  }

  async setCountry(req, res) {
    const user_id = req.user.id;
    const { country_id } = req.body;
    const setCountry = await CountryService.setCountry(user_id, country_id);
    if (!setCountry) {
      res.status(500).json({
        message: "Failed a set country,try again",
      });
    }
    res.status(200).json({
      message: "Country was updated successfully",
      country: setCountry.country,
    });
  }
}

module.exports = new CountryController();
