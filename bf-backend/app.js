const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const burgers = require("./data.json");
const {writeFile, readFileSync} = require("fs");
const {json} = require("express");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get("/burgers", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(burgers);
});

app.get("/address", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const path = "./address.json";
  const addressesJSON = readFileSync(path);
  res.send(addressesJSON);
});
app.post("/address", (req, res) => {
  const path = "./address.json";
  const addressesJSON = readFileSync(path);
  const addresses = JSON.parse(addressesJSON.toString());
  addresses.push(req.body);
  writeFile(path, JSON.stringify(addresses), err => {
    if (err) res.send(JSON.stringify({message: "Error saving"}));
    else res.send(JSON.stringify({message: "Address saved"}));
  });
});
app.put("/address/:id", (req, res) => {

  const addressId = +req.params["id"];
  const path = "./address.json";
  const addressesJSON = readFileSync(path);
  const addresses = JSON.parse(addressesJSON.toString());
  addresses[addresses.findIndex(address => address.id === addressId)] = req.body;
  writeFile(path, JSON.stringify(addresses), err => {
    if (err) res.send(JSON.stringify({message: "Error saving"}));
    else res.send(JSON.stringify({message: "Address saved"}));
  });
});
app.delete("/address/:id", (req, res) => {
  const path = "./address.json";
  const addressId = +req.params["id"];
  const addressesJSON = readFileSync(path);
  const addresses = JSON.parse(addressesJSON.toString());
  const updatedAddresses = addresses.filter(address => address.id !== addressId);
  writeFile(path, JSON.stringify(updatedAddresses), err => {
    if (err) res.send(JSON.stringify({message: "Error saving"}));
    else res.send(JSON.stringify({message: "Address deleted"}));
  });
});

app.get("/credit-card",  (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const path = "./credit-card.json";
  const creditCardsJSON = readFileSync(path);
  res.send(creditCardsJSON);
});
app.post("/credit-card", (req, res) => {
  const path = "./credit-card.json";
  const creditCardsJSON = readFileSync(path);
  const creditCards = JSON.parse(creditCardsJSON.toString());
  creditCards.push(req.body);
  writeFile(path, JSON.stringify(creditCards), err => {
    if (err) res.send(JSON.stringify({message: "Error saving"}));
    else res.send(JSON.stringify({message: "Credit Card saved"}));
  });
});
app.put("/credit-card/:id", (req, res) => {

  const creditCardId = +req.params["id"];
  const path = "./credit-card.json";
  const creditCardsJSON = readFileSync(path);
  const creditCards = JSON.parse(creditCardsJSON.toString());
  creditCards[creditCards.findIndex(creditCard => creditCard.id === creditCardId)] = req.body;
  writeFile(path, JSON.stringify(creditCards), err => {
    if (err) res.send(JSON.stringify({message: "Error saving"}));
    else res.send(JSON.stringify({message: "Credit Card saved"}));
  });
});
app.delete("/credit-card/:id", (req, res) => {
  const path = "./credit-card.json";
  const creditCardId = +req.params["id"];
  const creditCardsJSON = readFileSync(path);
  const creditCards = JSON.parse(creditCardsJSON.toString());
  const updatedCreditCards = creditCards.filter(creditCard => creditCard.id !== creditCardId);
  writeFile(path, JSON.stringify(updatedCreditCards), err => {
    if (err) res.send(JSON.stringify({message: "Error saving"}));
    else res.send(JSON.stringify({message: "Credit Card deleted"}));
  });
});

app.get("/order", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const path = "./orders.json"
  const ordersJSON = readFileSync(path);
  res.send(ordersJSON);
});
app.post("/order", (req, res) => {
  const path = "./orders.json"
  const ordersJSON = readFileSync(path);
  const orders = JSON.parse(ordersJSON.toString());
  orders.push(req.body);
  console.log(req.body);
  writeFile(path, JSON.stringify(orders), err => {
    if (err) res.send(JSON.stringify({message: "Error saving"}));
    else res.send(JSON.stringify({message: "Order saved"}));
  })
  //res.send(JSON.stringify({message: "Got it"}) );
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

module.exports = app;
