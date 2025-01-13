function submitForm(event) {
    event.preventDefault();

    let form = document.getElementById('addressForm');
    let valid = true;

    form.querySelectorAll('[required]').forEach(function (input) {
        if (!input.value.trim()) {
            valid = false;
            alert(`${input.name} is required!`);
            input.focus();
            return false;
        }
    });

    if (valid) {
        alert('Form submitted successfully!');
        form.reset();

        window.location.href = "upi.html";
    }
  }

    function handleFormSubmit(event) {
      event.preventDefault();
  
      const formData = {
        name: document.getElementById('name').value,
        number: document.getElementById('number').value,
        number: document.getElementById('email').value,
        house: document.getElementById('house').value,
        street: document.getElementById('street').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value,
      };
  
      localStorage.setItem('formData', JSON.stringify(formData));
  
      window.location.href = "upi.html";
    }

     const formData = JSON.parse(localStorage.getItem('formData'));
  
     document.getElementById('payButton').addEventListener('click', function() {
       sendFormDataToEmail(formData);
     });
   
     function sendFormDataToEmail(formData) {
       fetch('/send-email', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
       })
       .then(response => {
         if (response.ok) {
           console.log('Form data sent to email successfully!');
         } else {
           console.error('Failed to send form data.');
         }
       })
       .catch(error => {
         console.error('Error:', error);
       });
     }
  
     function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
      }

  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');

    if (status === 'success') {
      window.location.href = 'payment-success.html';
    } else if (status === 'failed') {
      window.location.href = 'payment-failed.html';
    }
  };