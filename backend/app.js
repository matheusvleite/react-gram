import express from "express"
import path, { dirname } from "path"
import cors from "cors";
import dotenv from "dotenv/config";
import { router } from "./routes/Router.js";
import { db } from "./config/db.js";
import { fileURLToPath } from "url";


const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// cors

app.use(cors({ credentials: true, origin: "https://react-gram-nu.vercel.app/" }));

// upload
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("/uploads", express.static(path.join(__dirname, '/uploads')));

// DB connection

db.on('error', console.log.bind(console, 'Error connection'));
db.once('open', () => {
    console.log('Connection db sucessfull')
})

// routes

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})