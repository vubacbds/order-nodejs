const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv/config");

module.exports = {
  sendMail: (to, subject, htmlContent) => {
    const transport = nodeMailer.createTransport({
      //   host: process.env.MAIL_HOST,
      //   port: process.env.MAIL_PORT,
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME || "bac0122000@gmail.com",
        pass: process.env.MAIL_PASSWORD || "hpftroebeyhkwmhk",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const options = {
      from: process.env.MAIL_FROM_ADDRESS || "bac0122000@gmail.com",
      to: to,
      subject: subject,
      template: "email",
      context: htmlContent,
    };

    // point to the template folder
    // const handlebarOptions = {
    //   viewEngine: {
    //     partialsDir: path.resolve("../views/"),
    //     defaultLayout: false,
    //   },
    //   viewPath: path.resolve("../views/"),
    // };

    var handlebarOptions = {
      viewEngine: {
        extname: ".hbs", // handlebars extension
        layoutsDir: "/order_nodejs/src/views/", // location of handlebars templates
        defaultLayout: "email", // name of main template
        partialsDir: "/order_nodejs/src/views/", // location of your subtemplates aka. header, footer etc
      },
      viewPath: "/order_nodejs/src/views/",
      extName: ".hbs",
    };

    // use a template file with nodemailer
    transport.use("compile", hbs(handlebarOptions));

    return transport.sendMail(options);
  },
};
