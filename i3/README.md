# i3-dotfiles

I'm using RichiH/vcsh for dotfile management.

## Dependencies
Currently the following arch packages are used:
- [i3](https://www.archlinux.org/groups/x86_64/i3/) obviously (but i3status is
  not actually currently used)
- [dunst](https://www.archlinux.org/packages/?name=dunst) for notifications
- [gsimplecal](https://www.archlinux.org/packages/community/x86_64/gsimplecal/)
  a simple calendar widget
- [i3blocks](https://aur.archlinux.org/packages/i3blocks) for the status bar
- [j4-dmenu-desktop-git](https://aur.archlinux.org/packages/j4-dmenu-desktop-git/) i3-dmenu-desktop upgrade
- [dmenu2](https://aur.archlinux.org/packages/dmenu2/) a dmenu upgrade
- [termite](https://wiki.archlinux.org/index.php/Termite) as the terminal emulator
- [compton](https://aur.archlinux.org/packages/compton/) to enable opacity for termite
- [polkit](https://www.archlinux.org/packages/?name=polkit) to allow non-root
  users to issue power-related commands
- [polkit-gnome](https://www.archlinux.org/packages/?name=polkit-gnome) as the polkit agent
- [ttf-droid](https://www.archlinux.org/packages/community/any/ttf-droid/) as the font
- [ttf-symbola](https://www.archlinux.org/packages/community/any/ttf-symbola/) for icons on statusbar
- [mpc](https://www.archlinux.org/packages/?name=mpc) to make media keys work with mpd
- [npm-applet](https://www.archlinux.org/packages/?name=network-manager-applet)
  for network management
- [gnome-keyring](https://www.archlinux.org/packages/?name=gnome-keyring) so the nm-applet could prompt for wifi passwords
- [redshift](https://www.archlinux.org/packages/?name=redshift) for screen color
  temperature management
- [kalu](https://aur.archlinux.org/packages/kalu/) to get notified of pacman updates
- [feh](https://www.archlinux.org/packages/?name=feh) to set the background
- [qutebrowser](https://aur.archlinux.org/packages/qutebrowser/) as a minimalistic browser
- [jq](https://aur.archlinux.org/packages/jq/) to parse i3 IPC messages
- [playerctl](https://aur.archlinux.org/packages/playerctl/) to make media keys work with spotify
- [caffeine-ng](https://aur.archlinux.org/packages/caffeine-ng/) for caffeine
- [imagemagick](https://www.archlinux.org/packages/?sort=&q=imagemagick) for the pixelated i3lock script

I also have autologin enabled, as described here: https://bbs.archlinux.org/viewtopic.php?pid=1348186#p1348186

And [grub-holdshift](https://aur.archlinux.org/packages/grub-holdshift/) to avoid
waiting for grub at every boot

## How to use
```
# Install dependencies
yaourt -S i3 dunst gsimplecal i3blocks j4-dmenu-desktop-git dmenu2 termite compton polkit polkit-gnome ttf-droid ttf-symbola mpc network-manager-applet redshift kalu feh qutebrowser jq playerctl caffeine-ng gnome-keyring imagemagick

# Clone  
vcsh clone git@github.com:deiwin/i3-dotfiles.git i3

# Set background
cd
mkdir -p Pictures/Wallpapers
wget -O Pictures/Wallpapers/simple_rocket.png 'http://static.simpledesktops.com/uploads/desktops/2012/07/03/simpledesktops.png'
bin/set-wallpaper Pictures/Wallpapers/simple_rocket.png
```
PS. the background is stolen from a [/r/unixporn thread](http://www.reddit.com/r/unixporn/comments/2q6nbm/boringwmi3_fake_it_till_you_make_it/)
