#!/usr/bin/env bash
#
# wal - Generate and change colorschemes on the fly.
#
# Created by Dylan Araps

# Speed up script by not using unicode.
sys_locale="$LANG"
export LC_ALL=C
export LANG=C

shopt -s nullglob nocasematch

# Internal variables.
cache_dir="${HOME}/.cache/wal"
pid_file="${cache_dir}/wal.pid"
newline=$'\n'
color_count=16
os="$(uname)"

# GENERATE COLORSCHEME


rand_img() {
    # Make glob fails silent.
    shopt -s nullglob

    # Create an array of images and exclude the current wallpaper.
    files=("${wal%/}"/*.{png,jpg,jpeg,jpe})
    files=("${files[@]/"$old_wall"}")

    # If no files were found, exit.
    if ((${#files[@]} == 0)); then
        out "error: No images were found, exiting..."
        exit 1
    fi

    # Reset glob.
    shopt -u nullglob

    # Pick a random image.
    wal="${files[RANDOM % ${#files[@]}]}"

    # Set the image to the first in the directory if the shuffle failes.
    [[ ! -f "$wal" ]] && wal="${files[0]}"

    out "image: Using image, $wal"
}

get_colors() {
    # Only run if -i used, skip for -f since $wal not set and $cache_file already set.
    if [[ -n "$wal" ]]; then
        # Check for imagemagick.
        if ! type -p convert >/dev/null 2>&1; then
            out "error: imagemagick not found, exiting..."
            out "error: wal requires imagemagick to function."
            exit 1
        fi

        # Create colorscheme dir.
        mkdir -p "${cache_dir}/schemes"

        # Get the current wallpaper.
        [[ -f "${cache_dir}/wal" ]] && old_wall="$(< "${cache_dir}/wal")"

        # Shuffle the image.
        [[ -d "$wal" ]] && rand_img

        # If the wallpaper doesn't exist, use the current one.
        [[ ! -f "$wal" ]] && wal="$old_wall"

        # Store cached colorscheme as 'dir-to-img.jpg'
        cache_file="${cache_dir}/schemes/${wal//\//_}"

        # Cache the wallpaper name
        printf "%s\n" "$wal" > "${cache_dir}/wal"
    fi

    # Generate 16 colors from the image and save them to a file.
    if [[ -f "$cache_file" ]]; then
        colors=($(< "$cache_file"))
    else
        colors=($(convert "${wal}"  +dither -colors $color_count -unique-colors txt:- | grep -E -o " \#.{6}"))

        # If imagemagick finds less than 16 colors, use a larger source number of colors.
        while (( "${#colors[@]}" <= 15 )); do
            colors=($(convert "${wal}"  +dither -colors "$((color_count + ${index:-2}))" -unique-colors txt:- | grep -E -o " \#.{6}"))
            ((index++))
            out "colors: Imagemagick couldn't generate a $color_count color palette, trying a larger palette size ($((color_count + index)))."

            # Quit the loop if we're taking too long.
            ((index == 10)) && break
        done

        # Cache the scheme.
        printf "%s\n" "${colors[@]}" > "$cache_file"
    fi

    out "colors: Generated colorscheme"
}


# SET COLORSCHEME


set_color() {
    sequences+="\033]4;${1};${2}\007"
    sh_colors+="color${1}='${2}'${newline}"
    scss_colors+="\$color${1}: ${2};${newline}"
    firefox_colors+="  --color${1}: ${2};${newline}"
    putty_colors+="\"Colour${1}\"=\"$(convert_to_rgb "${2}")\"${newline}"

    # Set *.color and *color to fix issues with Polybar.
    x_colors+="*color${1}: ${2}${newline}"
    x_colors+="*.color${1}: ${2}${newline}"

    plain+="${2}${newline}"
}

set_special() {
    sequences+="\033]${1};${2}\007"

    # Set X colors
    case "$1" in
        10)
            x_colors+="URxvt*foreground: ${2}${newline}"
            x_colors+="XTerm*foreground: ${2}${newline}"
        ;;

        11)
            x_colors+="URxvt*background: ${2}${newline}"
            x_colors+="XTerm*background: ${colors[0]}${newline}"
        ;;

        12)
            x_colors+="URxvt*cursorColor: ${2}${newline}"
            x_colors+="XTerm*cursorColor: ${colors[0]}${newline}"
        ;;
    esac
}

send_sequences() {
    # Create string of escape sequences to send to the terminals.
    set_special 10  "${colors[15]}"
    set_special 11  "${alpha:+[${alpha}]}${colors[0]}"
    set_special 12  "${colors[15]}"
    set_special 13  "${colors[15]}"
    set_special 14  "${alpha:+[${alpha}]}${colors[0]}"

    # This escape sequence doesn't work in VTE terminals.
    [[ "$vte" != "on" ]] && set_special 708 "${alpha:+[${alpha}]}${colors[0]}"

    set_color 0  "${colors[0]}"

    # If $extended_colors isn't set, only use the bright colors.
    if [[ -z "$extended_colors" ]]; then
        set_color 1  "${colors[9]}"
        set_color 2  "${colors[10]}"
        set_color 3  "${colors[11]}"
        set_color 4  "${colors[12]}"
        set_color 5  "${colors[13]}"
        set_color 6  "${colors[14]}"
        set_color 7  "${colors[15]}"

        # Create a comment color based on the brightness of the background.
        case "${colors[0]:1:1}" in
            [0-1]) set_color 8 "#666666" ;;
            2)     set_color 8 "#757575" ;;
            [3-4]) set_color 8 "#999999" ;;
            5)     set_color 8 "#8a8a8a" ;;
            [6-9]) set_color 8 "#a1a1a1" ;;
            *)     set_color 8 "${colors[7]}" ;;
        esac
    else  # $extended_colors="on"
        set_color 1  "${colors[1]}"
        set_color 2  "${colors[2]}"
        set_color 3  "${colors[3]}"
        set_color 4  "${colors[4]}"
        set_color 5  "${colors[5]}"
        set_color 6  "${colors[6]}"
        set_color 7  "${colors[7]}"
        set_color 8  "${colors[8]}"
    fi

    set_color 9  "${colors[9]}"
    set_color 10 "${colors[10]}"
    set_color 11 "${colors[11]}"
    set_color 12 "${colors[12]}"
    set_color 13 "${colors[13]}"
    set_color 14 "${colors[14]}"
    set_color 15 "${colors[15]}"

    # Set a black color that isn't affected by bold highlighting.
    sequences+="\033]4;66;${colors[0]}\007"
    x_colors+="*color66: ${colors[0]}${newline}"

    # Directing output to /dev/pts/* allows you to send output to all open terminals
    # on your system.
    for term in /dev/pts/[0-9]*; do
        [[ -w "$term" ]] && printf "%b" "$sequences" > "$term" &
    done

    out "colors: Set terminal colors"
}

set_wallpaper() {
    if [[ -z "$nowall" ]]; then
        # Get desktop environment.
        de="${XDG_CURRENT_DESKTOP}"

        # Fallback to using xprop.
        [[ -z "$de" ]] && type -p xprop >/dev/null 2>&1 && \
            de="$(xprop -root | awk '/KDE_SESSION_VERSION|^_MUFFIN|xfce4|xfce5/')"

        case "$de" in
            *"MUFFIN"* | *"Cinnamon"*) gsettings set org.cinnamon.desktop.background picture-uri "file://${wal}" ;;
            *"MATE"*) gsettings set org.mate.background picture-filename "$wal" ;;
            *"GNOME"*) gsettings set org.gnome.desktop.background picture-uri "file://${wal}" ;;

            *"XFCE"*)
                xfconf-query --channel xfce4-desktop --property /backdrop/screen0/monitor0/image-path --set "$wal" 2>/dev/null
                xfconf-query --channel xfce4-desktop --property /backdrop/screen0/monitor0/workspace0/last-image --set "$wal" 2>/dev/null
            ;;

            *)
                if type -p feh >/dev/null; then
                    feh --bg-fill "$wal"

                elif type -p nitrogen >/dev/null; then
                    nitrogen --set-zoom-fill "$wal"

                elif type -p bgs >/dev/null; then
                    bgs "$wal"

                elif type -p hsetroot >/dev/null; then
                    hsetroot -fill "$wal"

                elif type -p habak >/dev/null; then
                    habak -mS "$wal"

                elif [[ "$os" == "Darwin" ]]; then
                    osascript -e 'tell application "Finder" to set desktop picture to POSIX file "'"${wal/#\~/$HOME}"\"

                else
                    gsettings set org.gnome.desktop.background picture-uri "file://${wal}"
                fi
            ;;
        esac

        out "wallpaper: Set new wallpaper"
    else
        out "wallpaper: '-n' was used, skipping wallpaper"
    fi
}


# EXPORT COLORS


export_sequences() {
    printf "%s" "$sequences"
    out "export: Exported escape sequences"
}

export_envar() {
    printf "%s\n%s" "# wal - Colors generated by wal " "$sh_colors"
    out "export: Exported sh colors"
}

export_scss() {
    printf "%s\n%s" "// wal - Colors generated by wal " "$scss_colors"
    out "export: Exported scss color variables"
}

export_firefox() {
    printf "%s\n" ":root {${newline}${firefox_colors}}"
    out "export: Exported Firefox color variables"
}

export_rofi() {
    rofi_bg="argb:${alpha:-FF}${colors[0]/\#}"
    x_colors+="rofi.color-window: ${rofi_bg}, ${colors[0]}, ${colors[10]}${newline}"
    x_colors+="rofi.color-normal: ${rofi_bg}, ${colors[15]}, ${colors[0]}, ${colors[10]}, ${colors[0]}${newline}"
    x_colors+="rofi.color-active: ${rofi_bg}, ${colors[15]}, ${colors[0]}, ${colors[10]}, ${colors[0]}${newline}"
    x_colors+="rofi.color-urgent: ${rofi_bg}, ${colors[9]}, ${colors[0]}, ${colors[9]}, ${colors[15]}${newline}"
}

export_emacs() {
    x_colors+="emacs*background: ${colors[0]}${newline}"
    x_colors+="emacs*foreground: ${colors[15]}${newline}"
}

export_plain() {
    printf "%s" "$plain"
    out "export: Exported plain colors"
}

export_putty() {
    printf "%s\n\n" "Windows Registry Editor Version 5.00"
    printf "%s\n" "[HKEY_CURRENT_USER\\Software\\SimonTatham\\PuTTY\\Sessions\\Wal]"
    printf "%s" "$putty_colors"
    out "export: Exported putty colors"
}

export_xrdb() {
    printf "%s" "$x_colors"
    out "export: Exported xrdb colors"
}

export_colors() {
    export_sequences > "${cache_dir}/sequences"
    export_envar     > "${cache_dir}/colors.sh"
    export_scss      > "${cache_dir}/colors.scss"
    export_firefox   > "${cache_dir}/firefox.css"
    export_rofi
    export_emacs
    export_plain     > "${cache_dir}/colors"
    export_xrdb      > "${cache_dir}/colors.xresources"
    export_putty     > "${cache_dir}/colors.reg"
}


# RELOAD COLORSCHEME


reload_colors() {
    # Source the current sequences
    sequences="$(< "${cache_dir}/sequences")"

    # If vte mode was used, remove the problem sequence.
    [[ "$vte" == "on" ]] && sequences="${sequences/??\]708\;\#??????}"

    printf "%b" "$sequences"
    exit
}

reload_env() {
    # Reload i3 if running.
    pgrep i3 && i3-msg reload &
}

reload_xrdb() {
    [[ "$alpha" ]] && x_colors+="URxvt.depth: 32${newline}"

    # Merge the colors into the X db so new terminals use them.
    xrdb -merge >/dev/null 2>&1 <<< "$x_colors" && \
        out "colors: Merged colors with X env"
}


# OTHER


convert_to_rgb() {
    red="$((16#${1:1:2}))"
    green="$((16#${1:3:2}))"
    blue="$((16#${1:5:2}))"

    printf "%s" "${red},${green},${blue}"
}

cleanup_pid () {
    rm "$pid_file"
}

kill_old_wal () {
    # Create Cache Dir
    mkdir -p "${cache_dir}/"

    # Kill old 'wal' instances found at $pid_file.
    if [[ -f "$pid_file" ]]; then
      old_pid="$(< "${pid_file}")"
      pkill -TERM -P "$old_pid" 2>/dev/null
      kill "$old_pid" 2>/dev/null
    fi

    # Log our pid into the file
    printf "%s" "$$" > "$pid_file"
}

get_full_path() {
    # Go to the relative PATH.
    if ! cd "${1%/*}"; then
        printf "%s\n" "Error: Directory '$1' doesn't exist or is inaccessible" >&2
        printf "%s\n" "       Check that the directory exists or try another directory." >&2
        exit 1
    fi

    # Final directory.
    img_dir="$(pwd -P)"
    img="${1/*\/}"

    if [[ -e "${img_dir}/${img}" ]]; then
        printf "%s\n" "${img_dir}/${1/*\/}"

    else
        printf "%s\n" "Error: File: '${img_dir}/${img}' not found." >&2
        printf "%s\n" "       Check that the file exists or try another file." >&2
        exit 1
    fi
}

out() {
    [[ "$quiet" != "on" ]] && printf "%s\n" "$1" >&2
}

usage() { printf "%s" "\
Usage: wal [OPTION] -i '/path/to/dir'
Example: wal -i '${HOME}/Pictures/Wallpapers/'
         wal -i '${HOME}/Pictures/1.jpg'

Flags:
  -a                      Set terminal background transparency. *Only works in URxvt*
  -c                      Delete all cached colorschemes.
  -f '/path/to/colors'    Load colors directly from a colorscheme file.
  -h                      Display this help page.
  -i '/path/to/dir'       Which image to use.
     '/path/to/img.jpg'
  -n                      Skip setting the wallpaper.
  -o 'script_name'        External script to run after 'wal'.
  -q                      Quiet mode, don't print anything.
  -r                      Reload current colorscheme.
  -t                      Fix artifacts in VTE Terminals. (Termite, xfce4-terminal)
  -x                      Use extended 16-color palette.

"
}

get_args() {
    while getopts ":a:cf:hi:no:qrtx" opt; do
        case "$opt" in
            "a") alpha="$OPTARG" ;;
            "c") rm -rf "${cache_dir}/schemes"; exit ;;
            "f")
                [[ -f "$OPTARG" ]] && cache_file="$OPTARG"
                [[ -z "$cache_file" ]] && cache_file="$(get_full_path "$OPTARG")"
                nowall="on"
            ;;
            "h") usage; exit 1 ;;

            "i")
                [[ -f "${PWD}/${OPTARG/*\/}" ]] && wal="${PWD}/${OPTARG/*\/}"
                [[ -z "$wal" ]] && wal="$(get_full_path "$OPTARG")"
            ;;

            "n") nowall="on" ;;
            "o") external_script=("$OPTARG") ;;
            "q") quiet="on" ;;
            "r") reload="on" ;;
            "t") vte="on" ;;
            "x") extended_colors="on" ;;

            "?")
                printf "%s\n" "Invalid option: -$OPTARG" >&2
                exit 1
            ;;

            ":")
                printf "%s\n" "Option -$OPTARG requires an argument." >&2
                exit 1
            ;;
        esac
    done

    # Reload colors.
    [[ "$reload" == "on" ]] && reload_colors

    # Check if -i was used.
    if [[ -z "$wal" && -z "$cache_file" || -n "$wal" && -n "$cache_file" ]]; then
        printf "%s\n" "Error: 'wal' must be run with either '-i' or '-f'" >&2
        printf "%s\n" "Try 'wal -h' for more information." >&2
        exit 1
    fi
}


# FINISH UP


main () {
    get_args "$@"
    kill_old_wal

    get_colors
    send_sequences
    set_wallpaper
    export_colors
    reload_xrdb
    reload_env >/dev/null 2>&1

    # Set the locale back to the original value.
    export LC_ALL="$sys_locale"

    # Execute custom script.
    [[ "${external_script[0]}" ]] && bash -c "${external_script[@]}"

    cleanup_pid

}

main "$@"