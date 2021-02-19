# Brancher
Chrome extension which autocompletes GitHub branch names in BitRise. Based on the [following](https://discuss.bitrise.io/t/branch-name-suggestion-feature/4543) feature request.

## Installation

## Repository access
### Public repositories
No need to do anything here - just add the extension to Chrome, and you're good to go.

### Private/Org repositories
In order to allow branch retrieval, you will need to add a GitHub Personal Access token to the extension with certain
scopes.
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
- [ ] Find true love