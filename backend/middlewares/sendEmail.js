// import nodemailer from "nodemailer";
// import EmailSetting from "../models/emailSettings"; // Your EmailSetting model

// // Middleware to setup sendMail function
// const sendMail = async ({ to, subject, text, html }) => {
//   try {
//     // Fetch email settings from the database
//     const emailSettings = await EmailSetting.findOne();

//     // if (!emailSettings) {
//     //   return res.status(500).send("Email settings not configured.");
//     // }

//     // Create the Nodemailer transporter using the fetched email settings
//     const transporter = nodemailer.createTransport({
//       host: emailSettings.mailHost,
//       port: emailSettings.mailPort,
//       secure: emailSettings.mailEncryption === "ssl", // true for SSL
//       auth: {
//         user: emailSettings.mailUsername,
//         pass: emailSettings.mailPassword,
//       },
//     });

//     // Attach a `sendMail` function to the request object
//     let sendMail = async ({ to, subject, text, html }) => {
//       const mailOptions = {
//         from: `${emailSettings.mailFromName} <${emailSettings.mailFromEmail}>`, // From email
//         to, // Recipient's email
//         subject, // Subject line
//         text, // Plain text body
//         html, // HTML body (optional)
//       };

//       // Send the email
//       try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log(`Email sent: ${info.response}`);
//       } catch (error) {
//         console.error(`Error sending email: ${error}`);
//         throw new Error("Failed to send email");
//       }
//     };

//     // Proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error("Error setting up email middleware:", error);
//     res.status(500).send("Failed to setup email middleware.");
//   }
// };

// export default sendMail;


import nodemailer from "nodemailer";
import EmailSetting from "../models/emailSettings.js"; // Your EmailSetting model

// Middleware to setup sendMail function
const sendMail = async ({ to, subject, text, html }) => {
  try {
    // Fetch email settings from the database
    const emailSettings = await EmailSetting.findOne();

    if (!emailSettings) {
      throw new Error("Email settings not configured.");
    }

    // Create the Nodemailer transporter using the fetched email settings
    const transporter = nodemailer.createTransport({
      host: emailSettings.mailHost,
      port: emailSettings.mailPort,
      secure: emailSettings.mailEncryption === "ssl", // true for SSL
      auth: {
        user: emailSettings.mailUsername,
        pass: emailSettings.mailPassword,
      },
    });

    // Setup email options
    const mailOptions = {
      from: `${emailSettings.mailFromName} <${emailSettings.mailFromEmail}>`, // Sender info
      to, // Recipient's email
      subject, // Subject line
      text, // Plain text body
      html, // HTML body (optional)
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Failed to send email");
  }
};

export default sendMail;
