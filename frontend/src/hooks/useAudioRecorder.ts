import { useRef, useState } from "react";
import { uploadAudio, transcribeAudio } from "@/api/audio";
import { type RecordingStatus } from "@/contexts/RecordingContext";
import { useNotes } from "@/contexts/NotesContext";

export function useAudioRecorder() {
  const { createNote, updateNote } = useNotes();
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      setStatus("recording");
      console.log("recording...");

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);

        await uploadRecording(audioBlob);
      };

      recorder.start();
      setStatus("recording");
    } catch (error) {
      setError(
        "Failed to start recording. Please check microphone permissions."
      );
      setStatus("error");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && status === "recording") {
      mediaRecorderRef.current.stop();
    }
    setStatus("idle");
  }

  const uploadRecording = async (audioBlob: Blob) => {
    setStatus("uploading");
    console.log("uploading...");

    try {
      // Step 1: Create a note with "uploading" status
      const noteId = createNote();
      // console.log("✅ Created note with ID:", noteId);

      // Step 2: Upload the audio file
      const filename = await uploadAudio(audioBlob);
      // console.log("✅ Upload response (filename):", filename);

      // Step 3: Update note status to "processing"
      setStatus("processing");
      updateNote(noteId, { status: "processing" });
      // console.log("✅ Updated note to processing status");

      // Step 4: Transcribe the audio
      const transcriptionResponse = await transcribeAudio(filename);
      // console.log("✅ Transcription response:", transcriptionResponse);

      // Step 5: Update note with transcription data

      const noteUpdate = {
        title: "Untitled Note",
        body: transcriptionResponse.text,
        duration: transcriptionResponse.duration || 0,
        status: "ready" as const,
      };
      // console.log("✅ Updating note with:", noteUpdate);
      updateNote(noteId, noteUpdate);
      // console.log("✅ Note updated successfully!");

      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError("Failed to process recording");
      console.error("❌ Error processing recording:", err);
    }
  };

  return { status, error, audioUrl, startRecording, stopRecording };
}
