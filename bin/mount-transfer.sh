#!/usr/bin/env bash

udisksctl unlock -b /dev/${USB_DRIVE}

udisksctl mount -b /dev/mapper/luks-0e34bc5f-4b79-4c09-9238-a81a95b47952
