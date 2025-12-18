import express from "express"
import cors from "cors"
import notesRouter from "./notes.js"


const app = express()

app.use(cors())
app.use(express.json())

app.use("/notes", notesRouter)

const PORT = 4000
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})