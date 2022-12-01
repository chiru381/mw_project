const nodemailer = require("nodemailer");

//using nodemailer
const sendEmail = async (email, otpCode, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "gmail",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: "chirukosanam123@gmail.com",
        pass: "xxhrvvaakgwryfzi",
      },
    });
    // var otp = `${Math.floor(1000 + Math.random() * 900000)}`;
    // var otp = "123456";
    await transporter.sendMail({
      from: "chirukosanam123@gmail.com",
      to: email,
      subject: "OTP for Forgot Password",
      text: "OTP",
      html: `<h1>Welcome</h1><p>Your verification code is ${otpCode}.Please Reset Your Password.</p>`,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
