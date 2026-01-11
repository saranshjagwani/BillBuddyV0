import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firestore";

export async function submitFeedback(data: {
  userId: string;
  phoneNumber: string;
  shopName: string;
  message: string;
}) {
  if (!data.message.trim()) {
    throw new Error("Message is required");
  }

 addDoc(collection(db, "feedback"), {
    ...data,
    createdAt: serverTimestamp(),
    app: "BillBuddy",
    version: "v0",
  });
}
