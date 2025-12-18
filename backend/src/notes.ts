import { Router } from "express";
import upload from "./upload.js";

const notesRouter = Router()

notesRouter.post("/upload", upload.single("audio"), (req, res) => {

    if(!req.file){
        res.status(400).json({error: "No audio file uploaded"})
    }

    res.json({ message: "File uploaded successfully",
        filename: req.file?.filename,
     })
})

export default notesRouter