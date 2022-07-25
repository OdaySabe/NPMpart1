const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
app.use(express.static(path.join(__dirname, "page")));
app.use(express.static(path.join(__dirname, "node_modules")));
///
let Players = [];
const teamToIDs = {
  lakers: "1610612747",
  warriors: "1610612744",
  heat: "1610612748",
  suns: "1610612756",
};
function isSameID(id) {
  for (key in teamToIDs) {
    if (id == teamToIDs[key]) {
      return true;
    }
  }
  return false;
}
axios
  .get(`http://data.nba.net/10s/prod/v1/2018/players.json`)
  .then(function (res) {
    ares = res.data.league.standard;
    let result = ares.filter((a) => isSameID(a.teamId) && a.isActive);
    result.forEach((a) => {
      Players.push({
        name: a.firstName + " " + a.lastName,
        jersey: a.jersey,
        pos: a.pos,
        teamId: a.teamId,
        img: `https://nba-players.herokuapp.com/players/${a.lastName}`,
      });
    });
  });
let json = {
  name: "someone",
  age: 66,
};
app.get(`/postman`, function (req, res) {
  res.send(json);
});
app.get("/teams/:teamName", function (req, res) {
  const Id = teamToIDs[req.params.teamName];
  let response = Players.filter((a) => a.teamId == Id);
  res.send(response);
});

app.listen(3000, function () {
  console.log("server lisiting");
});
