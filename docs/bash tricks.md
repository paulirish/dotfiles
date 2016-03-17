bash tricks

# use one of two binaries:
Create alias if it doesn't already exist:

    command -v gdircolors >/dev/null 2>&1 || alias gdircolors="dircolors"

	# this may be zsh only…
    which glocate > /dev/null && alias locate=glocate


compress and extract shit

	7z a -tle files.7z this_stuff.json
	7z e files.7z

	gzip -k this_stuff.json
	gunzip -k files.json.gz


btw ag wont find things in my dotfiles because it treats them as hidden...

