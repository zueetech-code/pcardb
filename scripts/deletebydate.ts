import { adminDb } from "../lib/firebase-admin.ts";

const run = async () => {
  const date = "2026-05-06";

  try {
    const snapshot = await adminDb
      .collection("final_reports")
      .where("fromDate", "==", date)
      .get();

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