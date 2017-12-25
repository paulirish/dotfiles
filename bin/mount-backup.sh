#!/usr/bin/env bash

udisksctl unlock -b /dev/sdb1

udisksctl mount -b /dev/mapper/luks-1fbf7ede-5256-494b-bbf3-040ec91c8bdd
