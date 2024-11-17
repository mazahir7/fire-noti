import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBIzwZkKz8gGW8sFR948eoSGIXkRIBHL4o",
  authDomain: "tester-621ef.firebaseapp.com",
  projectId: "tester-621ef",
  storageBucket: "tester-621ef.firebasestorage.app",
  messagingSenderId: "392710326526",
  appId: "1:392710326526:web:cb567adca7e6f92b7dfdaf",
  databaseURL:
    "https://tester-621ef-default-rtdb.asia-southeast1.firebasedatabase.app",
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
  const permission = await Notification.requestPermission();
  console.log(permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BHjG0gyOwZpeE7s6WWxfPOO1qaK037GBGgIAtvvXfsK-o5Cz2OsVSiqqM4sCPiKs-8oEHhKeNkyWEA6rIMtXGCQ",
    });
    console.log("token = ", token);
  }
};
