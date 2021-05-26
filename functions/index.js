const functions = require("firebase-functions");
const app = require("express")();
const cors = require("cors");
app.use(cors());

const { signHex } = require("./handlers/sign");

app.post("/sign", signHex);

exports.api = functions.https.onRequest(app);
