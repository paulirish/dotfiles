#!/usr/bin/env python

import os
import glob
from os import path
from glob import glob
import re

def getFixedFileName(originalFileName):
  if re.search("([A-za-z0-9\s\-+]+)\.mp3$", originalFileName) is None:
    return False, ""

  fixedFileName = re.sub(r'[A-za-z0-9\s\-+]+\.mp3$', '', originalFileName)
  return True, f'{fixedFileName}.mp3'

currentDir = os.getcwd()

filesToFix = glob(currentDir + "/*.mp3")

for filePath in filesToFix:
  fileName = path.split(filePath)[1]
  match, fixedFileName = getFixedFileName(fileName)
  if match == False:
    continue

  answer = input(f'Rename "{fileName}" to "{fixedFileName}"? Enter: y,n,c')
  if answer == "n":
    continue
  elif answer == "y":
    os.rename(path.join(currentDir, fileName), path.join(currentDir, fixedFileName))
  else:
    break


