#!/usr/bin/env bash

udisksctl unmount -b /dev/mapper/luks-1fbf7ede-5256-494b-bbf3-040ec91c8bdd

udisksctl lock -b /dev/${USB_DRIVE}
