const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

//Connect Database
connectDB();

app.use(express.json({ extended: false }));
app.use(fileUpload());

//Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/offers", require("./routes/offers"));
app.use("/api/uploads", require("./routes/uploads"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
