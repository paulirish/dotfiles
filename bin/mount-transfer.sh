#!/usr/bin/env bash

udisksctl unlock -b /dev/${USB_DRIVE}

udisksctl mount -b /dev/mapper/luks-dd300600-f3ac-4536-b7bc-b99358a3a588
