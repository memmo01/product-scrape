const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv").config();
module.exports = function (app) {
  app.post("/api/sendemail", function (req, res) {
    let { product, url } = req.body.data
    // *********email to owner********
    sgMail.setApiKey(process.env.API_KEY);
    const msg = {
      to: process.env.EMAIL,
      from: `${product}-Update@lemmons.com`,
      subject: `It looks like ${product} is in stock!`,
      html:
        `<p>Visit site to purchase</p> <a href=${url}>Visit Site</a>`
    };
    sgMail.send(msg);

    res.end();
  });


};
