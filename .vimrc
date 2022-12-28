set encoding=utf-8

" some special configurations for editing my dotfiles
autocmd! bufwritepost .vimrc source %
au BufWinLeave .vimrc mkview
au BufWinEnter .vimrc silent loadview

set nocompatible
filetype off

" Activate the internal matchit plugin
filetype plugin on
runtime macros/matchit.vim

set shell=zsh

set path+=** " Search down into subfolders
set wildmenu " Display all matching files when tab complete

call plug#begin('~/.vim/plugged')

Plug 'pearofducks/ansible-vim'              " Support for Ansible
Plug 'majutsushi/tagbar'                    " displays tags in a window
Plug 'pangloss/vim-javascript'              " Vastly improved Javascript indentation and syntax support
Plug 'mxw/vim-jsx'                          " React JSX syntax highlighting and indenting for vim
Plug 'airblade/vim-gitgutter'               " shows a git diff in the gutter
Plug 'ap/vim-css-color'                     " Preview colours in source code while editing
Plug 'hail2u/vim-css3-syntax'               " CSS3 syntax
Plug 'easymotion/vim-easymotion'            " Vim motions on speed
Plug 'elzr/vim-json'                        " Improve JSON support: Distinct highlighting of keywords vs values
Plug 'evanleck/vim-svelte'                  " Support for Svelte
Plug 'fatih/vim-go'                         " Improving the support for Go in vim
Plug 'gorkunov/smartpairs.vim'              " Completion Enchanted visual (selection) mode for Vim
Plug 'ekalinin/Dockerfile.vim'              " Syntaxhighlighting for Dockerfiles
Plug 'junegunn/fzf'
Plug 'junegunn/fzf.vim'                     " Use fzf in VIM
Plug 'junegunn/goyo.vim'                    " Writing text with Zen mode (distaction free)
Plug 'jvirtanen/vim-hcl'                    " Syntaxhighlighting  for Hashicorp language (Terraform)
Plug 'kopischke/vim-fetch'                  " Make Vim handle line and column numbers in file names
Plug 'liuchengxu/vim-which-key'             " Show the current leader mappings
Plug 'vim-airline/vim-airline'              " statusline plugin for vim
Plug 'vim-airline/vim-airline-themes'       " Themes for vim-airline
Plug 'MarcWeber/vim-addon-mw-utils'         " interpret a file by function and cache file automatically (required by ...)
Plug 'mattn/emmet-vim'                      " Provides support for Emmet in vim
Plug 'machakann/vim-highlightedyank'        " Make the yanked region visible
Plug 'mhinz/vim-startify'                   " Replace the orginal start-screen with MRU and bookmarks
Plug 'mileszs/ack.vim'                      " Provides support for ack and the SilverlightSearcher in vim
Plug 'neoclide/coc.nvim', {'branch': 'release'} " Intellisense engine for vim8 & neovim, full language server protocol support as VSCode
Plug 'NLKNguyen/papercolor-theme'           " My prefered theme for working in the presentation (light) mode
Plug 'rust-lang/rust.vim'                   " Support for Rust in VIM
Plug 'scrooloose/nerdtree'                  " A tree explorer plugin for vim
Plug 'Xuyuanp/nerdtree-git-plugin'          " A plugin of NERDTree showing git status
Plug 'scrooloose/nerdcommenter'             " plugin for intensely commenting
Plug 'sgur/vim-editorconfig'                " Yet another EditorConfig plugin for vim
Plug 'svermeulen/vim-easyclip'              " Simplified clipboard functionality for Vim
Plug 'szw/vim-maximizer'                    " Maximizes and restores the current window in Vim.
Plug 'terryma/vim-multiple-cursors'         " This True Sublime Text style multiple selections for Vim
Plug 'tomtom/tlib_vim'                      " Some utility functions for VIM - Required from ???
Plug 'tpope/vim-dispatch'                   " Asynchronous build and test dispatcher
Plug 'tpope/vim-fugitive'                   " A Git wrapper
Plug 'tpope/vim-repeat'                     " enable repeating supported plugin maps with \".\"
Plug 'tpope/vim-surround'                   " surround.vim: quoting/parenthesizing made simple
Plug 'tpope/vim-unimpaired'                 " Pairs of handy bracket mappings
Plug 'zirrostig/vim-schlepp'                " Moving blocks of text easily
Plug 'prettier/vim-prettier', { 'for': ['javascript', 'svelte', 'less', 'yaml', 'markdown' ]}

call plug#end()

filetype plugin indent on

syntax on

let loaded_matchparen = 1 " turns the automatic matching for ()[]{} of. Turn it on with DoMatchParen

set cursorline " highlight current line

set list
set listchars=space:·,trail:·,precedes:«,extends:»,eol:↲,tab:▸\

" No bullshit folding magic
set foldmethod=indent
set foldlevel=99
set foldnestmax=6

" When opening the file, unfold all. Fold all with zM
"au BufRead * normal zR

" General option
let mapleader = "," " rebind <Leader> key
set wildmode=list:longest " make TAB behave like in a shell
set autoread " reload file when changes happen in other editors
set tags=./tags

set mouse=a
if &term =~ '^screen'
  " tmux knows the extended mouse mode
  set ttymouse=xterm2 " This gives the support for resizing windows with the mouse
endif

set bs=2 " make backspace behave like normal again

set wildignore+=*.pyc
set wildignore+=*/_build/*
set wildignore+=coverage
set wildignore+=.cache
set wildignore+=node_modules
set wildignore+=deploy
set wildignore+=dist
set wildignore+=.DS_Store
set wildignore+=.git
set wildignore+=.vscode
set wildignore+=.idea
set wildignore+=.next
set wildignore+=obj,tags

" Disable stupid backup and swap files - they trigger too many events for file system watchers
set nobackup
set nowritebackup
set noswapfile

set history=700
set undolevels=700

" Define our defaults for the tabwdith
set tabstop=2
set softtabstop=2
set shiftwidth=2
set shiftround
set expandtab
command! -nargs=* SetNormalIndent set ts=2 sw=2 sts=2

" We want that undo is also possible after we reopened a file that was changed before
set undofile
set undodir=$HOME/.vim/undo " Dont forget to create this directory on your computer

set hlsearch
set incsearch
set ignorecase
set smartcase
set number

set nowrap " don't automatically wrap on load
set tw=100  " width of document (used by gd)
set fo-=t  " don't automatically wrap text when typing
command! -nargs=* Wrap set wrap linebreak nolist
command! -nargs=* NoWrap set nowrap nolinebreak list

" Settings for spellcecking
set spelllang=en_us
set spellfile=~/.vim/spell/en.utf-8.add

" Tell vim where to find the tags file
set tags+=tags

" Give more space for displaying messages.
set cmdheight=2

" Don't pass messages to |ins-completion-menu|.
set shortmess+=c

command! -nargs=* Wrap set wrap linebreak nolist
command! -nargs=* Nowrap set nowrap nolinebreak list

autocmd InsertEnter * :set nohlsearch " Turn search highlight of when going into the insert mode
autocmd BufReadPost .functions set syntax=sh
autocmd BufReadPost .aliases set syntax=sh

" Sometimes it's usefull to start immediately with typing when writing a commit message, sometimes not.
" autocmd FileType gitcommit 1 | startinsert
au FileType gitcommit set tw=100 " The default is 72 and for me it's mostly not enough

" Omnicomplete related stuff
set completeopt=longest,menuone
inoremap <c-space> <C-x><C-o>
inoremap <c-@> <C-x><C-o>

" ************* Begin custom functions  ************
" found here: http://stackoverflow.com/a/2170800/70778
function! OmniPopup(action)
    if pumvisible()
        if a:action == 'j'
            return "\<C-N>"
        elseif a:action == 'k'
            return "\<C-P>"
        endif
    endif
    return a:action
endfunction

" Awesome line number magic
function! NumberToggle()
  if(&relativenumber == 1)
    set norelativenumber
    set number
    highlight LineNr ctermfg=yellow
  else
    set relativenumber
    highlight LineNr ctermfg=green
  endif
endfunc

" Function to toggle on/off the locationlist
function! ToggleErrors()
  let old_last_winnr = winnr('$')
  lclose
  if old_last_winnr == winnr('$')
    lopen
  endif
endfunction

function! ToggleQuickFix()
  if empty(filter(getwininfo(), 'v:val.quickfix'))
      copen
  else
      cclose
  endif
endfunction

function! StrTrim(txt)
  return substitute(a:txt, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')
endfunction

" Use tig status direct from vim
function! s:tig_status()
  " Maybe it's necessary to go to the root directory of the current git
  " repository.
  !tig status
endfunction
command! TigStatus call s:tig_status()

function! TogglePresentationMode()
  if(&background == 'dark')
    set background=light
  else
    set background=dark
  endif
endfunction

function! ReplaceUmlaute()
  " Save cursor position
  let l:save = winsaveview()
  " Remove trailing whitespace
  %s/Ae/Ä/gIce
  %s/Oe/Ö/gIce
  %s/Ue/Ü/gIce
  %s/ae/ä/gIce
  %s/oe/ö/gIce
  %s/ue/ü/gIce
  " Move cursor to original position
  call winrestview(l:save)
  echo "Replaced all to Umlaute"
endfunction
" ************* End custom functions  ************

" ************* Begin custom keymappings ************
nmap <leader>l :set invlist<cr>
nnoremap <silent> <Space> @=(foldlevel('.')?'za':"\<Space>")<CR>
vnoremap <Space> zf

inoremap <silent><C-j> <C-R>=OmniPopup('j')<CR>
inoremap <silent><C-k> <C-R>=OmniPopup('k')<CR>

" Quicksave command
noremap <Leader>w :update<CR>
vnoremap <Leader>w <C-C>:update<CR>
inoremap <Leader>w <ESC>:update<CR>

" Quick quit command
noremap <Leader>e :quit<CR>

" Save current session reload with vim -S
noremap <Leader>s :mksession!<CR>

" Bind toggle hlsearch
noremap <Leader>h :set hlsearch!<CR>
noremap <silent> <BS> :set hlsearch!<CR>

" disable formatting when pasting large chunks of code
nmap <leader><F2> :set pastetoggle=<F2><CR>

" Show line number and toggle virtual line on/off
nnoremap <Leader>n :call NumberToggle()<CR>

" center the cursor vertically
":nnoremap <Leader>zz :let &scrolloff=999-&scrolloff<CR>

" Enable spell check
nnoremap ;s :set spell<CR>

" select all
nnoremap <Leader>a ggVG  

" easier formatting of paragraphs
"vmap Q gq
"nmap Q gqap

vnoremap < <gv  " better indentation
vnoremap > >gv  " better indentation

" resize window with leader key
" (it's still possible with ctrl+w +/- or ctrl+w </> )
map <Leader>vi :vertical resize +10<CR>
map <Leader>vd :vertical resize -10<CR>
map <Leader>hi :resize +10<CR>
map <Leader>hd :resize -10<CR>

map <F2> :vertical wincmd f<CR> <C-W>R " Open the file under the cursor in a vertical split
nnoremap <F6> <C-W>w
map <S-Tab> :tabnext<CR>
map <F8> :tabnew<CR>

noremap <Leader>x :call ToggleQuickFix()<CR> " Close the QuickFix window
nnoremap <Leader>z :call ToggleErrors()<CR>
noremap <Leader>xa :qa<CR>
noremap <Leader>sw :Switch<CR>
nnoremap <Leader>pp :call TogglePresentationMode()<CR>
vnoremap <Leader>ru :call ReplaceUmlaute()<CR>

"quick pairs
imap <leader>' ''<ESC>i
imap <leader>" ""<ESC>i
imap <leader>` ``<ESC>i
imap <leader>( ()<ESC>i
imap <leader>[ []<ESC>i
imap <leader>{ {}<ESC>i
imap <leader>{<space> {  }<ESC><left>i
imap <leader>{{ {{  }}<ESC><left><left>i

" Fixing the copy & paste madness
"vmap <C-y> y:call system("xclip -i -selection clipboard", getreg("\""))<CR>:call system("xclip -i", getreg("\""))<CR>
"imap <C-v> <Esc><C-v>a

" Reload vimrc
"map <Leader>v :source ~/.vimrc<CR>

" Hotkey for AutoFormat
noremap <F4> :Autoformat<CR>

" Compilesettings
"map <Leader>j :make<CR>
"autocmd QuickFixCmdPost [^l]* nested cwindow
"autocmd QuickFixCmdPost    l* nested lwindow

map <C-G> :TigStatus<CR><CR>

" Delete surrounding space (deletes the previous and the following space)
" It's not perfect for all cases, but sometimes usefull
nnoremap ds<space> F<space>xf<space>x

" ************* End custom keymappings ************

" ************** Begin plugin settings ************

" Vim-Airline settings

" Emmet settings
let g:user_emmet_mode='in'
let g:user_emmet_install_global = 1
imap <Leader>i <C-Y>,

" Settings for vim-markdown
" let g:vim_markdown_folding_disabled=1
let g:vim_markdown_initial_foldlevel=1

" Show NERDTree with a leader key
noremap <Leader>t :NERDTreeToggle<CR>
inoremap <Leader>t :NERDTreeToggle<CR>
vnoremap <Leader>t :NERDTreeToggle<CR>
noremap <Leader>tl :NERDTreeFind<CR><C-w_w>
noremap <C-S-l> :NERDTreeFind<CR><C-w_w>
let NERDTreeShowHidden=1
let NERDTreeRespectWildIgnore=1
let g:NERDTreeDirArrowExpandable = '▸'
let g:NERDTreeDirArrowCollapsible = '▾'

" Netrc  management
nnoremap <leader>xv :Vexplore!<cr> " Open vertical explorer
nnoremap <leader>xx :Ex<cr> " Open explorer in current buffer

" YouCompleteMe settings (also for TabNine)
let g:ycm_auto_trigger=1
let g:ycm_key_list_select_completion=['<Down>'] " This setting is important since snipmate will not work with the default settings

" Vim-Maximizer
nnoremap <silent><F3> :MaximizerToggle<CR>
vnoremap <silent><F3> :MaximizerToggle<CR>gv
inoremap <silent><F3> <C-o>:MaximizerToggle<CR>

" Some Fzf settings
let g:fzf_command_prefix = 'Fzf'
map <C-P> :FzfFiles<CR>
map <C-B> :FzfBuffers<CR>
map <Leader>b :FzfBuffers<CR>
map <Leader>q :FzfWindows<CR>

" EasyClip
let g:EasyClipShareYanks=1
let g:EasyClipUsePasteToggleDefaults=0
let g:EasyClipUseCutDefaults=0
let g:EasyClipEnableBlackHoleRedirect=1
let g:EasyClipYankHistorySize=15
nnoremap <leader>y :IPaste<cr>
nmap ]p <plug>EasyClipSwapPasteForward
nmap [p <plug>EasyClipSwapPasteBackwards
vmap x <Plug>MoveMotionXPlug
nmap xx <Plug>MoveMotionLinePlug

" Vim-Schlepp settings
let g:Schlepp#allowSquishingLines = 1
let g:Schlepp#allowSquishingBlocks = 1
vmap <C-K>    <Plug>SchleppUp
vmap <C-J>    <Plug>SchleppDown
vmap <C-H>    <Plug>SchleppLeft
vmap <C-L>    <Plug>SchleppRight

" Tagbar
nmap <F9> :TagbarToggle<CR>

" ACK
if executable('ag')
  let g:ackprg = 'ag --vimgrep'
endif
cnoreabbrev ag Ack!
cnoreabbrev ack Ack!
nnoremap <Leader>vv :Ack! <cword> <CR>

" Nerdcommenter
let g:NERDSpaceDelims = 1

" HighlightedYank
map y <Plug>(highlightedyank)

" vim-smartpairs
let g:smartpairs_start_from_word = 1

" vim-which-key
nnoremap <silent> <leader>      :<c-u>WhichKey ','<CR>

" vim-prettier
let g:prettier#autoformat = 0
let g:prettier#exec_cmd_async = 1
nmap <Leader>pr <Plug>(Prettier)
" autocmd BufWritePre *.js,*.jsx,*.mjs,*.ts,*.tsx,*.css,*.less,*.scss,*.json,*.graphql,*.md,*.vue,*.yaml,*.html PrettierAsync

" coc - Conquer of Completion
source ~/.vim/vimrc/vimrc_coc.vim

" ************** End plugin settings ************

" define color scheme
let g:hybrid_transparent_background = 0
colorscheme shine

if $VIM_BACKGROUND == 'light'
  set background=light
else
  set background=dark
endif

" Define the highlighting for spell checking
hi SpellBad ctermfg=015 ctermbg=000 cterm=none guifg=#FFFFFF guibg=#000000 gui=none
highlight SpellBad cterm=underline

"stop auto commenting, this is hurtful more then it is useful
set formatoptions-=cro

"split settings so they are not stupid like defaults
set splitbelow splitright

 " Add file type based settings
source ~/.vim/vimrc/vimrc_go.vim
source ~/.vim/vimrc/vimrc_javascript.vim
source ~/.vim/vimrc/vimrc_typescript.vim
source ~/.vim/vimrc/vimrc_html_css.vim
source ~/.vim/vimrc/vimrc_markdown.vim
source ~/.vim/vimrc/vimrc_hcl.vim
source ~/.vim/vimrc/vimrc_yaml.vim
source ~/.vim/vimrc/vimrc_rust.vim
"source ~/.vim/vimrc/vimrc_python.vim

" Show another cursor when changing into the insert mode
if exists('$TMUX')
  let &t_SI = "\<Esc>Ptmux;\<Esc>\e[5 q\<Esc>\\"
  let &t_EI = "\<Esc>Ptmux;\<Esc>\e[2 q\<Esc>\\"
else
  let &t_SI = "\e[5 q"
  let &t_EI = "\e[2 q"
endif
