const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const validator = require("validator");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// POST method for /bfhl route
app.post("/bfhl", upload.single("file_b64"), (req, res) => {
  const { data, file_b64 } = req.body;

  // Validate JSON structure
  if (!Array.isArray(data)) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = "";
  let isPrimeFound = false;

  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
      if (isPrime(item)) {
        isPrimeFound = true;
      }
    } else if (/[a-zA-Z]/.test(item)) {
      alphabets.push(item);
      if (item === item.toLowerCase() && item > highestLowercase) {
        highestLowercase = item;
      }
    }
  });

  // File validation
  let fileValid = false;
  let fileMimeType = "";
  let fileSizeKb = 0;

  if (file_b64) {
    const fileBuffer = Buffer.from(file_b64, "base64");
    fileValid = true;
    fileMimeType = "application/octet-stream"; // Replace with correct mime type if needed
    fileSizeKb = fileBuffer.length / 1024;
  }

  // Prepare the response
  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: isPrimeFound,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: Math.round(fileSizeKb),
  });
});

// GET method for /bfhl route
app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Backend API running on http://localhost:${port}`);
});
