// Set the date and time when the construction will end (YYYY-MM-DD HH:MM:SS format)
const countDownDate = new Date("2023-09-09 00:00:00").getTime();

const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = `
    <div class="circle day-circle">${days}d</div>
    <div class="circle hour-circle">${hours}h</div>
    <div class="circle minute-circle">${minutes}m</div>
    <div class="circle second-circle">${seconds}s</div>
  `;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "Construction is complete!";
  }
}, 1000);


// Function to show the custom popup
function showPopup(message) {
    const popup = document.getElementById('customPopup');
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popup.style.display = 'block';
  }
  
  // Function to close the custom popup
  function closePopup() {
    const popup = document.getElementById('customPopup');
    popup.style.display = 'none';
  }
  
 // Function to be called when the submit button is pressed
function onSubmitForm(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
       // Get the input value (email)
    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value;
  
    // Check if the email is empty
    if (email.trim() === '') {
      // If the email is empty, display an error message in the popup
      showPopup('Please enter your email before submitting.');
      return; // Exit the function to prevent further execution
    }
  
    // Send the data to the server using fetch API
    fetch('https://ucpage2.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
      // Show the received email in the custom popup
      showPopup(data.message);
      // Optionally, you can reset the input field after submission
      emailInput.value = '';
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while sending data to the server.');
    });
  }
// Add an event listener to the form submit event
document.getElementById('subscribeForm').addEventListener('submit', onSubmitForm);
