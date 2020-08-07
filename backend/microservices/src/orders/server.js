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
router = express.Router();
// const Firestore = require("@google-cloud/firestore");

// //const cors = require("cors");
const app = express();
// const port = process.env.PORT || 8081;

// const collectionKey = "orders"; //name of the collection

// //Load orders for pseudo database
// const orders = require("./data/orders.json").orders;
// const serviceAccountKey = "./data/cool-reach-keys-1.json";

// const projectid = "cool-reach-284001";
// process.env.GCLOUD_PROJECT = projectid;

//Enable cors
//app.use(cors());

// [START initialize_app]

// const db = new Firestore({
//   projectId: projectid,
//   keyFilename: serviceAccountKey,
// });

// app.use(function (req, res) {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
// });

app.get("/api/orders", async (req, res) => {
  try {
    const snapshot = await db.collection("orders").get();
    const data = snapshot.docs.map(doc => doc.data());
    console.log(data);
    // Print the ID and contents of each document
    snapshot.forEach(doc => {
      console.log(doc.id, " Orders => ", doc.data());
    });

    res.json(data);
  } catch (e) {
    app.get("/api/orders", (req, res) => res.json(orders));
    console.error(e);
  }
  console.log("db getting orders data");
});

// //=========================================================================
app.post("/api/createorder", async (req, res, next) => {
  // Add a new document in collection "cities"
  console.log("getting here");
  db.collection("orders")
    .get()
    .then(snap => {
      const order = req.body;
      db.collection("orders")
        .doc(`${new Date().getTime()}`)
        .set({ id: snap.size++, ...order })
        .then(function () {
          console.log("Document successfully written!");
          res.status(201).json({ message: "success" });
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
          res.status(417).json({ message: "error creating" });
        });
      snap.size;
    });
});
// //=========================================================================

// //this will insert orders json in firestore
// app.get("/api/createorders", async (req, res) => {
//   if (orders && typeof orders === "object") {
//     Object.keys(orders).forEach(docKey => {
//       db.collection(collectionKey)
//         .doc(docKey)
//         .set(orders[docKey])
//         .then(res => {
//           console.log("Document " + docKey + " successfully written!");
//         })
//         .catch(error => {
//           console.error("Error writing orders document: ", error);
//         });
//     });
//   }
//   console.log("db creating  orders data");
// });

// app.post("/api/test", async (req, res) => {
//   res.status(200).json({ waddup: "hey" });
// });

// //Get all orders
// app.get("/api/orders1", (req, res) => res.json(orders));

// //Get orders by ID
// app.get("/api/orders/:id", (req, res) =>
//   res.json(orders.find(order => order.id === req.params.id))
// );

app.use("/", () => {});

app.get("api/orders", async (req, res) => {
  console.log("u see my order");
})
// try {
//   const snapshot = await db.collection("orders").get();
//   const data = snapshot.docs.map(doc => doc.data());
//   console.log(data);
//   // Print the ID and contents of each document
//   snapshot.forEach(doc => {
//     console.log(doc.id, " Orders => ", doc.data());
//   });
//   res.json(data);
// } catch (e) {
//   app.get("/api/orders", (req, res) => res.json(orders));
//   console.error(e);
// }
// console.log("db getting orders data");
// });

app.listen(port, () => console.log(`this is the port ${port}`));

/*

const admin = require('firebase-admin');
const serviceAccount = require("./data/gcp-ms-firebase.json");
const collectionKey = "orders";  //name of the collection

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gcp-ms.firebaseio.com"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

var readOrder = [];

app.get("/api/orders", async (req, res) => {
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
