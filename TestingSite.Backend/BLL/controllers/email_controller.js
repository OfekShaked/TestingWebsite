const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.createTransporter();
  }
  createTransporter = () => {
    let mailConfig;
    if (process.env.NODE_ENV === "production") {
      // all emails are delivered to destination
      mailConfig = {
        service: "gmail",
        auth: {
          user: process.env.HOST_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      };
    } else {
      // all emails are catched by ethereal.email
      mailConfig = {
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "odessa.jakubowski59@ethereal.email",
          pass: "Q3bqcjzsyMC98JFGTG",
        },
      };
    }
    this.transporter = nodemailer.createTransport(mailConfig);
  };

  send_email = (sender, reciever, subject, message) => {
    var mailOptions = {
      from: process.env.NODE_ENV === "production"?sender:"odessa.jakubowski59@ethereal.email",
      to: reciever,
      subject: subject,
      text: message,
    };

    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
      }
    });
  };
}

module.exports = new EmailService();
