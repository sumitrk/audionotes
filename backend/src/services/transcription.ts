import axios from "axios";

const PYTHON_API_URL = "http://localhost:8000";

export interface TranscriptionResponse {
  transcript: string;
  language: string;
  duration: number;
}

export async function transcribeAudio(
  absoluteFilePath: string
): Promise<TranscriptionResponse> {
  try {
    const response = await axios.post(`${PYTHON_API_URL}/transcribe`, {
      file_path: absoluteFilePath,
    });

    return response.data;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw new Error("Transcription service failed");
  }
}
