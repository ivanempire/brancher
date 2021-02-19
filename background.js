/**
 * Function which listens to the front-end content script for the GitHub project name
 */
chrome.runtime.onMessage.addListener(message => {
	retrieveBranches(message.projectName)
});

/**
 * Function which kicks off the branch retrieval process by first getting the user token, then calling the GitHub API
 * @param projectName The GitHub project name that came from the front-end; either user/repo or org/repo
 */
function retrieveBranches(projectName) {
	getUserToken()
		.then(accessToken => getBranchList(accessToken, projectName))
		.then(response => response.json())
		.then(data => sendOffData(data))
		.catch(error => console.error(error));
}

/**
 * Function which queries the Chrome local storage API to get the GitHub personal access token
 * @returns {Promise<String>} Github personal access token, can be null if not set up
 */
function getUserToken() {
	return new Promise((resolve, _) => {
		chrome.storage.local.get(["accessToken"], (result) => {
			resolve(result.accessToken);
		});
	});
}

/**
 * Function which queries the GitHub API in order to retrieve the branch names for a certain repository
 * @param accessToken Nullable access token - if repository is public, branches will be listed, otherwise, errors out
 * @param projectName The GitHub project name that came from the front-end; either <user/repo> or <org/repo>
 * @returns {Promise<Response>}
 */
function getBranchList(accessToken, projectName) {
	let requestHeaders = {
		"Accept": "application/vnd.github.v3+json"
	};

	// If an access token exists, add it to the headers. Header with null token gives an error
	if (accessToken) {
		requestHeaders["Authorization"] = `token ${accessToken}`
	}

	let API_BRANCH_URL = `https://api.github.com/repos/${projectName}/branches`;
	return fetch(API_BRANCH_URL, {
		headers: requestHeaders,
	})
}

/**
 * Function which sends the retrieved branch list to the content script
 * @param callResponse GitHub API response, varies based on {@link getUserToken} response, and repository visibility
 */
function sendOffData(callResponse) {
	if(callResponse.message) {
		console.error("GitHub API did not return a branch list");
		console.dir(callResponse);
	} else {
		let newList = callResponse.map(currentBranch => currentBranch.name);
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {branches: newList});
		});
	}
}