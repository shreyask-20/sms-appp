document.getElementById("smsForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
  const responseMessage = document.getElementById("responseMessage");

  responseMessage.innerText = "Sending...";
  responseMessage.classList.remove('success-message', 'error-message'); // Reset styling

  try {
      const response = await fetch("http://localhost:5000/send-sms", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ phone, message })
      });

      const data = await response.json();
      responseMessage.innerText = data.message;
      responseMessage.classList.add(data.success ? 'success-message' : 'error-message');
  } catch (error) {
      responseMessage.innerText = "Error sending message.";
      responseMessage.classList.add('error-message');
  }
});
