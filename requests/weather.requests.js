const rp = require("request-promise");

module.exports = async function(city = "") {
  if (!city) {
    throw new Error("Имя города не может быть пустым");
  }

  const KEY = "c645c279aefc1be9f1dec36b248cb56c";
  const uri = "http://api.openweathermap.org/data/2.5/weather";

  const options = {
    uri,
    qs: {
      appid: KEY,
      q: city,
      units: "imperial"
    },
    json: true
  };

  try {
    const data = await rp(options);
    const celsius = Math.round(((data.main.temp - 32) * 5) / 9);

    return {
      weather: `${data.name}: ${celsius}`,
      error: null
    };
  } catch (error) {
    return {
      weather: null,
      error: error.error.message
    };
  }
};
