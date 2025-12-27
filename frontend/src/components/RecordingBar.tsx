import { Button } from "@/components/ui/button";
import { useRecording } from "@/contexts/RecordingContext";

function RecordingBar() {
  const { status, audioUrl, startRecording, stopRecording } = useRecording();

  return (
    <div className="w-full absolute bottom-12 flex flex-col items-center z-2">
      <div className="flex items-center justify-between w-3/4 rounded-full border shadow-[0_0_0_1px_black/10] bg-white px-6 py-4">
        {audioUrl ? (
          <audio controls src={audioUrl} />
        ) : (
          <div>Record audio to listen</div>
        )}
        <div>
          {status != "recording" ? (
            <Button onClick={startRecording}>Start recording</Button>
          ) : (
            <Button onClick={stopRecording}>Stop recording</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordingBar;
