call plug#begin()
Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
Plug 'carlitux/deoplete-ternjs'
Plug 'ternjs/tern_for_vim', { 'do': 'npm install && npm install -g tern' }
Plug 'Shougo/denite.nvim'
Plug 'Shougo/deoplete.nvim'
Plug 'tpope/Vim-fugitive'
Plug 'bling/vim-airline'
Plug 'scrooloose/nerdcommenter'
Plug 'tpope/vim-surround'
Plug 'airblade/vim-gitgutter'
Plug 'editorconfig/editorconfig-vim'
Plug 'danro/rename.vim'
Plug 'pangloss/vim-javascript'
Plug 'maxmellon/vim-jsx-pretty'
Plug 'tomasr/molokai'
Plug 'mileszs/ack.vim'
Plug 'scrooloose/nerdtree'
call plug#end()


" disable ex-mode
nnoremap Q <Nop>
set showcmd
" disable help
nmap <F1> <nop>

" Set syntax highlighting options.
set t_Co=256
set background=dark
syntax on
colorscheme molokai
set colorcolumn=80

" Enabled later, after Pathogen
filetype off

" Change mapleader
let mapleader=","

" Set some junk
set autoindent " Copy indent from last line when starting new line.
set backspace=indent,eol,start
set cursorline " Highlight current line
set diffopt=filler " Add vertical spaces to keep right and left aligned
set diffopt+=iwhite " Ignore whitespace changes (focus on code changes)
set encoding=utf-8 nobomb " BOM often causes trouble
" set esckeys " Allow cursor keys in insert mode.
set expandtab " Expand tabs to spaces

" folding
" set nofoldenable    " disable folding
set foldcolumn=4 " Column to show folds
set foldenable
set foldlevel=2
set foldlevelstart=2 " Sets `foldlevel` when editing a new buffer
set foldmethod=syntax " Markers are used to specify folds.
set foldminlines=0 " Allow folding single lines
set foldnestmax=3 " Set max fold nesting level

set formatoptions=
set formatoptions+=c " Format comments
set formatoptions+=r " Continue comments by default
set formatoptions+=o " Make comment when using o or O from comment line
set formatoptions+=q " Format comments with gq
set formatoptions+=n " Recognize numbered lists
set formatoptions+=2 " Use indent from 2nd line of a paragraph
set formatoptions+=l " Don't break lines that are already long
set formatoptions+=1 " Break before 1-letter words
set gdefault " By default add g flag to search/replace. Add g to toggle.
set hidden " When a buffer is brought to foreground, remember undo history and marks.
set history=1000 " Increase history from 20 default to 1000
set hlsearch " Highlight searches
set ignorecase " Ignore case of searches.
set incsearch " Highlight dynamically as pattern is typed.
set laststatus=2 " Always show status line
set lispwords+=defroutes " Compojure
set lispwords+=defpartial,defpage " Noir core
set lispwords+=defaction,deffilter,defview,defsection " Ciste core
set lispwords+=describe,it " Speclj TDD/BDD
set magic " Enable extended regexes.
set mouse=a " Enable moouse in all in all modes.
set noerrorbells " Disable error bells.
set nojoinspaces " Only insert single space after a '.', '?' and '!' with a join command.
set nostartofline " Don't reset cursor to start of line when moving around.
set nowrap " Do not wrap lines.
set nu " Enable line numbers.
set ofu=syntaxcomplete#Complete " Set omni-completion method.
set report=0 " Show all changes.
set ruler " Show the cursor position
set scrolloff=3 " Start scrolling three lines before horizontal border of window.
set shiftwidth=2 " The # of spaces for indenting.
set shortmess=atI " Don't show the intro message when starting vim.
set showmode " Show the current mode.
set showtabline=2 " Always show tab bar.
set sidescrolloff=3 " Start scrolling three columns before vertical border of window.
set smartcase " Ignore 'ignorecase' if search patter contains uppercase characters.
set smarttab " At start of line, <Tab> inserts shiftwidth spaces, <Bs> deletes shiftwidth spaces.
set softtabstop=2 " Tab key results in 2 spaces
set splitbelow " New window goes below
set splitright " New windows goes right
set suffixes=.bak,~,.swp,.swo,.o,.d,.info,.aux,.log,.dvi,.pdf,.bin,.bbl,.blg,.brf,.cb,.dmg,.exe,.ind,.idx,.ilg,.inx,.out,.toc,.pyc,.pyd,.dll
set title " Show the filename in the window titlebar.
set ttyfast " Send more characters at a given time.
" set ttymouse=xterm " Set mouse type to xterm.
set undofile " Persistent Undo.
set visualbell " Use visual bell instead of audible bell (annnnnoying)
set wildchar=<TAB> " Character for CLI expansion (TAB-completion).
set wildignore+=*.jpg,*.jpeg,*.gif,*.png,*.gif,*.psd,*.o,*.obj,*.min.js
set wildignore+=*/smarty/*,*/vendor/*,*/node_modules/*,*/.git/*,*/.hg/*,*/.svn/*,*/.sass-cache/*,*/log/*,*/tmp/*,*/build/*,*/ckeditor/*
set wildmenu " Hitting TAB in command mode will show possible completions above command line.
set wildmode=list:longest " Complete only until point of ambiguity.
set winminheight=0 "Allow splits to be reduced to a single line.
set wrapscan " Searches wrap around end of file
" is crashing :Gdiff so this needs to be commented out
" set shellcmdflag=-ic

" Status Line
" hi User1 guibg=#455354 guifg=fg      ctermbg=238 ctermfg=fg  gui=bold,underline cterm=bold,underline term=bold,underline
" hi User2 guibg=#455354 guifg=#CC4329 ctermbg=238 ctermfg=196 gui=bold           cterm=bold           term=bold
" set statusline=[%n]\ %1*%<%.99t%*\ %2*%h%w%m%r%*%y[%{&ff}→%{strlen(&fenc)?&fenc:'No\ Encoding'}]%=%-16(\ L%l,C%c\ %)%P
let g:Powerline_symbols = 'fancy'

" NERD Commenter
" let NERDSpaceDelims=1
" let NERDCompactSexyComs=1
" let g:NERDCustomDelimiters = { 'racket': { 'left': ';', 'leftAlt': '#|', 'rightAlt': '|#' } }

nnoremap <C-p> :bprev<CR>
nnoremap <C-n> :bnext<CR>
nnoremap <Leader>ls :ls<CR>

" Close Quickfix window (,qq)
map <leader>qq :cclose<CR>

" Yank from cursor to end of line
nnoremap Y y$

" Insert newline
map <leader><Enter> o<ESC>

" Search and replace word under cursor (,*)
nnoremap <leader>* :%s/\<<C-r><C-w>\>//<Left>
vnoremap // y/<C-R>"<CR>

" Strip trailing whitespace (,ss)
function! StripWhitespace ()
  let save_cursor = getpos(".")
  let old_query = getreg('/')
  :%s/\s\+$//e
  call setpos('.', save_cursor)
  call setreg('/', old_query)
endfunction
noremap <leader>ss :call StripWhitespace ()<CR>

" Set relative line numbers
set relativenumber " Use relative line numbers. Current line is still in status bar.
au BufReadPost,BufNewFile * set relativenumber

" NERDTree
 map <F2> :NERDTreeToggle<CR>
"set autochdir
" let NERDTreeChDirMode=2
" nnoremap <leader>n :NERDTreeToggle .<CR>

" tabs
noremap <F3> :tabp<CR>
noremap <F4> :tabn<CR>
noremap <F5> :tabnew<CR>

" NerdCommneter
filetype plugin on

" move code up and down
nnoremap <C-j> :m .+1<CR>==
nnoremap <C-k> :m .-2<CR>==
inoremap <C-j> <Esc>:m .+1<CR>==gi
inoremap <C-k> <Esc>:m .-2<CR>==gi
vnoremap <C-j> :m '>+1<CR>gv=gv
vnoremap <C-k> :m '<-2<CR>gv=gv

" find conflict
nnoremap <leader>fc /<<<<<<<<CR>

" removes git buffer
let g:gitgutter_realtime = 0

" next and do again
nnoremap Q :normal n.<CR>

" clipboard
set clipboard=unnamed

imap jj <Esc>
imap JJ <Esc>
imap kk <Esc>
imap ii <Esc>

" fugitive
map <leader>dg :diffget<CR>
map <leader>dp :diffput<CR>
map <leader>ga :Git a<CR>
map <leader>gb :Gblame<CR>
map <leader>gb :Gbrowse<CR>
map <leader>gc :Gcommit<CR>
map <leader>gd :Gdiff<CR>
map <leader>ge :Gedit<CR>
map <leader>gl :Glog -10<CR>
map <leader>gla :Glog -10 --<CR>
map <leader>gr :Gread<CR>
map <leader>gs :Gstatus<CR>
map <leader>gw :Gwrite<CR>

" close all tabs
nnoremap <leader>cat :tabonly<CR>

" templates
nnoremap <leader>react :-1read $HOME/.vim/.skeleton.component<CR>
" nnoremap <leader>html :-1read $HOME/.vim/.skeleton.html<CR>
" nnoremap <leader>bash :-1read $HOME/.vim/.skeleton.bash<CR>
" nnoremap <leader>editor :-1read $HOME/.vim/.skeleton.editorconfig<CR>
" nnoremap <leader>test :-1read $HOME/.vim/.skeleton.test.js<CR>

" rspec
map <leader>s :w<CR> :!clear && rspec %<CR>

" rails
map <leader>rm :!rake assets:clobber<CR>

" spell
map <Leader>es :set spell spelllang=es_mx<CR>
map <Leader>en :set spell spelllang=en_us<CR>
map <Leader>no :set nospell<CR>

" vimrc
map <Leader>vim :so $MYVIMRC<CR>

" ctags
set tags=tags,../tags,../../tags,../../../tags,../../../../tags,../../../../../tags,../../../../../../tags,../../../../../../../tags
nnoremap <Leader>tag :!ctags -R --exclude=.git --exclude=node_modules .<CR>
" es-ctags (for javascript projects)
" https://www.npmjs.com/package/es-ctags
nnoremap <Leader>et :!es-ctags -R .<CR>

map <leader>w :w<CR>

" Denite
let g:deoplete#enable_at_startup = 1
let g:deoplete#enable_ignore_case = 1
let g:deoplete#enable_smart_case = 1
let g:deoplete#enable_camel_case = 1
let g:deoplete#enable_refresh_always = 1
let g:deoplete#max_abbr_width = 0
let g:deoplete#max_menu_width = 0
let g:deoplete#omni#input_patterns = get(g:,'deoplete#omni#input_patterns',{})
let g:tern_request_timeout = 1
let g:tern_request_timeout = 6000
let g:tern#command = ['tern']
let g:tern#arguments = [' — persistent']
map <leader>f :Denite file<CR>
map <leader>b :Denite buffer<CR>
map <leader>s :Denite grep<CR>
call denite#custom#var('file/rec', 'command', ['rg', '--files', '--vimgrep'])

" te
map <leader>te :vsp<CR>:te 
map <leader>start :tabnew<CR>:te npm start<CR>

" sync devbox
map <leader>sy :te rsync -av --exclude-from=.rsyncignore ssh ./ devbox:/home/dev14/codebase/<CR>

" lint
map <Leader>l :!./node_modules/.bin/eslint % <CR>

" prettier
map <Leader>ll :!prettier % <CR>





