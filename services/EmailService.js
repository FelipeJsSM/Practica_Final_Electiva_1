const nodemailer = require("nodemailer");
require('dotenv').config();
const env = process.env;

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 587,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

module.exports = transporter;