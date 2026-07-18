#!/bin/bash
# Auto-diagnose script for Cloudtop hanging issues.

echo "========================================"
echo "   Cloudtop Diagnosis Report"
echo "   Time: $(date)"
echo "========================================"

echo ""
echo "--- 1. System Load & Uptime ---"
uptime

echo ""
echo "--- 2. Memory Usage ---"
free -h
if [ -f /proc/sys/vm/swappiness ]; then
  echo "Swappiness: $(cat /proc/sys/vm/swappiness)"
fi

echo ""
echo "--- 3. Top 5 Memory Consumers ---"
ps axo user,pid,%cpu,%mem,vsz,rss,stat,cmd --sort=-%mem | head -n 6

echo ""
echo "--- 4. Top 5 CPU Consumers ---"
ps axo user,pid,%cpu,%mem,vsz,rss,stat,cmd --sort=-%cpu | head -n 6

echo ""
echo "--- 5. FUSE Mount Responsiveness ---"
for mount in /google/cog /google/src /google/data; do
  if [ -d "$mount" ]; then
    if ! timeout 2 ls "$mount" >/dev/null 2>&1; then
      echo "❌ WARNING: FUSE mount $mount is HUNG"
    else
      echo "✅ FUSE mount $mount is OK"
    fi
  else
    echo "ℹ️  FUSE mount $mount not present/active"
  fi
done

echo ""
echo "--- 6. Git / fsmonitor Status ---"
fs_count=$(pgrep -f 'git fsmonitor--daemon' | wc -l)
if [ "$fs_count" -gt 0 ]; then
  echo "⚠️  Found $fs_count git fsmonitor--daemon processes running:"
  ps -fp $(pgrep -f 'git fsmonitor--daemon')
else
  echo "✅ No active git fsmonitor--daemon processes."
fi

# Check if cssom repo has fsmonitor enabled
if [ -d "$HOME/code/cssom/.git" ]; then
  has_fs=$(git -C "$HOME/code/cssom" config --local core.fsmonitor 2>/dev/null)
  if [ "$has_fs" = "true" ]; then
    echo "⚠️  core.fsmonitor is ENABLED in ~/code/cssom"
  else
    echo "✅ core.fsmonitor is disabled (or not set) in ~/code/cssom"
  fi
fi

echo ""
echo "--- 7. Zombie Processes ---"
zombies=$(ps axo state,pid,cmd | grep '^[Z]' | wc -l)
if [ "$zombies" -gt 0 ]; then
  echo "⚠️  Found $zombies zombie processes:"
  ps axo state,pid,cmd | grep '^[Z]'
else
  echo "✅ No zombie processes."
fi

echo ""
echo "--- 8. Disk I/O Wait State (D state) ---"
d_state=$(ps axo state,pid,cmd | grep '^[D]' | wc -l)
if [ "$d_state" -gt 0 ]; then
  echo "⚠️  Found $d_state processes in D state (I/O wait):"
  ps axo state,pid,cmd | grep '^[D]'
else
  echo "✅ No processes in D state."
fi

echo "========================================"
