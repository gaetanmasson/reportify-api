const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");

const { authEmail } = require("./vars");

const smtpConfig = {
  host: authEmail.host,
  port: authEmail.port,
  auth: {
    user: authEmail.user,
    pass: authEmail.password
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

const hbsOptions = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: "../api/_templates/email/",
    defaultLayout: "template",
    partialsDir: "../api/_templates/partials/"
  },
  viewPath: "../api/_templates/email",
  extName: ".hbs"
};

transporter.use("compile", hbs(hbsOptions));

exports.transporter = transporter;
