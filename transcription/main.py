from faster_whisper import WhisperModel # type:ignore
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
import os

app = FastAPI()

model = WhisperModel("base", device="cpu", compute_type="int8")

class TranscribeRequest(BaseModel):
    file_path:str

class TranscribeResponse(BaseModel):
    transcript:str
    language:str
    duration:float

@app.post("/transcribe", response_model = TranscribeResponse)
def transcribe_audio(request:TranscribeRequest):
    if not os.path.exists(request.file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    segments, info = model.transcribe(request.file_path)
    full_text = " ".join([segment.text for segment in segments])

    return TranscribeResponse(
        transcript=full_text,
        language=info.language,
        duration=info.duration
    )
