importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// import firebase from "firebase/compat/app";

firebase.initializeApp({
  apiKey: "AIzaSyBIzwZkKz8gGW8sFR948eoSGIXkRIBHL4o",
  authDomain: "tester-621ef.firebaseapp.com",
  projectId: "tester-621ef",
  storageBucket: "tester-621ef.firebasestorage.app",
  messagingSenderId: "392710326526",
  appId: "1:392710326526:web:cb567adca7e6f92b7dfdaf",
  databaseURL:
    "https://tester-621ef-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage((payload) => {
  console.log("Foreground notification received: ", payload);

  if (document.visibilityState === "visible") {
    console.log("dasdsad");
    displayInBrowserNotification(payload.notification);
  } else {
    console.log("Browser inactive, letting service worker show notification.");
  }
});

function displayInBrowserNotification(notification) {
  const notificationDiv = document.createElement("div");
  notificationDiv.style.position = "fixed";
  notificationDiv.style.bottom = "20px";
  notificationDiv.style.right = "20px";
  notificationDiv.style.padding = "10px 20px";
  notificationDiv.style.backgroundColor = "#444";
  notificationDiv.style.color = "#fff";
  notificationDiv.style.borderRadius = "5px";
  notificationDiv.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
  notificationDiv.style.zIndex = "1000";

  notificationDiv.innerHTML = `
    <h4>${notification.title}</h4>
    <p>${notification.body}</p>
  `;

  document.body.appendChild(notificationDiv);

  setTimeout(() => {
    notificationDiv.remove();
  }, 5000); // Remove notification after 5 seconds
}
