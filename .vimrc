set encoding=utf-8
autocmd! bufwritepost .vimrc source %

set nocompatible
filetype off

autocmd FileType css set omnifunc=csscomplete#CompleteCSS
autocmd FileType html set omnifunc=htmlcomplete#CompleteTags
autocmd FileType javascript set omnifunc=javascriptcomplete#CompleteJS

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

Plugin 'scrooloose/nerdtree'
Plugin 'majutsushi/tagbar'
Plugin 'bling/vim-airline'
Plugin 'pangloss/vim-javascript'
Plugin 'klen/python-mode'
Plugin 'jistr/vim-nerdtree-tabs'
Plugin 'plasticboy/vim-markdown'
Plugin 'groenewege/vim-less'
Plugin 'tpope/vim-fugitive'
Plugin 'chase/vim-ansible-yaml'
Plugin 'tpope/vim-surround'
Plugin 'scrooloose/nerdcommenter'
Plugin 'kien/ctrlp.vim'
Plugin 'joonty/vdebug'
Plugin 'jiangmiao/auto-pairs'
Plugin 'tmhedberg/SimpylFold'
"Plugin 'jelera/vim-javascript-syntax'
Plugin 'gregsexton/gitv'
Plugin 'easymotion/vim-easymotion'
Plugin 'mattn/emmet-vim'
Plugin 'altercation/vim-colors-solarized'
Plugin 'leafgarland/typescript-vim'
Plugin 'msanders/snipmate.vim'
Plugin 'dkprice/vim-easygrep'
Plugin 'sgur/vim-editorconfig'
Plugin 'myhere/vim-nodejs-complete'
Plugin 'AndrewRadev/switch.vim'
Plugin 'tpope/vim-dispatch'
Plugin 'terryma/vim-multiple-cursors'
Plugin 'scrooloose/syntastic'

call vundle#end()
filetype plugin indent on

syntax on
set showcmd

set list
set listchars=space:·,trail:·,precedes:«,extends:»,eol:↲,tab:▸\

au BufRead,BufNewFile *.scss set filetype=scss.css

let g:html_indent_inctags = "html,body,head,tbody"
let g:html_indent_script1 = "inc"
let g:html_indent_style1 = "inc"

set grepprg=ack\ --nogroup\ --column\ --ignore-dir=bower\ --ignore-dir=node_modules\ $*
set grepformat=%f:%l:%c:%m

" Javascript
" ==========
let jshint2_save = 1
let g:syntastic_javascript_checkers = ['eslint']
set smarttab
set cindent

" DelimitMate
" ===========
let delimitMate_expand_cr = 1

" No bullshit folding magic
" =========================
set foldmethod=indent
set foldlevel=99
set foldnestmax=6
nnoremap <silent> <Space> @=(foldlevel('.')?'za':"\<Space>")<CR>
vnoremap <Space> zf

" When opening the file, unfold all. Fold all with zM
au BufRead * normal zR

" Simplyfold
" =========
let g:SimpylFold_docstring_preview=1

" Tagbar
" ======
nmap <F9> :TagbarToggle<CR>

" General option
" ===============
let mapleader = "," " rebind <Leader> key
set wildmode=list:longest " make TAB behave like in a shell
set autoread " reload file when changes happen in other editors
set tags=./tags

set mouse=a
set bs=2 " make backspace behave like normal again
set wildignore+=*.pyc
set wildignore+=*_build/*
set wildignore+=*/coverage/*

" Disable stupid backup and swap files - they trigger too many events
" for file system watchers
set nobackup
set nowritebackup
set noswapfile

" make yank copy to the global system clipboard
set clipboard=unnamed

" Omnicomplete related stuff
set completeopt=longest,menuone
inoremap <c-space> <C-x><C-o>
inoremap <c-@> <C-x><C-o>

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
inoremap <silent><C-j> <C-R>=OmniPopup('j')<CR>
inoremap <silent><C-k> <C-R>=OmniPopup('k')<CR>

" ****** Mappings ****
noremap <C-j> ddp " Move line down
noremap <C-k> ddkP " Move line up"

" Quicksave command
noremap <Leader>w :update<CR>
vnoremap <Leader>w <C-C>:update<CR>
inoremap <Leader>w <ESC>:update<CR>

" Quick quit command
noremap <Leader>e :quit<CR>

" Show NERDTree with a leader key
noremap <Leader>t :NERDTreeToggle<CR>
inoremap <Leader>t :NERDTreeToggle<CR>
vnoremap <Leader>t :NERDTreeToggle<CR>

noremap <C-S-l> :NERDTreeFind<CR>

" Bind nohl
noremap <Leader>h :nohl<CR>

set history=700
set undolevels=700


set tabstop=2
set softtabstop=2
set shiftwidth=2
set shiftround
set expandtab
" disable formatting when pasting large chunks of code
set pastetoggle=<F2>

set hlsearch
set incsearch
set ignorecase
set smartcase

set nowrap " don't automatically wrap on load
set tw=79  " width of document (used by gd)
set fo-=t  " don't automatically wrap text when typing

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

nnoremap <Leader>l :call NumberToggle()<CR>
set number

" center the cursor vertically
:nnoremap <Leader>zz :let &scrolloff=999-&scrolloff<CR>

" easier formatting of paragraphs
vmap Q gq
nmap Q gqap

" Settings for vim-markdown
" ==========================
" let g:vim_markdown_folding_disabled=1
let g:vim_markdown_initial_foldlevel=1

" Settings for ctrlp
" ===================
let g:ctrlp_max_height = 30
let g:ctrlp_user_command = [
    \ '.git', 'cd %s && git ls-files . -co --exclude-standard',
    \ 'find %s -type f'
    \ ]
let g:ctrlp_custom_ignore = {
            \ 'dir': '\.git$\|node_modules$\|bower_components$\|\bower$\',
            \ 'file': '\.exe$\|\.so$'
            \ }
" Movement
" =========
map <Leader>, <esc>:tabprevious<CR>
map <Leader>. <esc>:tabnext<CR>
vnoremap <Leader>s :sort<CR>

" Custom mappings
" ================
vnoremap < <gv  " better indentation
vnoremap > >gv  " better indentation
map <Leader>a ggVG  " select all

nmap ;s  :set invspell spelllang=en<CR>
nnoremap <F6> <C-W>w
map <F7> :tabnext<CR>
map <F8> :tabnew<CR>

map <Leader>x :x<CR>
map <Leader>b :CtrlPBuffer<CR>
map <Leader>xa :qa<CR>
map <Leader>sw :Switch<CR>

" Fixing the copy & paste madness
" ================================
vmap <C-y> y:call system("xclip -i -selection clipboard", getreg("\""))<CR>:call system("xclip -i", getreg("\""))<CR>
imap <C-v> <Esc><C-v>a

" Show trailing whitespace
" =========================
autocmd ColorScheme * highlight ExtraWhitespace ctermbg=red guibg=red
au InsertLeave * match ExtraWhitespace /\s\+$/
"map <Leader>x :%s/\s\+$//

" Color scheme
" =============
set t_Co=256
color desert

map <Leader>v :source ~/.vimrc<CR>

set guioptions=egmrt
set background=light
let g:airline_left_sep=''
let g:airline_right_sep=''
let g:airline_powerline_fonts=0
set laststatus=2

" ***** Some useful functions *****

" Strip trailing whitespace (,ss)
function! StripWhitespace()
    let save_cursor = getpos(".")
    let old_query = getreg('/')
    :%s/\s\+$//e
    call setpos('.', save_cursor)
    call setreg('/', old_query)
endfunction
noremap <leader>ss :call StripWhitespace()<CR>

function! StrTrim(txt)
  return substitute(a:txt, '^\n*\s*\(.\{-}\)\n*\s*$', '\1', '')
endfunction

" Emmet settings
let g:user_emmet_mode='in'
let g:user_emmet_install_global = 0
autocmd FileType html,css EmmetInstall

" Typescript settings
let g:typescript_compiler_options = '-sourcemap'

" Compilesettings
map <Leader>j :make<CR>
autocmd QuickFixCmdPost [^l]* nested cwindow
autocmd QuickFixCmdPost    l* nested lwindow

"Easygrep settings
let g:EasyGrepMode=1
let g:EasyGrepCommand=1
let g:EasyGrepFilesToExclude=".svn,.git,node_modules,bower,bower_components"
let g:EasyGrepRecursive=1
let g:EasyGrepIgnoreCase=1

"Syntastic settings
let g:syntastic_javascript_checkers = ['eslint', 'jshint']
let g:syntastic_javascript_eslint_exec = StrTrim(system('npm-which eslint'))
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 0
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 1

