bash tricks

# dont allow commiting to main branch

```sh
#!/bin/sh

branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "main" ]; then
  echo "Hello from .git/hooks/pre-commit"
  echo "You can't commit directly to main branch."
  exit 1
fi
```

save that to `.git/hooks/pre-commit`


# use one of two binaries:
Create alias if it doesn't already exist:

```sh
command -v gdircolors >/dev/null 2>&1 || alias gdircolors="dircolors"

# this may be zsh only…
which glocate > /dev/null && alias locate=glocate
```

# compress and extract shit

```sh
7z a -tle files.7z this_stuff.json
7z e files.7z

gzip -k this_stuff.json
gunzip -k files.json.gz
```

btw ag wont find things in my dotfiles because it treats them as hidden...


# print all colors
http://jafrog.com/2013/11/23/colors-in-terminal.html

```sh
for code in {0..255}
	do echo -e "\e[38;5;${code}m"'\\e[38;5;'"$code"m"\e[0m"
done
```
