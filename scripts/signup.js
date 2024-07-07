document.addEventListener('DOMContentLoaded', () => {
    const createAccountButton = document.getElementById('create-account-button');
    // back-to-login
    const backToLoginButton = document.getElementById('back-to-login');

    createAccountButton.addEventListener('click', signup);
    backToLoginButton.addEventListener('click', () => {
        navigateTo('login.html');
    });
});


async function signup() {
    showLoader();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    var customerCreated = false;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async userCredential => {
            customerCreated = true;
            const id = await createStripeCustomer(email, userCredential.user.uid);
            if (!id) {
                throw new Error('Error creating customer in stripe');
            }
            await createCustomerInFirebase(email, userCredential.user.uid, id);
            hideLoader();
            // saveUserToCookie({ email: email, subscribed: false, uid: user.uid, customerId: id });
            navigateTo('home.html');
            const user = userCredential.user;
            console.log('Signup successful:', user);
            document.getElementById('signup-error-message').textContent = 'Signup successful';
        })
        .catch(async error => {
            if (customerCreated) {
                await firebase.auth().currentUser.delete();
                await firebase.auth().signOut();
            }
            hideLoader();
            console.error('Error during signup:', error);
            document.getElementById('signup-error-message').textContent = error.message;
        });
}



async function createStripeCustomer(email, uid) {
    try {
        const response = await fetch("https://us-central1-speechbuddy-30390.cloudfunctions.net/createCustomer", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                description: `Customer for ${uid}`,
            })
        });

        if (!response.ok) {
            console.error('Stripe Create Customeer response was not ok');
            return null;
        }
        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error('There was a problem with the creating the Customer in Stripe:', error);
        return null;
    }
}


async function createCustomerInFirebase(email, uid, customerID) {
    try {
        await firebase.firestore().collection('Users').doc(uid).set({
            email: email,
            customerId: customerID
        });
    } catch (error) {
        throw new Error('Error creating customer in firebase');
    }
}
