const CountryRepository = require("../repositories/country.repository.js");

class CountryService {
  async loadCountries() {
    const loadCountries = await CountryRepository.loadCountries();
    if (!loadCountries) {
      throw new Error("Fetching countries are failed");
    }
    return loadCountries;
  }

  async setCountry(user_id, country_id) {
    const setCountry = await CountryRepository.setCountry(user_id, country_id);
    if (!setCountry) {
      throw new Error("Setting country are failed");
    }
    return setCountry;
  }
}

module.exports = new CountryService();