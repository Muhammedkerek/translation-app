import React, { useState, useRef } from "react";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("");
  const [canSend, setCanSend] = useState(false);
  const mediaRecorderRef = useRef(null); // Ref for mediaRecorder
  const audioChunksRef = useRef([]); // Ref for audioChunks

  const startRecording = async () => {
    try {
      // Clear previous audio chunks
      audioChunksRef.current = [];

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "video/webm"; // Check supported MIME types

      // Create MediaRecorder instance
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      // Handle recording chunks
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // Enable "Send Recording" button on stop
      mediaRecorder.onstop = () => {
        setCanSend(true);
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      setCanSend(false);
      setStatus("Recording...");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setStatus("Microphone access error. Please check permissions or browser settings.");
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setStatus("Recording stopped. Ready to send.");
    }
  };

  const sendRecording = async () => {
    try {
      // Create Blob from recorded audio chunks
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      // Send audio to backend
      const response = await fetch("http://localhost:5000/api/vocalapp/save-audio-text", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      setStatus(`Response: ${result}`);
      setCanSend(false); // Disable "Send Recording" button
    } catch (err) {
      console.error("Error sending audio:", err);
      setStatus("Error uploading audio.");
    }
  };

  return (
    <div>
      <h1>Record and Send Audio</h1>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
      <button onClick={sendRecording} disabled={!canSend}>
        Send Recording
      </button>
      <p>{status}</p>
    </div>
  );
};

export default VoiceRecorder;
