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
/*
const admin = require('firebase-admin');
const serviceAccount = require("./data/gcp-ms-firebase.json");
const collectionKey = "orders";  //name of the collection
*/

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8081;


//Load orders for pseudo database
const orders = require("./data/orders.json").orders;

var readOrder = [];

//Enable cors
// app.use(cors());


app.use(function (req, res) {
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

});


//Get all orders
app.get("/api/orders", (req, res) => res.json(orders));


//Get orders by ID
app.get("/api/orders/:id", (req, res) =>
  res.json(orders.find(order => order.id === req.params.id))
);


/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gcp-ms.firebaseio.com"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

//this will insert json in firestore
if (orders && (typeof orders === "object")) {
  Object.keys(orders).forEach(docKey => {
    firestore.collection(collectionKey).doc(docKey).set(orders[docKey]).then((res) => {
      console.log("Document " + docKey + " successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  });
}
*/


/*
app.get("/api/orders1", async (req, res) => {
  try {
    const snapshot = await firestore.collection(collectionKey).get();
    const data = snapshot.docs.map(doc => doc.data())
    console.log(data)
    res.json(data);
  } catch (e) {
	app.get("/api/orders", (req, res) => res.json(orders));
    console.error(e);
  }
});
*/


app.listen(port, () =>
  console.log(`Orders microservice listening on port ${port}!`)
);
