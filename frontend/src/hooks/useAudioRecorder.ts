import { useRef, useState } from "react"

export function useAudioRecorder(){
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])

    const[isRecording, setIsRecording] = useState(false)
    const[audioUrl, setAudioUrl] = useState<string | null>(null)

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({audio:true})

        const recorder = new MediaRecorder(stream)
        chunksRef.current = []
        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunksRef.current.push(event.data)
            }
        }
        recorder.onstop = () => {
            const audioBlob = new Blob(chunksRef.current, {type: 'audio/wav'})
            const audioUrl = URL.createObjectURL(audioBlob)
            setAudioUrl(audioUrl)
        }

        recorder.start()
        mediaRecorderRef.current = recorder
        setIsRecording(true)
    }

    function stopRecording(){
        mediaRecorderRef.current?.stop()
        setIsRecording(false)
    }

    return {
        isRecording,
        audioUrl,
        startRecording,
        stopRecording,
    }
}