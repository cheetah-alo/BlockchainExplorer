require("dotenv").config();
const express = require("express");
const { Web3 } = require("Web3");
const { serializeBigInt } = require("./utils");

const app = express();

const PORT = process.env.PORT;
const URL_INFURA = process.env.URL_INFURA;

const web3Instance = new Web3(URL_INFURA);

const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

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
      // aproach1
      // this is giving me the error:
      //// Error getting block number: TypeError: Do not know how to serialize a BigInt
      // res.send({ blockNumber });
      // console.log(blockNumber);
      // ********************* //
      // // aproach2 - OK
      // res.send(String(blockNumber));
      // console.log(blockNumber);
      // ********************* //
      // aproach3
      // define the serializeBigInt in utils
      const serializedBlock = JSON.stringify(blockNumber, serializeBigInt);
      res.send(serializedBlock);
      console.log(serializedBlock);
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
      // aproach1
      // res.send(block);
      // console.log(block);
      // ********************* //
      // approach 2
      const serializedBlock = JSON.stringify(block, serializeBigInt);
      res.json(serializedBlock);
      console.log(serializedBlock);
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
      // approach 1
      // Error getting the transaction reference: TypeError:
      // Do not know how to serialize a BigInt at JSON.stringify (<anonymous>)
      // res.send(tx);
      // console.log(tx);
      // ********************* //
      // approach 2
      // Convert BigInt properties to strings
      // Error getting the transaction reference: TypeError: Do not know how to serialize a BigInt
      // const txInfo = JSON.stringify(tx);
      // res.send(txInfo);
      // ********************* //
      // approach 3
      const serializedTx = JSON.stringify(tx, serializeBigInt);
      res.send(serializedTx);
      console.log(serializedTx);
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
    const address = req.params.address;

    if (!ethereumAddressRegex.test(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    const balance = await web3Instance.eth.getBalance(address);

    if (balance) {
      // ********************* //
      // // approach1
      // Error getting balance number: TypeError [ERR_INVALID_ARG_TYPE]:
      // The first argument must be of type string or an instance of Buffer, ArrayBuffer,
      // or Array or an Array-like Object. Received type bigint (1144048889407423n)
      // res.send(balance);
      // console.log(balance);
      // ********************* //
      // // aproach2 - OK
      res.send(String(balance));
      res.send(String(web3Instance.utils.fromWei(balance, "ether")));
      console.log(balance);
      // ********************* //
      // // aproach3
      // const serializedbalance = JSON.stringify(balance, serializeBigInt);
      // console.log(serializedbalance);
      // ********************* //
      // // aproach4
      // Error getting balance number: InvalidNumberError:
      // Invalid value given "1144048889407423". Error: can not parse as number data.
      // const serializedbalance = JSON.stringify(balance, serializeBigInt);
      // const balance_ethers = web3Instance.utils.fromWei(
      //   serializedbalance,
      //   "ether"
      // );
      // res.send(balance_ethers);
      // ********************* //
      // others way to calculate ethers
      // res.send( {
      //   serializedbalance,
      //   ethers: serializedbalance / 1e18,
      //   ethersfromutils: web3Instance.utils.fromWei(serializedbalance, "ether"),
      //   })
    } else {
      res.status(404).json({ error: "Balance not found" });
    }
  } catch (error) {
    console.error("Error getting balance number:", error);
    res.status(500).send("Error getting balance number");
  }
});
