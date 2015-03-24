## Other parts of migrating to a new mac, when not using migration assistant but instead doing piecemeal migration.


* [x] .app's I really want and aren't in my caskfile.
* [ ] read `brew list` and `brew cask list` to see whats worth reinstalling

* [ ] read `npm list -g --depth=0` to see global npm packages

* [ ] bash history?
* [x] Wifi Settings and passwords
  *  `/Volumes/MacintoshHD/Library/Preferences/SystemConfiguration/com.apple.airport.preferences.plist`
* [x] `.extra`
* [x] .ssh and .gnupg
* [x] .osx settings
  * more? https://github.com/hjuutilainen/dotfiles/blob/master/bin/osx-user-defaults.sh
  * symlink https://github.com/mathiasbynens/dotfiles/pull/301
  * great stuff https://github.com/paulmillr/dotfiles

* [x] Limechat settings
  * `~/Library/Preferences/net.limechat.LimeChat.plist`
* [x] Automator scripts
  * `~/Library/Services`
* [ ] Timestats stats
  * gotta export into JSON through their UI. save somewhere hilarious

* [x] Documents folder
* [x] Photobooth pics (in dropbox)  : ~/Dropbox/Public/cam
* [ ] Finder settings and TotalFinder settings
  * Not sure how to do this yet. Really want to.

* [ ] Chrome profiles and config flags? Nah
* [x] current tabs (via onetab)
