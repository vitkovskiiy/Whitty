const prisma = require("../config/prisma.database");

class CountryRepository {
  async loadCountries() {
    const loadCountries = await prisma.country.findMany({
      orderBy: { country_name: "asc" },
    });
    return loadCountries;
  }

  async setCountry(user_id, country_id) {
    const setCountry = await prisma.user.update({
      where: {
        user_id: user_id,
      },
      data: {
        country_id: Number(country_id),
      },
      select: {
        username: true,
        user_id: true,
        country: true,
      },
    });
    return setCountry;
  }
}

module.exports = new CountryRepository();
