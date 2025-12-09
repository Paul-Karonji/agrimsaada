// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {setGlobalOptions} = require("firebase-functions");
// const {onRequest} = require("firebase-functions/https");
// const logger = require("firebase-functions/logger");

// // For cost control, you can set the maximum number of containers that can be
// // running at the same time. This helps mitigate the impact of unexpected
// // traffic spikes by instead downgrading performance. This limit is a
// // per-function limit. You can override the limit for each function using the
// // `maxInstances` option in the function's options, e.g.
// // `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// // NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// // functions should each use functions.runWith({ maxInstances: 10 }) instead.
// // In the v1 API, each function can only serve one request per container, so
// // this will be the maximum concurrent request count.
// setGlobalOptions({ minInstances: 1 });

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const { setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// Creating an express app
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Developing a USSD application

// Always keep 1 instance warm in production → instant responses
setGlobalOptions({ minInstances: 1 });
admin.initializeApp();

exports.ussd = onRequest(async (req, res) => {
  // Extract data sent by Africa’s Talking (or Postman)
  const { sessionId = "test123", phoneNumber = "+254000000000", text = "" } = req.body;

  // Split input by * → "1*Jane" → ["1", "Jane"]
  const steps = text.split("*");
  
  // Firestore session storage (remembers farmer’s progress)
  const sessionRef = admin.firestore().collection("sessions").doc(sessionId);
  const sessionSnap = await sessionRef.get();

  // ─── 1. FIRST VISIT ───────────────────────────────────────────────────
  if (!text || text === "") {
    await sessionRef.set({ phoneNumber, step: "main" }, { merge: true });
    return res.send(`CON Welcome to AgriMsaada 🌱
1. Register
2. Crop Advice
3. Livestock Advice
4. Disease Alerts`);
  }

  // ─── 2. USER IS AT MAIN MENU ─────────────────────────────────────────
  if (sessionSnap.data()?.step === "main") {
    // THE MAGIC FIX: extract just the number even if user types "1.", "1. Register", "1 Register"
    const rawChoice = steps[0].trim();           // "1. Register" → "1. Register"
    const choice = rawChoice.split(".")[0].trim(); // "1. Register" → "1"

    if (choice === "1") {
      await sessionRef.update({ step: "register_name" });
      return res.send(`CON Enter your full name:`);
    }
    if (choice === "2") return res.send(`CON Select crop:\n1. Maize\n2. Beans\n3. Kale`);
    if (choice === "3") return res.send(`CON Select animal:\n1. Cow\n2. Chicken\n3. Goat`);
    if (choice === "4") return res.send(`END Current alerts:\n• Armyworm in Kisii\n• FMD in Narok`);
  }

  // ─── 3. USER IS ENTERING NAME ───────────────────────────────────────
  if (sessionSnap.data()?.step === "register_name") {
    const name = steps[1]?.trim() || "Farmer";
    await sessionRef.update({ name, registered: true });
    return res.send(`END Thank you ${name}! You're now registered with AgriMsaada 🌟`);
  }

  // Final fallback
  res.send(`END Thank you for using AgriMsaada!`);
});