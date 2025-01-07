

# Read from ~/.paths and ~/.paths.local and populate PATH based on that.
for line in (cat ~/.paths ~/.paths.local 2>/dev/null | string split -n "\n")
  # skip comments
  if test (string sub --length 1 "$line") = "#"
      continue  
  end

  if test -d "$line" -o -L "$line"
    fish_add_path "$line"
  end
end
