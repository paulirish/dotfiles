#!/bin/bash





# listing all useragent from your logs
zcat ~/path/to/access/logs* | awk -F'"' '{print $6}' | sort | uniq -c | sort -rn | head -n20000
zcat logs/paulirish.com/http/access.log* | awk -F'"' '{print $6}' | sort | uniq -c | sort -rn | head -n20000 | less


### rsync

rsync -havz --progress --partial --append-verify login@host:/full/path ./



###############################################################################################################
### pull android app apk (like chrome canary) off a phone and install elsewhere.

# get canary off phone
adb shell pm list packages | grep canary | sed 's/package://'     # com.chrome.canary
adb shell pm path com.chrome.canary | sed 's/package://'  # /data/app/com.chrome.canary-2/base.apk


# pull it
adb pull /data/app/com.chrome.canary-1/base.apk

# get the vrsion of base.apk and save to $chromeversion
chromeversion=$(/Applications/Genymotion.app/Contents/MacOS/tools/aapt dump badging base.apk | grep "package:" | sed "s/.*versionName\='//" | sed "s/'.*//")
chromefilename="chrome-$chromeversion.apk"

# rename. optionally with version
mv base.apk $chromefilename

# plug in the new phone
# yes really do it
# check when done
   adb devices


# force install it.
adb install -r $chromefilename


# optionally clean up the apk
rm $chromefilename

###
###############################################################################################################






# measuring time in fish shell:

set -l then (gdate +%s%N); 
sleep 0.5; 
set -l andnow (gdate +%s%N);  echo cool (math ( math $andnow - $then) / 1000 / 1000  )




##############################################################################################
## one day i tried really really hard to get millisecond-precision time deltas printed for profiling.
## but i'm pretty sure it failed.
## since it was a few hours of work i'm keeping it. :)

  start="$(eval 'gdate +%s%3N')"


    function timestamp(){
        if hash gdate 2>/dev/null; then
            echo $(gdate +%s%3N)
        else

            echo $(date +%s%3)
        fi;
    }

    if hash gdate 2>/dev/null; then
        dateCmd="gdate +%s%3N"
    else
        dateCmd="date +%s%3"
    fi;


    dateAwesome="$(($(eval 'gdate +%s%3N')-$start))"


printf "%s" "$dateAwesome";

###
#################################################################################################