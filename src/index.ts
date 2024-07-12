import express from "express";
import cors from "cors";
import contacts from "./controller/contacts";

const app = express();
const port = process.env.PORT || 5858;

const corsOptions = {
  origin: process.env.WEBSITE_URL
    ? process.env.WEBSITE_URL
    : "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(contacts);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
