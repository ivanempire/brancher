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