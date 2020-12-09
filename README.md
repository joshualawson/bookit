# BookIT

A browser extension to bookmark a "tab" as you read, when a tab is toggled to on with BookIT the BookIT bookmark is updated constantly with what ever link/page you move to and keeps track of your scroll position. This allows you to then open the BookIT bookmark exactly where you left off!

## Installing

Currently not released via the Firefox or Chrome extension stores, will look at doing that shortly, so manual install for now using the debugger.

## Building

Building the project as a one off
```sh
npm run build
```

Watching the files for changes and auto building
```sh
npm run watch
```

## Debugging

### Firefox
Open the [about:debugging](about:debugging) page, click "This Firefox" (in newer versions of Firefox), click "Load Temporary Add-on", then select the mainfest.json file in your extension's directory.

### Chrome
Coming soon...

## Compatibility

Currently only tested with Firefox

## Features

* Allows you to toggle a tab with BookIT to follow and save that tab as you read on
* Ability to open a followed tab (Currently does not check if you already have the same tab open and opens all saved tabs in a new tab)

## Future

This was a little experiment and my first time writing a browser extension so there is room for improvement, I was sick and tired of trying to remember where I was in reading documentation and leaving my PC on to save where I was at.

I would love to see this extension get a little smarter with it's tab management when opening BookIT bookmark and maybe already having a tab open on the same page.

Some other features missing:

* Being able to delete BookIT bookmarks
* Being able to clean all bookmarks
* Styling, it is quite poor at the time of writing this readme
* Toggle off, does nothing, it would be nice to be able to toggle off tab tracking
* Indication of toggle, changing the icon in the url bar to something that informs the user that the tab is being "tracked"

## Contributing

Feel free to contribute via PRs, I would love any feedback and PRs to improve this extension!