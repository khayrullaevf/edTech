const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail login
        pass: process.env.EMAIL_PASS, // Gmail parol
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email yuborildi!");
  } catch (error) {
    console.error("Email jo‘natishda xatolik:", error);
  }
};

module.exports = sendEmail;
