const API_BASE_URL = "http://localhost:4000/notes";

export async function uploadAudio(audio: Blob) {
  const formData = new FormData();
  formData.append("audio", audio, "recording.webm");

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Audio upload failed");
  }

  const { filename } = await response.json();
  console.log(filename);
  return filename;
}

export async function transcribeAudio(filename: string) {
  console.log(filename);
  const response = await fetch(`${API_BASE_URL}/transcribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filename }),
  });

  if (!response.ok) {
    throw new Error("Transcription failed");
  }

  const data = await response.json();
  return { text: data.transcript, duration: data.duration };
}
