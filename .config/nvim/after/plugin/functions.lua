vim.cmd [[
  function! LoadLocalVimrc()
    let b:currentDir = getcwd()

    " We don't want to resurce the .vimrc from the home directory
    " or from our dotfiles directory
    let isHomeDir = b:currentDir == expand('~')
    let isDotfiles = stridx(b:currentDir, 'dotfiles') > 0
    if (isHomeDir || isDotfiles)
      return
    endif

    let b:localVimrc = "./.vimrc"
    if (filereadable(b:localVimrc))
      "echo "Load local .vimrc from ".b:currentDir
      execute "source ".b:localVimrc
    endif
  endfunction

  call LoadLocalVimrc()
]]
