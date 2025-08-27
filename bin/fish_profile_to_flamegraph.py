#!/usr/bin/env python3

import re
import sys
from collections import defaultdict

"""
Usage

   a oneliner:
set fn "/tmp/fish_profile_$(date +%I%p_%M_%S).svg"; fish --profile-startup /tmp/fish.profile -i -c exit && $HOME/bin/fish_profile_to_flamegraph.py | $HOME/code/temp/FlameGraph/flamegraph.pl --width 1400 > "$fn" &&  open "$fn";

   or two lines: one to profile, the other to generate flamegraph:
fish --profile-startup /tmp/fish.profile -i -c exit
set fn "/tmp/fish_profile_$(date +%I%p_%M_%S).svg"; fish_profile_to_flamegraph.py | $HOME/code/temp/FlameGraph/flamegraph.pl --width 1400 > "$fn"; open "$fn";

"""

def profiling_to_flamegraph(profiling_filepath="/tmp/fish.profile"):
    """
    Transforms fish shell profiling output into a format suitable for generating a flamegraph.
    Args:
        profiling_filepath: Path to the fish shell profiling output file.
    Returns:
        A string representing the flamegraph data.
    """

    stack_times = defaultdict(int)
    current_stack = []

    try:
        with open(profiling_filepath, "r") as f:
            # Read the entire file content
            file_content = f.read()

            # dont have any wrapping to newlines
            file_content = re.sub(r"\n([^\d]|#.*)", r" \1", file_content)

            for line in file_content.splitlines():
                match = re.match(r"^(\d+)\s+(\d+)\s+(-*>) (.*)$", line)
                if match:
                    time, _, indentation, command = match.groups()
                    time = int(time)
                    depth = indentation.count('-')

                    # Adjust the stack based on indentation
                    while len(current_stack) > depth:
                        current_stack.pop()
                    current_stack = current_stack[:depth]

                    # Add the current command to the stack
                    current_stack.append(command)

                    # Update the time for the current stack
                    stack_times[tuple(current_stack)] += time
                else:
                    print("nah", line)

    except FileNotFoundError:
        print(f"Error: Profiling output file not found at {profiling_filepath}")
        return ""

    # Generate flamegraph output
    flamegraph_lines = []
    for stack, time in stack_times.items():
        flamegraph_lines.append(f"{';'.join(stack)} {time}")

    return "\n".join(flamegraph_lines)

# Example Usage:
flamegraph_data = profiling_to_flamegraph() # Reads from /tmp/fish.profile by default

if flamegraph_data:
    print(flamegraph_data)

