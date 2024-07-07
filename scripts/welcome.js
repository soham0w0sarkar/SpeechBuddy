

document.addEventListener('DOMContentLoaded', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.stop();
            //close tab
            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                chrome.tabs.remove(tabs[0].id);
            });
        })
        .catch(err => { })
});