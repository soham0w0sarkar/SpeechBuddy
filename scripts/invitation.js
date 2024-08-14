async function handleInvitationCodeSubmission(user) {
  const inviteCode = document.getElementById("invite-code").value.trim();

  if (!inviteCode) {
    document.getElementById("invitation-error-message").innerText =
      "Please enter a valid invitation code.";
    return;
  }

  const [parentUid, buddyNo] = inviteCode.split("_");
  if (!parentUid || !buddyNo) {
    document.getElementById("invitation-error-message").innerText =
      "Invalid invitation code format.";
    return;
  }

  try {
    const invitationDoc = await fetchFirebaseData(inviteCode, "Invitations");

    if (!invitationDoc) {
      document.getElementById("invitation-error-message").innerText =
        "Invitation code not found.";
      return;
    }

    if (invitationDoc.status !== "pending") {
      document.getElementById("invitation-error-message").innerText =
        "This invitation is not valid or has already been used.";
      return;
    }

    const currentUid = user.uid;
    const parentData = await fetchFirebaseData(parentUid, "Users");

    if (!parentData) {
      document.getElementById("invitation-error-message").innerText =
        "Parent user not found.";
      return;
    }

    if (parentData.recipientEmail !== user.email) {
      document.getElementById("invitation-error-message").innerText =
        "This invitation code wasn't meant for you.";
      return;
    }

    await updateFirebaseData(currentUid, {
      tier: "buddy",
      parentId: parentUid,
      customerId: parentData.customerId,
    });

    await firebase
      .firestore()
      .collection("Users")
      .doc(parentUid)
      .update({
        buddylist: firebase.firestore.FieldValue.arrayUnion(currentUid),
      });

    await firebase
      .firestore()
      .collection("Invitations")
      .doc(inviteCode)
      .update({
        status: "completed",
      });

    console.log("Invitation processed successfully.");
    navigateTo("buddy.html");
  } catch (error) {
    console.error("Error processing invitation code:", error);
    document.getElementById("invitation-error-message").innerText =
      "An error occurred. Please try again.";
    navigateTo("convince.html");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      document
        .getElementById("submit-invite-code")
        .addEventListener("click", async () => {
          await handleInvitationCodeSubmission(user);
        });

      document
        .getElementById("continue-button")
        .addEventListener("click", () => {
          navigateTo("convince.html");
        });
    } else {
      navigateTo("login.html");
    }
  });
});
