window.addEventListener("load", function(event) {
	// REALLY not ideal
	// If you're reading this, I know, I tried all sorts of event listeners, but Angular just keeps loading stuff.
	// Hacky solution it is.....
	setTimeout(function() {
		processProjectName();
	}, 1000);
});

function processProjectName() {
	let projectLink = document.getElementsByClassName("app-option source github")[0].href.split("/");
	let projectName = `${projectLink[projectLink.length - 2]}/${projectLink[projectLink.length - 1]}`;
	console.log("Brancher: Processed project name: " + projectName);
	chrome.runtime.sendMessage({projectName: projectName});
}

chrome.runtime.onMessage.addListener(message => {
	populateBranchList(message.branches);
});

/**
 * Function which creates a <datalist> element in the DOM, populates it with <option> tags with branch names as the
 * values, and then binds this data list to the branch input field
 * @param branchList The list of GitHub branch names received from the back-end script
 */
function populateBranchList(branchList) {
	console.log("Brancher: Got branch list from background script");
	let branchInput = document.querySelectorAll('[ng-model="buildConfig.branch"]')[0];

	let datalist = document.createElement("datalist");
	datalist.setAttribute("id", "branchList");

	// Create the option elements and append them to the <datalist> tag
	branchList.forEach(branchName => {
		let branchNode = document.createElement("option");
		branchNode.value = branchName;
		datalist.appendChild(branchNode);
	});

	// Put the <datalist> tag to the end of the <body>; bind suggestions
	document.body.appendChild(datalist);
	branchInput.setAttribute("list", "branchList");
}