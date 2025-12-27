import { createContext, useContext, type ReactNode } from "react";
import { useAudioRecorder } from "@/hooks/useAudioRecorder";

export type RecordingStatus =
  | "idle"
  | "recording"
  | "paused"
  | "uploading"
  | "processing"
  | "error";

type RecordingContextType = {
  status: RecordingStatus;
  error: string | null;
  audioUrl: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
};

const RecordingContext = createContext<RecordingContextType | undefined>(
  undefined
);

export function RecordingProvider({ children }: { children: ReactNode }) {
  const recorderState = useAudioRecorder();

  return (
    <RecordingContext.Provider value={recorderState}>
      {children}
    </RecordingContext.Provider>
  );
}

export function useRecording() {
  const context = useContext(RecordingContext);
  if (context === undefined) {
    throw new Error("useRecording must be used within RecordingProvider");
  }
  return context;
}
