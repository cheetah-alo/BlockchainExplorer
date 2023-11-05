// Load environment variables
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const { Web3 } = require("Web3"); // Import Web3 for Ethereum interactions
const { serializeBigInt } = require("./utils"); // Custom utility for serializing BigInt values

// Create an Express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Define the port number from environment variables
const PORT = process.env.PORT;
const URL_INFURA = process.env.URL_INFURA; // Ethereum node URL

// Create an instance of Web3 for interacting with Ethereum
const web3Instance = new Web3(URL_INFURA);

// Regular expressions for Ethereum address and block number validation
const ethereumAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;
const ethereumBlockNumberRegex = /^\d+\.?\d*$/;

// Route to check if the server is running
app.get("/ping", async (req, res) => {
  res.send({ fecha: new Date().toISOString() });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

// Route to get the current block number
app.get("/blocknumber", async (req, res) => {
  try {
    // Get the current block number from the Ethereum node
    const blockNumber = await web3Instance.eth.getBlockNumber();
    if (blockNumber) {
      // Serialize the block number and send it as a JSON response
      const serializedBlock = JSON.stringify(blockNumber, serializeBigInt);
      res.send(serializedBlock);
      console.log(serializedBlock);
    } else {
      // Handle the case where the block number is not found
      res.status(404).json({ error: "BlockNumber not found" });
    }
  } catch (error) {
    // Handle errors that occur during the operation
    console.error("Error getting block number:", error);
    res.status(500).send("Error getting block number");
  }
});

// Route to get information about a specific block by block hash or block number
app.get("/block/:block", async (req, res) => {
  try {
    // Check if the provided block number is valid
    const blockNumber = req.params.block;
    if (!ethereumBlockNumberRegex.test(blockNumber)) {
      return res.status(400).json({ error: "Invalid Ethereum block number" });
    }

    // Get information about the specified block using its hash or block number
    const block = await web3Instance.eth.getBlock(blockNumber);
    if (block) {
      // Serialize the block data and send it as a JSON response
      const serializedBlock = JSON.stringify(block, serializeBigInt);
      res.json(serializedBlock);
      console.log(serializedBlock);
    } else {
      // Handle the case where the block is not found
      res.status(404).json({ error: "Block not found" });
    }
  } catch (error) {
    // Handle errors that occur during the operation
    console.error("Error getting block params:", error);
    res.status(500).send("Error getting block params");
  }
});

// Route to get information about a specific transaction by transaction hash
app.get("/tx/:tx", async (req, res) => {
  try {
    const txHash = req.params.tx;

    // Check if the provided transaction hash is valid
    if (txHash.length !== 66) {
      return res
        .status(400)
        .json({ error: "Invalid Ethereum transaction hash" });
    }

    // Get information about the specified transaction using its hash
    const tx = await web3Instance.eth.getTransaction(txHash);

    if (tx) {
      // Serialize the transaction data and send it as a JSON response
      const serializedTx = JSON.stringify(tx, serializeBigInt);
      res.send(serializedTx);
      console.log(serializedTx);
    } else {
      // Handle the case where the transaction is not found
      res.status(404).json({ error: "Transaction not found" });
    }
  } catch (error) {
    // Handle errors that occur during the operation
    console.error("Error getting the transaction reference:", error);
    res.status(500).send("Error getting the transaction reference");
  }
});

// Route to get the balance of an Ethereum address
app.get("/balance/:address", async (req, res) => {
  try {
    const address = req.params.address;

    // Check if the provided address is a valid Ethereum address
    if (!ethereumAddressRegex.test(address)) {
      return res.status(400).json({ error: "Invalid Ethereum address" });
    }

    // Get the balance of the Ethereum address
    const balance = await web3Instance.eth.getBalance(address);

    if (balance) {
      // Convert and send the balance as ether in a string format
      res.send(String(web3Instance.utils.fromWei(balance, "ether")));
      console.log(balance);
    } else {
      // Handle the case where the balance is not found
      res.status(404).json({ error: "Balance not found" });
    }
  } catch (error) {
    // Handle errors that occur during the operation
    console.error("Error getting balance number:", error);
    res.status(500).send("Error getting balance number");
  }
});
