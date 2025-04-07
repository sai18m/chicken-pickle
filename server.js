const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const resend = new Resend("re_id1tMrwr_9BC81gfMgjANLSq1NF78VUmb");

app.post("/submit-address", async (req, res) => {
  const { name, email, number, address } = req.body;

  try {
    await resend.emails.send({
      from: "Address Form <onboarding@resend.dev>",
      to: "sai143seven@gmail.com",
      subject: "New Address Submission",
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${number}</p>
             <p><strong>Address:</strong> ${address}</p>`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
