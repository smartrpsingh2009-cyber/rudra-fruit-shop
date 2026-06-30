import { firebaseConfig, ADMIN_EMAILS } from "../../firebase.js";
let app, auth, db, storage;
export const firebaseReady = !firebaseConfig.apiKey.startsWith("YOUR_");
export async function initFirebase(){
  if(!firebaseReady || app) return { app, auth, db, storage };
  const appMod = await import("https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js");
  const authMod = await import("https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js");
  const dbMod = await import("https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js");
  const storageMod = await import("https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js");
  app = appMod.initializeApp(firebaseConfig);
  auth = authMod.getAuth(app);
  db = dbMod.getFirestore(app);
  storage = storageMod.getStorage(app);
  return { app, auth, db, storage, authMod, dbMod, storageMod };
}
export function isAdminUser(user){ return !!user && ADMIN_EMAILS.includes(user.email); }
