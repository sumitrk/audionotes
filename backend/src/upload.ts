import multer from "multer"
import path from "path"
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname)
        const name = `${Date.now()}${ext}`
        cb(null, name)
    }
})

const upload = multer({ storage })

export default upload