import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import upload from "../config/upload.js";
import { transcribeAudio } from "../services/transcription.js";
import { supabase } from "../config/supabase.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const notesRouter = Router();

// GET all notes
notesRouter.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("Notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return res.status(500).json({ error: "Failed to fetch notes" });
  }
  res.json(data);
});

// GET single note by ID
notesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("id", id)
      .single(); // Expects exactly one result

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          error: "Note not found",
        });
      }
      throw error;
    }

    res.json({
      success: true,
      note: data,
    });
  } catch (err: any) {
    console.error("Supabase error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to fetch note",
    });
  }
});
// POST create a new note
notesRouter.post("/", async (req, res) => {
  const { title, body, status } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  const { data, error } = await supabase
    .from("Notes")
    .insert({ title, body, status })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: "Failed to create note" });
  }

  res.status(201).json({
    success: true,
    note: data,
  });
});

notesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body, status, audio_url } = req.body;

  try {
    const updateData: Partial<Note> = {};
    if (title !== undefined) updateData.title = title;
    if (body !== undefined) updateData.body = body;
    if (status !== undefined) updateData.status = status;
    if (audio_url !== undefined) updateData.audio_url = audio_url;

    const { data, error } = await supabase
      .from("notes")
      .update({
        ...updateData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return res.status(404).json({
          success: false,
          error: "Note not found",
        });
      }
      throw error;
    }

    res.json({
      success: true,
      note: data,
    });
  } catch (err: any) {
    console.error("Supabase error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to update note",
    });
  }
});

// DELETE note
notesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from("notes").delete().eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Note deleted",
    });
  } catch (err: any) {
    console.error("Supabase error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to delete note",
    });
  }
});

// POST upload an audio file
notesRouter.post("/upload", upload.single("audio"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file?.filename,
  });
});

// POST transcribe an audio file
notesRouter.post("/transcribe", async (req, res) => {
  // get the filename
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ error: "Filename is required" });
  }

  // Construct the full absolute path to the uploaded file
  const filePath = path.join(__dirname, "../../uploads", filename);
  console.log(filePath);
  try {
    const { transcript, duration } = await transcribeAudio(filePath);

    const { data, error } = await supabase
      .from("notes")
      .insert({
        title: "Untitled",
        body: transcript,
        status: "ready",
      })
      .select()
      .single();

    if (error) throw error;

    res.json({ transcript, duration });
  } catch (err) {
    console.error("Transcription error:", err);
    return res.status(500).json({ error: "Transcription failed" });
  }
});

export default notesRouter;
