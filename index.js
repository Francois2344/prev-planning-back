const express = require("express");
const cors = require("cors");
const app = express();
const actionAgency = require("./models/agency");
const actionOther = require("./models/other");
const actionHazard = require("./models/hazard");
const actionSite = require("./models/site");

const userRouter = require('./routes/users');

require("./initDB")();

app.use(express.json());
app.use(cors());

app.use('./users', userRouter);

const PORT = process.env.PORT;

app.get('/', async (req, res) => {
  const agency = new actionAgency({agencyName:"Accueil Nouveau"});
  const other = new actionOther({otherName:"Formation"});
  const hazard = new actionHazard({hazardName:"Bureau"});
  const site = new actionSite({siteName:"Audit Chantier"});
  try {
    await agency.save();
    await other.save();
    await hazard.save();
    await site.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err);
  }
});
app.listen(PORT, () => {
  console.log("Server started on port" + PORT + "...");
});
