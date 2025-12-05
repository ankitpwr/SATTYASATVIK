// const paypal = require("paypal-rest-sdk");
// s = paypal;



const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // or "live"
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});
