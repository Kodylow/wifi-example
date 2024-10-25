let scanner = null;

document.getElementById("scanQR").addEventListener("click", () => {
  if (scanner) {
    return;
  }

  // Create QR scanner modal
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

  const scannerDiv = document.createElement("div");
  scannerDiv.id = "reader";
  scannerDiv.style.width = "300px";
  modal.appendChild(scannerDiv);
  document.body.appendChild(modal);

  scanner = new Html5Qrcode("reader");
  scanner.start(
    { facingMode: "environment" },
    {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    },
    (decodedText) => {
      document.getElementById("ecashInput").value = decodedText;
      scanner.stop();
      document.body.removeChild(modal);
      scanner = null;
    },
    (error) => {
      // Handle scan errors silently
    }
  );

  // Close modal on click outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      scanner.stop();
      document.body.removeChild(modal);
      scanner = null;
    }
  });
});

document.getElementById("submitPayment").addEventListener("click", async () => {
  const ecashToken = document.getElementById("ecashInput").value;
  const statusDiv = document.getElementById("status");

  if (!ecashToken) {
    statusDiv.textContent = "Please enter an eCash token";
    statusDiv.className = "status error";
    return;
  }

  try {
    statusDiv.textContent = "Processing payment...";

    // Simulate payment verification
    // In reality, you'd make an API call to your backend here
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate successful payment
    const success = Math.random() > 0.3; // 70% success rate for demo

    if (success) {
      statusDiv.textContent = "Connected! Enjoy your WiFi access";
      statusDiv.className = "status success";

      // Here you would typically:
      // 1. Update the client's MAC address in your WiFi controller
      // 2. Send connection details to the client
      // 3. Trigger any necessary network changes
    } else {
      throw new Error("Invalid or expired eCash token");
    }
  } catch (error) {
    statusDiv.textContent = error.message;
    statusDiv.className = "status error";
  }
});
