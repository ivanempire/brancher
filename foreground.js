window.addEventListener("load", function(event) {
	// REALLY not ideal
	setTimeout(function() {
		processProjectName();
	}, 1000);
});

function processProjectName() {
	let projectLink = document.getElementsByClassName("app-option source github")[0].href.split("/");
	let projectName = `${projectLink[projectLink.length - 2]}/${projectLink[projectLink.length - 1]}`;
	chrome.runtime.sendMessage({projectName: projectName});
};

chrome.runtime.onMessage.addListener(function(message, callback) {
	console.log("Received message from back-end: " + message.branches);
	populateBranchList(message.branches);
});

function populateBranchList(branchList) {
	let branchInput = document.querySelectorAll('[ng-model="buildConfig.branch"]')[0];
	let datalist = document.createElement("datalist");
	datalist.setAttribute("id", "branchList");

	branchList.forEach(branchName => {
		let branchNode = document.createElement("option");
		branchNode.value = branchName;
		datalist.appendChild(branchNode);
	});

	document.body.appendChild(datalist);
	branchInput.setAttribute("list", "branchList");
}