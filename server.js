const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static("public"));
app.use(express.json());

// Payment endpoint
app.post("/api/verify-payment", async (req, res) => {
  const { ecashToken } = req.body;

  try {
    // TODO: Implement your actual eCash verification here
    // This is just a mock implementation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!ecashToken || ecashToken.length < 10) {
      throw new Error("Invalid token");
    }

    // Mock success response
    res.json({
      success: true,
      wifiDetails: {
        ssid: "Public WiFi",
        password: "temporaryPass123",
        expiresIn: "1 hour",
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
