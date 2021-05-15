const express = require("express");
const app = express();
const fetch = require("node-fetch");
const fs = require("fs");

let bitcoinUsd, satUsd, bitcoinEur, satEur;

app.get("/print", (req, res) => {
  fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then((data) => data.json())
    .then((data) => {
      bitcoinUsd = "$" + (+data.bpi.USD.rate.replace(",", "")).toFixed(2);
      satUsd = bitcoinUsd / 100000000;
      bitcoinEur = "€" + (+data.bpi.EUR.rate.replace(",", "")).toFixed(2);
      satEur = bitcoinEur / 100000000;
      let print = "BTC-EUR: " + bitcoinEur + "\nBTC-USD: " + bitcoinUsd;
      fs.writeFileSync(`./print.txt`, print, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("done");
        }
      });
      exec("lp -d Bar_printer print.txt");
      res.json({ msg: "Succesful" });
    });
});

app.listen(3000, () => {
  console.log("Listening on", 3000);
});
