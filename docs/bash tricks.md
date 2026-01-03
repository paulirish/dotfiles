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

# using unix `mail` spool to read cron output shit

```
h      # for list messagess
h 10   # list messages starting at 10
n      # type out the message after > cursor and move cursor
t      # prints message where the > cursor is
t 15   # print message 15

d 1-21 # to delete msgs 1-21
d *    # delete all
```

# mac os verbose logs

```sh
command log stream
```

# mac os profiling/diagnostics

```sh
sudo fs_usage -w >> ~/Desktop/fs_usage.txt   # and ctrl-c to terminate

sudo spindump -notarget 60 -o ~/Desktop/spindump.txt

# log who is making system calls / starting processes - and what they are.
sudo dtrace -q -n 'syscall::exec*:entry { printf("%s %s\n", execname, copyinstr(arg0)); }'

# collect a CPU sample for a process (like you can from activity monitor)
sample 19286 2 -file /tmp/19286.sample.txt
```

# set -euxo pipefail

well.. for set -e at least... https://news.ycombinator.com/item?id=44666984

```sh
  trap 'caller 1' ERR
```

also can add -E as of recently.




