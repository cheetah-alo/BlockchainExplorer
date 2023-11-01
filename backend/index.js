require("dotenv").config();
const express = require("express");
const { Web3 } = require("Web3");

const app = express();

const PORT = process.env.PORT;
const URL_INFURA = process.env.URL_INFURA;

const web3Instance = new Web3(URL_INFURA);

app.get("/ping", async (req, res) => {
  res.send({ fecha: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

app.get("/blocknumber", async (req, res) => {
  try {
    const blockNumber = await web3Instance.eth.getBlockNumber();
    if (blockNumber) {
      res.send(String(blockNumber));
      console.log(blockNumber);
      //res.send({ blockNumber }); // this is giving me the error mentioned
    } else {
      res.status(404).json({ error: "BlockNumber not found" });
    }
  } catch (error) {
    console.error("Error getting block number:", error);
    res.status(500).send("Error getting block number");
  }
});

app.get("/block/:block", async (req, res) => {
  try {
    const block = await web3Instance.eth.getBlock(req.params.block);
    if (block) {
      res.send(block);
      console.log(block);
    } else {
      res.status(404).json({ error: "Block not found" });
    }
  } catch (error) {
    console.error("Error getting block params:", error);
    res.status(500).send("Error getting block params");
  }
});

app.get("/tx/:tx", async (req, res) => {
  try {
    const tx = await web3Instance.eth.getTransaction(req.params.tx);

    if (tx) {
      // Convert BigInt properties to strings
      const txInfo = JSON.stringify({ tx: tx });
      res.send(txInfo);
      // res.send(tx);
      // console.log(tx);
    } else {
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    console.error("Error getting the transaction reference:", error);
    res.status(500).send("Error getting the transaction reference");
  }
});

app.get("/balance/:address", async (req, res) => {
  try {
    const balance = await web3Instance.eth.getBalance(req.params.address);
    if (balance) {
      res.send(balance);
      console.log(balance);
    } else {
      res.status(404).json({ error: "Balance not found" });
    }
  } catch (error) {
    console.error("Error getting balance number:", error);
    res.status(500).send("Error getting balance number");
  }
});
