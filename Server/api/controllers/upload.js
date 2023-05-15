import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, process.env.GS_ID);

export const uploadItem = async (req, res) => {
  console.log("ttest");
  try {
    const itemsRef = ref(storage, req.file.originalname);
    const metadata = {
      contentType: req.file.mimetype,
    };
    const snapshot = await uploadBytes(itemsRef, req.file.buffer, metadata);

    const downloadURL = await getDownloadURL(snapshot.ref);
    res.status(200).json({ url: downloadURL });
  } catch (error) {
    console.log("error", error);
  }
};
