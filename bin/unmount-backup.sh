#!/usr/bin/env bash

USB_DRIVE=sdb

udisksctl unmount -b /dev/mapper/luks-6cdbb613-fbd2-4dce-9969-559a99cb8ce1

udisksctl lock -b /dev/${USB_DRIVE}
