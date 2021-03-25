const express = require("express");
const cors = require("cors");

const app = express();

require("./database/initDB")();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});

const usersRouter = require("./routes/users");
const agenciesRouter = require("./routes/agency");

app.use("/users", usersRouter);
app.use("/agencies", agenciesRouter);

app.listen(PORT, () => {
  console.log("Server started on port" + PORT + "...");
});
