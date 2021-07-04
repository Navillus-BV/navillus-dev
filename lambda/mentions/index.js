const fetch = require("node-fetch");

const API_ORIGIN = "https://webmention.io/api/mentions.jf2";

async function getMentions() {
  const domain = "navillus.dev";
  const token = process.env.WEBMENTION_IO_TOKEN;
  const url = `${API_ORIGIN}?domain=${domain}&token=${token}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const feed = await response.json();
      return feed;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || "World";
    const mentions = await getMentions();

    return {
      statusCode: 200,
      body: JSON.stringify(mentions),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
