
# compile takes a while to get going. and we dont want to set priority on the wrong process??
# or maybe it'll all work out fine
sleep 20

set -l IFS
set -l ps_aux_output (ps aux | grep compiler_proxy | grep -v grep)
set -l pgrep_output (pgrep compiler_proxy | head -n1)

echo "
ps_aux:
$ps_aux_output

Now Renicing process $pgrep_output ...
"

renice +15 -p (pgrep compiler_proxy | head -n1)

