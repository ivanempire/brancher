# Brancher
Chrome extension which autocompletes GitHub branch names in BitRise. Based on the [following](https://discuss.bitrise.io/t/branch-name-suggestion-feature/4543) feature request.

## Installation

### Via source code
1. Download the repository either via the ZIP method, or by running `git clone git@github.com:ivanempire/brancher.git`.
   If you're using the ZIP method, remeber to extract the archive as well.
2. Navigate to `chrome://extensions/`, and press "Load unpacked"
3. Select the downloaded folder, and it should show up in your extension list.

### Via Web Store


## Repository access
### Public repositories
No need to do anything here - just add the extension to Chrome, and you're good to go.

### Private/Org repositories
In order to allow branch retrieval, you will need to add a GitHub Personal Access token to the extension with certain
scopes. The token is stored in `chrome.storage.local`, the logic for which can be seen in the [following](https://github.com/ivanempire/brancher/blob/cd34f39a83e57e0f9579a8450dfbe198bfda13c3/background.js#L27)
file. It is written to said location in [this](https://github.com/ivanempire/brancher/blob/cd34f39a83e57e0f9579a8450dfbe198bfda13c3/options.js#L6) file.

1. Go to the personal access token page, found [here](https://github.com/settings/tokens/new).
2. Generate a new access token with the `repo` scope - very first one on the list.
3. Go to `chrome://extensions`, and click into the `Brancher` management. Open up the settings page for the extension,
which will be listed at the bottom.
4. Paste in the access token, and click save.
5. Reload the BitRise project page.

## A type of Agile
- [x] Initialize only on BitRise project pages
- [x] Retrieve project information
- [x] List public repository branches
- [x] Save and retrieve GitHub token to `chrome.storage.local` API
- [x] List private repository branches
- [x] Basic settings page
- [ ] List organization repository branches
- [ ] Debug pop-up page
- [ ] Polish off settings page
- [ ] Publish to the Chrome Web Store
- [ ] Remove the delay function during loading
- [ ] Find true love