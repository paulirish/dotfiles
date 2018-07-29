set encoding=utf-8
autocmd! bufwritepost .vimrc source %

set nocompatible
filetype off

" Activate the internal matchit plugin
filetype plugin on
runtime macros/matchit.vim

set shell=zsh

set path+=** " Search down into subfolders
set wildmenu " Display all matching files when tab complete

" set the runtime path to include Vundle and initialize
call plug#begin('~/.config/nvim/plugged')

Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }

Plug 'majutsushi/tagbar'
Plug 'pangloss/vim-javascript'
Plug 'mxw/vim-jsx'
" Plug 'ap/vim-css-color'
Plug 'hail2u/vim-css3-syntax'
"Plug 'groenewege/vim-less'
" Plug 'chemzqm/vim-jsx-improve'
Plug 'alampros/vim-styled-jsx'
Plug 'easymotion/vim-easymotion'
Plug 'elzr/vim-json'
Plug 'garbas/vim-snipmate'
Plug 'fatih/vim-go'
Plug 'ekalinin/Dockerfile.vim'
Plug 'junegunn/fzf'
Plug 'junegunn/fzf.vim'
Plug 'kopischke/vim-fetch'
" Plug 'leafgarland/typescript-vim'
Plug 'MarcWeber/vim-addon-mw-utils'
Plug 'mattn/emmet-vim'
Plug 'machakann/vim-highlightedyank'
" Plug 'mitermayer/vim-prettier'
Plug 'mileszs/ack.vim'
Plug 'scrooloose/nerdtree'
Plug 'scrooloose/nerdcommenter'
Plug 'sgur/vim-editorconfig'
Plug 'svermeulen/vim-easyclip'
Plug 'szw/vim-maximizer'
Plug 'terryma/vim-multiple-cursors'
Plug 'tomtom/tlib_vim'
Plug 'tpope/vim-dispatch'
Plug 'tpope/vim-fugitive'
Plug 'tpope/vim-repeat'
Plug 'tpope/vim-surround'
Plug 'tpope/vim-unimpaired'
" Plug 'Valloric/YouCompleteMe'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'w0rp/ale'
Plug 'zirrostig/vim-schlepp'
Plug 'NLKNguyen/papercolor-theme'

call plug#end()

filetype plugin indent on

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
set bs=2 " make backspace behave like normal again
set wildignore+=*.pyc
set wildignore+=*_build/*
set wildignore+=*/coverage/*
set wildignore+=.DS_Store
set wildignore+=.git
set wildignore+=.vscode
set wildignore+=.idea
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

" Settings for spellcecking
set spelllang=en_us
set spellfile=~/.vim/spell/en.utf-8.add

" Tell vim where to find the tags file
set tags+=tags

command! -nargs=* Wrap set wrap linebreak nolist
command! -nargs=* Nowrap set nowrap nolinebreak list

autocmd InsertEnter * :set nohlsearch " Turn search highlight of when going into the insert mode
autocmd BufReadPost .functions set syntax=sh
autocmd BufReadPost .aliases set syntax=sh

" Sometimes it's usefull to start immediately with typing when writing a commit message, sometimes not.
" autocmd FileType gitcommit 1 | startinsert

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

" Function to toggle on/off the quickfixlist
function! ToggleErrors()
  let old_last_winnr = winnr('$')
  lclose
  if old_last_winnr == winnr('$')
    lopen
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

nnoremap <F6> <C-W>w
map <S-Tab> :tabnext<CR>
map <F8> :tabnew<CR>

map <Leader>x :cclose<CR> " Close the QuickFix window
map <Leader>xa :qa<CR>
map <Leader>sw :Switch<CR>

"quick pairs
imap <leader>' ''<ESC>i
imap <leader>" ""<ESC>i
imap <leader>` ``<ESC>i
imap <leader>( ()<ESC>i
imap <leader>[ []<ESC>i
imap <leader>{ {}<ESC>i

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

nnoremap <Leader>z :call ToggleErrors()<CR><C-w>w

nnoremap <Leader>pp :call TogglePresentationMode()<CR>

" ************* End custom keymappings ************

" ************** Begin plugin settings ************

" Powerline settings
set laststatus=2
set guifont=Inconsolata\ for\ Powerline:h14
set noshowmode " Hide the default mode text (e.g. -- INSERT -- below the statusline)
let g:Powerline_colorscheme = 'solarized256'

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
noremap <C-S-l> :NERDTreeFind<CR><C-w_w>
let NERDTreeShowHidden=1
let NERDTreeRespectWildIgnore=1

" Syntastic settings
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 0
let g:syntastic_check_on_open = 0
let g:syntastic_check_on_wq = 1
let g:syntastic_html_tidy_ignore_errors=["is not recognized", "discarding unexpected", "proprietary attribute \"ng-"]
map <Leader>q :SyntasticCheck<CR>

" Netrc  management
nnoremap <leader>xv :Vexplore!<cr> " Open vertical explorer
nnoremap <leader>xx :Ex<cr> " Open explorer in current buffer

" YouCompletMe settings
let g:ycm_auto_trigger = 1
let g:ycm_key_list_select_completion = ['<Down>'] " This setting is important since snipmate will not work with the default settings

" Vim-Maximizer
nnoremap <silent><F3> :MaximizerToggle<CR>
vnoremap <silent><F3> :MaximizerToggle<CR>gv
inoremap <silent><F3> <C-o>:MaximizerToggle<CR>

" Some Fzf settings
let g:fzf_command_prefix = 'Fzf'
map <C-P> :FzfFiles<CR>
map <C-B> :FzfBuffers<CR>
map <Leader>b :FzfBuffers<CR>

" EasyClip
let g:EasyClipShareYanks=1
let g:EasyClipUsePasteToggleDefaults=0
let g:EasyClipUseCutDefaults=0
let g:EasyClipEnableBlackHoleRedirect=1
let g:EasyClipYankHistorySize=10
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
cnoreabbrev ack Ack!
nnoremap <Leader>vv :Ack! <cword> <CR>

" Nerdcommenter
let g:NERDSpaceDelims = 1

" Ale
let g:ale_fix_on_save = 0
let g:ale_completion_enabled = 1
let g:ale_lint_on_text_changed = 0
let g:ale_sign_error = '>>'
let g:ale_sign_warning = '--'
let g:ale_open_list = 0

let g:ale_fixers = {
\  'javascript': [ 'eslint' ],
\}

" HighlightedYank
map y <Plug>(highlightedyank)

" ************** End plugin settings ************

" define color scheme
set background=dark
color PaperColor

" Define the highlighting for spell checking
hi SpellBad ctermfg=015 ctermbg=000 cterm=none guifg=#FFFFFF guibg=#000000 gui=none
highlight SpellBad cterm=underline

" Add file type based settings
source ~/.vim/vimrc/vimrc_go.vim
source ~/.vim/vimrc/vimrc_javascript.vim
source ~/.vim/vimrc/vimrc_typescript.vim
source ~/.vim/vimrc/vimrc_html_css.vim
"source ~/.vim/vimrc/vimrc_python.vim