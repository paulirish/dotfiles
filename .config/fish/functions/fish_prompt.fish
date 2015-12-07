function prompt_git_status --description 'Write out the git status'
  ## early exit for Chromium & Blink repo, as the dirty check takes ~5s
  set -l repo_info (command git rev-parse --git-dir --is-inside-git-dir --is-bare-repository --is-inside-work-tree --short HEAD ^/dev/null)
  test -n "$repo_info"; or return
  printf ' on%s ' (__fish_git_prompt)
end

function _git_current_branch -d "Output git's current branch name"
  begin
    git symbolic-ref --quiet --short HEAD; or \
    git describe --all --exact-match HEAD; or \
    git rev-parse --short HEAD; or '(unknown)'
  end ^/dev/null | sed -e 's|^refs/heads/||'
end


function fish_prompt --description 'Write out the prompt'

  echo "" # blank line

  set last_status $status

  # HACK: workaround to force new sessions not to display dimmed;
  # prompt seems to be called multiple times which makes our change detection logic ineffective,
  # comparing the time attempts to detect such cases
  set date (date)

  # set default colors
  set user_color $fish_color_user
  set host_color $fish_color_host
  set cwd_color $fish_color_cwd

  # get current values
  set cur_user (whoami)
  set cur_host (hostname -s)
  set cur_cwd (echo $PWD | sed -e "s|^$HOME|~|" -e 's|^/private||')

  # check changes and dim color if no change
  if test "$fish_prompt_last_date" != $date
    if test "$fish_prompt_last_user" = $cur_user
      set user_color $fish_color_dimmed
    end

    if test "$fish_prompt_last_host" = $cur_host
      set host_color $fish_color_dimmed
    end

    if test "$fish_prompt_last_cwd" = $cur_cwd
      set cwd_color $fish_color_dimmed
    end
  end

  # Speed up prompt for Chromium repo, by ignoring dirtyState
  if test "$fish_prompt_last_cwd" != $cur_cwd
      switch (echo git config --get remote.origin.url)
        case "*chromium.googlesource.com*"
          git config bash.showDirtyState false
      end
  end

  # save "last" values
  set -g fish_prompt_last_user $cur_user
  set -g fish_prompt_last_host $cur_host
  set -g fish_prompt_last_cwd $cur_cwd

  # HACK continuation (see above)
  set -g prompt_last_date $date

  # # write prompt
  # if test [ cur_user = $default_user ]
  #   set_color $user_color;           echo -n $cur_user
  # end
  # #if default_machine something something
  #   set_color $fish_color_separator; echo -n '@'
  #   set_color $host_color;           echo -n $cur_host

  # set_color $fish_color_separator; echo -n ':'

  set_color $cwd_color;            echo -n $cur_cwd

  set_color normal;                prompt_git_status


  echo
  if not test $last_status -eq 0
    set_color $fish_color_error
  end
  echo -n '▸ '

  set_color normal
end
