#!/usr/bin/env bash

udisksctl unmount -b /dev/mapper/luks-dd300600-f3ac-4536-b7bc-b99358a3a588

udisksctl lock -b /dev/${USB_DRIVE}
