const { ErrorReply } = require("redis");
const CountryService = require("../../application/services/country.service");
const { DomainError, NotFoundError } = require("../../domain/error");
const OutputUserDTO = require("../dto/response/outputUserDTO");
class CountryController {
  async loadCountries(req, res) {
    try {
      const loadCountries = await CountryService.loadCountries();

      res.status(200).json(loadCountries);
    } catch (error) {
      if (error instanceof DomainError) {
        return res.status(400).json({ message: error.message });
      }
      if (error instanceof NotFoundError) {
        return res.status(404).json({ message: error.message });
      }
    }
  }

  async setCountry(req, res) {
    const user_id = req.user.id;
    const { country_id } = req.body;
    const setCountry = await CountryService.setCountry(user_id, country_id);
    if (!setCountry) {
      return res.status(500).json({
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
