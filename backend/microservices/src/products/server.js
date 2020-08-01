/*
Copyright 2019 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const express = require("express");
const admin = require('firebase-admin');
const serviceAccount = require("./data/gcp-ms-firebase.json");
const collectionKey = "products";  //name of the collection
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8082;

//Load product for pseudo database
const products = require("./data/products.json").products;

//Enable cors
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gcp-ms.firebaseio.com"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

//this will insert json in firestore
if (products && (typeof products === "object")) {
  Object.keys(products).forEach(docKey => {
    firestore.collection(collectionKey).doc(docKey).set(products[docKey]).then((res) => {
      console.log("Document " + docKey + " successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  });
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
var readProduct = [];
//Get all products
app.get("/api/products", (req, res) => res.json(products));

app.get("/api/products1", async (req, res) => {
  try {
    const snapshot = await firestore.collection(collectionKey).get();
    const data = snapshot.docs.map(doc => doc.data())
    console.log(data)
    res.json(data);
  } catch (e) {
    console.error(e);
  }
});

//Get products by ID
app.get("/api/products/:id", (req, res) =>
  res.json(products.find(product => product.id === req.params.id))
);

app.listen(port, () =>
  console.log(`Products microservice listening on port ${port}!`)
);