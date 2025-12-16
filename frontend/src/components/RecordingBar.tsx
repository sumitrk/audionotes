import { Button } from "@/components/ui/button"
import { useAudioRecorder } from "@/hooks/useAudioRecorder"



function RecordingBar() {

  const {isRecording, audioUrl, startRecording, stopRecording} = useAudioRecorder()

  return (
    <div className="w-full sticky bottom-6 flex flex-col items-center">
      <div className="flex items-center justify-between w-3/4 rounded-full border border-stone-200 bg-white px-6 py-3">
          {audioUrl ? (
            <audio controls src={audioUrl} />
          ): (
            <div>Record audio to listen</div>
          )}
          <div>
            {!isRecording ? (
              <Button onClick={startRecording}>Start recording</Button>
            ) : (
              <Button onClick={stopRecording}>Stop recording</Button>
            )}
            
          </div>
      </div>
    </div>
  )
}

export default RecordingBar