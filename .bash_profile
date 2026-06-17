# shellcheck shell=bash

# ------------------------------------------------------------------------------
# HOW IT WORKS:
#
#                                         START SHELL
#                                              |
#                    +-------------------------+-------------------------+
#                    |                         |                         |
#             [ LOGIN SHELL ]         [ INTERACTIVE SHELL ]     [ NON-INTERACTIVE SHELL ]
#          (e.g. SSH, Terminal          (e.g. Opening a new       (e.g. scp, rsync, cron,
#           Startup/Login)                 Terminal tab)             automated scripts)
#                    |                         |                         |
#                    v                         v                         v
#             Reads: .bash_profile      Reads: .bashrc            Reads: (Nothing, usually)
#                    |                         |                         |
#                    +------------+------------+                         |
#                                 |                                      |
#                                 v                                      v
#                           [ EXIT SHELL ] <-----------------------------+
#
#
# WHY WE DO IT LIKE THIS:
#
#         .bash_profile                                .bashrc
#         (The Entry Point)                          (The Engine Room)
#     +-----------------------+              +---------------------------------------+
#     |                       |              |  1. INTERACTIVE GUARD                 |
#     |  1. Minimal logic     |              |     (Exit early if not interactive)   |
#     |                       |              |     [[ $- != *i* ]] && return         |
#     |  2. Source .bashrc    |----------->  |                                       |
#     |     if it exists      |              |  2. SET PATH & ENVIRONMENT            |
#     |                       |              |                                       |
#     +-----------------------+              |  3. SOURCE COMPONENTS                 |
#                                            |     - .aliases, .functions, etc.      |
#                                            |                                       |
#                                            |  4. SHELL INTEGRATIONS                |
#                                            |     - prompt, fzf, etc.               |
#                                            +---------------------------------------+
# ------------------------------------------------------------------------------

# .bash_profile is executed for LOGIN shells.
# We keep it minimal and just source .bashrc where all the configuration lives.

if [ -f ~/.bashrc ]; then
   . ~/.bashrc
fi
