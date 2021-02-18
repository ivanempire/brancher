chrome.runtime.onMessage.addListener(function(message, callback) {
	console.log("Received message from front-end: " + message.projectName);
	retrieveBranches(message.projectName)
});

function retrieveBranches(projectName) {
	var API_BRANCH_URL = `https://api.github.com/repos/${projectName}/branches`;

	fetch(API_BRANCH_URL)
	.then(response => response.json())
	.then(data => sendOffBranches(data));
};

function sendOffBranches(branchList) {
	var newList = branchList.map(currentBranch => currentBranch.name);
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {branches: newList});
	});
};