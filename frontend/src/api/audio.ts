export async function uploadAudio(audio:Blob){
    const formData = new FormData()
    formData.append("audio", audio, "recording.webm")

    const response = await fetch("http://localhost:4000/notes/upload", {
        method: "POST",
        body: formData
    })

    if (!response.ok){
        throw new Error("Audio upload failed")
    }

    return response.json()
}