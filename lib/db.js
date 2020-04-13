const admin = require("firebase-admin");
const secret = require("../firebase-secret.json");
const { GeoFirestore } = require("geofirestore");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(secret),
  });
}

const db = admin.firestore();
const dbgeo = new GeoFirestore(db);

module.exports = {
  db: dbgeo,
};
