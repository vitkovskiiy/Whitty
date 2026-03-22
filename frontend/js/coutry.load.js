const countrySelect = document.getElementById("countrySelect");
const saveCountryBtn = document.getElementById("saveCountryBtn");
const currentCountryDisplay = document.getElementById("current-country-display");

async function initCountrySettings() {
  try {
    const res = await fetch("/api/countries");
    const countries = await res.json();
    countrySelect.innerHTML = '<option value="">-- Select Country --</option>';

    countries.forEach((c) => {
      const option = document.createElement("option");
      option.value = c.country_id;
      option.textContent = c.country_name;
      countrySelect.appendChild(option);
    });

    const userRes = await fetch("/auth/me");
    if (userRes.ok) {
      const user = await userRes.json();

      if (user.country) {
        currentCountryDisplay.textContent = user.country.country_name;
        countrySelect.value = user.country.country_id;
      } else {
        currentCountryDisplay.textContent = "Not set";
      }
    }
  } catch (err) {
    console.error("Error loading country data:", err);
  }
}

saveCountryBtn.addEventListener("click", async () => {
  const selectedId = countrySelect.value;

  if (!selectedId) return alert("Please select a country!");

  try {
    const res = await fetch("/api/update-country", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country_id: selectedId }),
    });

    if (res.ok) {
      const data = await res.json();
      currentCountryDisplay.textContent = data.user.country.country_name;
      alert("✅ Country updated successfully!");
    } else {
      alert("❌ Error updating country");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
});




initCountrySettings();
