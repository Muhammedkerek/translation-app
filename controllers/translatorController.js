const multer = require("multer");
const path = require("path");
const fs = require("fs");
const OpenAI = require("openai");

const uploadsFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder); // Create the folder if it doesn't exist
}


exports.renderHomePage = (req, res) => {
  res.send("Rendering the home page successfully");
};

exports.renderLoginPage = (req, res) => {
  res.send("Rendering the login page successfully");
};

exports.rendersignUpPage = (req, res) => {
  res.send("Rendering the sign-up page successfully");
};



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure the key is in your .env file
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Save in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});


const upload = multer({ storage }).single("audio"); // Expecting a single file named 'audio'



/*  const uploadsFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder); // Create the folder if it doesn't exist
}*/ 

exports.saveAudioText = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Error uploading audio:", err);
      return res.status(500).json({ success: false, message: "Error uploading audio." });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "No audio file uploaded." });
    }

    const filePath = req.file.path; // Path of the saved audio file

    try {
      // Transcribe the audio file using OpenAI
      const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath), // Read the uploaded file
        model: "whisper-1", // Whisper model for transcription
      });

      // Respond with the transcription text
      console.log("Transcription:", transcription.text);
      res.status(200).json({
        success: true,
        message: "Audio file transcribed successfully!",
        transcription: transcription.text, // Transcription result
        filePath,
      });
    } catch (transcriptionErr) {
      console.error("Error during transcription:", transcriptionErr);
      res.status(500).json({
        success: false,
        message: "Error transcribing the audio file.",
        error: transcriptionErr.message,
      });
    }
  });
};