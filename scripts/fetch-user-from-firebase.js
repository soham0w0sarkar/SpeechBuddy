async function fetchFirebaseData(uid) {
    try {
        const userDoc = await firebase.firestore().collection('Users').doc(uid).get();
        return userDoc.data();
    } catch (error) {
        console.error('Error fetching data from Firebase:', error);
        return null;
    }
}