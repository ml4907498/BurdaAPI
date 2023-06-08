import express, { Application } from "express";
import morgan from "morgan";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.get("/home", async (req, res) => {
    res.send("hello world!")
})

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));