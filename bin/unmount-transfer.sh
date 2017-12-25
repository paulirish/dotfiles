#!/usr/bin/env bash

udisksctl unmount -b /dev/mapper/luks-0e34bc5f-4b79-4c09-9238-a81a95b47952

udisksctl lock -b /dev/sdb1
