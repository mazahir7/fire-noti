const express = require("express");

const app = express();
const router = express.Router();

const admin = require("firebase-admin");
const serviceAccount = require("./tester-621ef-firebase-adminsdk-wpwbz-b9e20989db.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (
  token = "dlLDBVCm7jje0lJc4Y1yXg:APA91bG9_tMnsrS1SyFKQ1TUyFPL1MJhkr7yjLHH98b8kqvbeH81uns9w3vfExn-DE_CeCoRexK2uFHNWVtKYH0G-ycsGGlHWJFVf75tBIhiGqj-cUw5_Vs",
  message = ""
) => {
  const messageSend = {
    token,
    notification: {
      title: "Welcome to localhost",
      body: "You are accessing the localhost.",
    },
  };

  admin
    .messaging()
    .send(messageSend)
    .then((res) => console.log("message send successfully ", res))
    .catch((err) => console.log("error sending message ", err));
};

router.get("/", (req, res) => {
  sendNotification();
  res.status(200).send({ success: true });
});

app.use("/", router);

app.listen(8000, () => {
  console.log("server running");
});
