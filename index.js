const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://FDAdmin:Frde2344058616@planningproject.lwyie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.listen(port, () => console.log(`Example app listening on port port!`));
