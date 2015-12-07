
# grab my many PATH from my ~/.extra file
set -l PATH_DIRS (cat ~/.extra | grep "^PATH" | sed "s/PATH=//" | sed "s/\\\$PATH://")

for path_dir in (string split \n $PATH_DIRS)
 	if test -d "$path_dir"
    	set path_string $path_dir $path_string
  	end
end


