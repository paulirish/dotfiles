#!/usr/bin/env bash

udisksctl unlock -b /dev/${USB_DRIVE}

udisksctl mount -b /dev/mapper/luks-38884d72-18e6-439a-b180-56f32c5a60ae
