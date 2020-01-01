#!/usr/bin/env bash

USB_DRIVE=sdb

udisksctl unlock -b /dev/${USB_DRIVE}

udisksctl mount -b /dev/mapper/luks-6cdbb613-fbd2-4dce-9969-559a99cb8ce1
