const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");

const app = express();

//Connect Database
connectDB();

app.use(express.json({ extended: false }));
app.use(fileUpload());

app.get("/", (req, res) => res.json({ msg: "Witaj w ToToMoto" }));

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/offers", require("./routes/offers"));
app.use("/api/offers/upload", require("./routes/offers"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
