import fetch from "node-fetch";

export const handler = async (event, context) => {
  const response = await fetch("https://api.api-ninjas.com/v1/dadjokes", {
    headers: {
      "X-Api-Key": "8yMYaeC9Y/TMy/dqCpRTVw==tyjnddWgC92fnx4V"
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
