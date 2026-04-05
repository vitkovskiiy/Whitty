const { DomainError } = require("../../domain/error");
const CountryRepository = require("../../infrastructure/repositories/country.repository");

class CountryService {
  async loadCountries() {
    const loadCountries = await CountryRepository.loadCountries();
    if (!loadCountries) {
      throw new DomainError("Fetching countries are failed");
    }
    return loadCountries;
  }

  async setCountry(user_id, country_id) {
    const setCountry = await CountryRepository.setCountry(user_id, country_id);
    if (!setCountry) {
      throw new DomainError("Setting country are failed");
    }
    return setCountry;
  }
}

module.exports = new CountryService();