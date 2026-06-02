
import { adminDb } from "./lib/firebase-admin.js";
const run = async () => {
  const date = "2025-04-30";

  try {
    const snapshot = await adminDb
      .collection("final_reports")
      .where("fromDate", "==", date)
      .get();

    console.log("Found documents:", snapshot.size);

    if (snapshot.empty) {
      console.log("No documents found for:", date);
      return;
    }

    const batch = adminDb.batch();

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log(`Deleted ${snapshot.size} documents for ${date}`);
  } catch (err) {
    console.error("Delete error:", err);
  }
};

run();