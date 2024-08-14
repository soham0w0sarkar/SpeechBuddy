async function fetchFirebaseData(uid, database = "Users") {
  try {
    const userDoc = await firebase
      .firestore()
      .collection(database)
      .doc(uid)
      .get();
    return userDoc.data();
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    return null;
  }
}

async function createFirebaseData(uid, data, database = "Users") {
  try {
    await firebase.firestore().collection(database).doc(uid).set(data);
    console.log("Data created in Firebase");
  } catch (error) {
    console.error("Error creating data in Firebase:", error);
  }
}

async function updateFirebaseData(uid, data, database = "Users") {
  try {
    await firebase.firestore().collection(database).doc(uid).update(data);
  } catch (error) {
    console.error("Error updating data in Firebase:", error);
  }
}
