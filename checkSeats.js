import fetch from "node-fetch";
import nodemailer from "nodemailer";

const URL =
  "https://www.stvincentpallottischoolblr.com/admission-for-prep-IX.html";

const TEXT_TO_CHECK =
  "Seats are not available from Prep I to Std. IV. Hence the online portal will remain closed until further notice.";

async function sendEmail(contentChanged) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "School Admission Alert 🚨",
    text: contentChanged
      ? "Seats message removed. Admission might be open!"
      : "Seats still unavailable.",
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent");
}

async function run() {
  try {
    const res = await fetch(URL);
    const html = await res.text();

    const exists = html.includes(TEXT_TO_CHECK);

    console.log("Text exists:", exists);

    // send mail only when text NOT exists
    if (!exists) {
      await sendEmail(true);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
