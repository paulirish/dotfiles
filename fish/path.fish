

# Read from ~/.paths  and populate PATH based on that. reversed to ensure priority goes to top of file.
for line in (tac ~/.paths  | sed 's|#.*||' | sed 's/^[ \t]*//;s/[ \t]*$//' | string split -n "\n")
  # skip comments
  if test (string sub --length 1 "$line") = "#"
      continue  
  end

  set expanded_line (string replace '$HOME' "$HOME" (string replace '~' "$HOME" "$line"))

  # Hmm.. I previously said this existence check excludes some important things but now i'm not sure.  
  if test -d "$expanded_line" -o -L "$expanded_line"
    # --global works like normal PATH additions in bash. but default is --universal which seems like more fun. maybe try that out
    #  with universal i wouldnt need to do this on every shell startup. I don't know exactly when i do it, then... 
    fish_add_path --global "$expanded_line"
  else
    # echo "Warning: Path '$expanded_line' does not exist or is not a directory/symlink. Skipping." >&2
  end
end
