

# Read from ~/.paths and ~/.paths.local and populate PATH based on that.
cat ~/.paths ~/.paths.local 2>/dev/null | grep -v "^#" | while read -r a_path
 echo "$a_path"
  # if test -d "$a_path"
    fish_add_path "$a_path"
  # end
end

