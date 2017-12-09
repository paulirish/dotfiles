i3lock -f && dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 \
    "org.freedesktop.login1.Manager.Suspend" boolean:true

#dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 \
#    "org.freedesktop.login1.Manager.Reboot" boolean:true

#dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 \
#    "org.freedesktop.login1.Manager.PowerOff" boolean:true
