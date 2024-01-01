#!/bin/bash

# "Change keyboard layout in" "~/.config/hypr/hyprland.conf" " " \

yad --width=530 --height=550 \
--center \
--fixed \
--title="Hyprland Keybindings" \
--no-buttons \
--list \
--column=Key: \
--column=Description: \
--column=Command: \
--timeout=60 \
--timeout-indicator=right \
"+Enter" "Terminal" "" \
"+Shift+Enter" "Filemanager" "Nautilus" \
"+d" "Application Menu" "(rofi)" \
"+s/+-" "Toggle scratchpad" "Special workspace" \
"+b" "Brave" "Open Browser" \
"+f" "Fullscreen" "Toggles to full screen" \
"+j" "Toggle split" "dwindle" \
"+q" "close focused app" "(kill)" \
"+p" "Dwindle effect" "pseudo" \
"+s" "Suspend" "Lock screen and sleep" \
"+Space" "run app" "Run app by name" \
"+Shift+d" "Full Launcher" "(nwggrid)" \
"+Shift+e" "Exit menu" "wlogout" \
"+Shift+c" "Change wallpaper" "(wpaperd)" \
"+Shift+p" "Clipboard" "Paste from clipboard" \
"+Shift+f" "Fullscreen" "Toggles to full screen" \
"+Shift+q" "Quit" "Exit program" \
"+Shift+l" "Lock screen" "Locks the screen with swaylock" \
"+Shift+s/+Shift+-" "Move to scratchpach" "Special workspace" \
"+Shift+p" "Screenshot region" "Select a region of the screen for creating a screenshot" \
"+mouse_down" "Next workspace" "Move to next workspace" \
"+mouse_up" "Previous workspace" "Move to previous workspace" \
"+left_mouse" "Move window" "" \
"+right_mouse" "Resize window" "" \
"Alt+r" "Resize mode window" "" \
"" "" "     Window closed in 60 sec."\
