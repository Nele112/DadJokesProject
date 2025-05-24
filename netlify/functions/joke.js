const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const response = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
    headers: {
      "X-Api-Key": process.env.API_NINJAS_KEY
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
  
};
