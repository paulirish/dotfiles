

# Read from ~/.paths  and populate PATH based on that.
for line in (string split -n "\n" < ~/.paths)
  # skip comments
  if test (string sub --length 1 "$line") = "#"
      continue  
  end
  # testing first (if test -d "$line" -o -L "$line") seems nice but excludes some important thigns

  # --global works like normal PATH additions in bash. but default is --universal which seems like more fun. maybe try that out
  fish_add_path --global "$line"
end
