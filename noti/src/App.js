import "./App.css";
import { getDatabase, ref, set } from "firebase/database";
import { app, generateToken, messaging } from "./firebase";
import { useEffect } from "react";
import { onMessage } from "firebase/messaging";

const db = getDatabase(app);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payLoad) => {
      console.log("payLoad = ", payLoad);
    });
  }, []);

  const putData = () => {
    set(ref(db, "users/mazahir"), { id: 1, name: "mazahir", age: 21 });
  };
  return (
    <div className="App">
      hello
      <button onClick={putData}>Put data</button>
    </div>
  );
}

export default App;
