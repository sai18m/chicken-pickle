const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'icloud',
  auth: {
    user: 'pprakxsh09@icloud.com',
    pass: 'Light*09',
  },
});

app.post('/submit', (req, res) => {
  const formData = req.body;

  const mailOptions = {
    from: 'pprakxsh09@icloud.com',
    to: formData.email,
    subject: 'Chicken Pickle Order',
    text: `
      Phone Number: ${formData.number}
      House No.: ${formData.house}
      Street: ${formData.street}
      City: ${formData.city}
      State: ${formData.state}
      Pincode: ${formData.pincode}

      Dear ${formData.name},

      You have successfully placed your chicken pickle order, and it will be delivered soon!

      Thank you for ordering!

      Best regards,
      Chicken Pickle
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  });
});

app.get('/payment-status', (req, res) => {
  const paymentStatus = req.query.status;
  if (paymentStatus === 'success') {
      res.redirect('/payment-success.html');
  } else if (paymentStatus === 'failed') {
      res.redirect('/payment-failed.html');
  } else {
      res.redirect('/payment-failed.html');
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
