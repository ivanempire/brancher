let saveButton = document.getElementById("save");
let tokenInput = document.getElementById("token")

saveButton.addEventListener("click", function() {
    if (tokenInput.value) {
        chrome.storage.local.set({"accessToken": tokenInput.value.trim()});
    }
});