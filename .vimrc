" vundle
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'gmarik/Vundle.vim'
Plugin 'mileszs/ack.vim'
Plugin 'scrooloose/nerdtree'
Plugin 'Shougo/unite.vim'
Plugin 'Shougo/neomru.vim'
Plugin 'tpope/Vim-fugitive'
Plugin 'bling/vim-airline'
Plugin 'scrooloose/nerdcommenter.git'
Plugin 'tpope/vim-unimpaired.git'
Plugin 'tpope/vim-surround.git'
Plugin 'airblade/vim-gitgutter'
Plugin 'sotte/presenting.vim'
Plugin 'suan/vim-instant-markdown'
Plugin 'editorconfig/editorconfig-vim'
Plugin 'MattesGroeger/vim-bookmarks'
Plugin 'vim-scripts/loremipsum'
" Plugin 'Shougo/vimproc.vim'
Plugin 'godlygeek/tabular.git'
Plugin 'danro/rename.vim'
Plugin 'noahfrederick/vim-hemisu'
Plugin 'ngmy/vim-rubocop'
Plugin 'pangloss/vim-javascript'
Plugin 'maxmellon/vim-jsx-pretty'
" Plugin 'leafgarland/typescript-vim'
" Plugin 'vim-scripts/vim-coffee-script'
call vundle#end()
filetype plugin indent on

" Make vim more useful
set nocompatible
set path+=**

" disable ex-mode
nnoremap Q <Nop>

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

" Local dirs
set backupdir=~/.vim/backups
set directory=~/.vim/swaps
set undodir=~/.vim/undo

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

" Speed up viewport scrolling
nnoremap <C-e> 3<C-e>
nnoremap <C-y> 3<C-y>

" Faster split resizing (+,-)
if bufwinnr(1)
  map + <C-W>+
  map - <C-W>-
endif

" Better split switching (Ctrl-j, Ctrl-k, Ctrl-h, Ctrl-l)
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-H> <C-W>h
map <C-L> <C-W>l

" Sudo write (,W)
noremap <leader>W :w !sudo tee %<CR>

" Remap :W to :w
command W w

" Better mark jumping (line + col)
nnoremap ' `

" Hard to type things
" imap >> →
" imap << ←
" imap ^^ ↑
" imap VV ↓
" imap aa λ

" Toggle show tabs and trailing spaces (,c)
set lcs=tab:›\ ,trail:·,eol:¬,nbsp:_
set fcs=fold:-
nnoremap <silent> <leader>c :set nolist!<CR>
set nolist!

" Clear last search (,qs)
map <silent> <leader>qs <Esc>:noh<CR>
" map <silent> <leader>qs <Esc>:let @/ = ""<CR>

" Vim on the iPad
if &term == "xterm-ipad"
  nnoremap <Tab> <Esc>
  vnoremap <Tab> <Esc>gV
  onoremap <Tab> <Esc>
  inoremap <Tab> <Esc>`^
  inoremap <Leader><Tab> <Tab>
endif

" Remap keys for auto-completion, disable arrow keys
" I still need these cuz im nub. so nub.
" inoremap <expr>  <Esc>      pumvisible() ? "\<C-e>" : "\<Esc>"
" inoremap <expr>  <CR>       pumvisible() ? "\<C-y>" : "\<CR>"
" inoremap <expr>  <Down>     pumvisible() ? "\<C-n>" : "\<NOP>"
" inoremap <expr>  <Up>       pumvisible() ? "\<C-p>" : "\<NOP>"
" inoremap <Left>  <NOP>
" inoremap <Right> <NOP>

" Indent/unident block (,]) (,[)
nnoremap <leader>] >i{<CR>
nnoremap <leader>[ <i{<CR>

" Paste toggle (,p)
set pastetoggle=<leader>p
map <leader>p :set invpaste paste?<CR>

" NERD Commenter
let NERDSpaceDelims=1
let NERDCompactSexyComs=1
let g:NERDCustomDelimiters = { 'racket': { 'left': ';', 'leftAlt': '#|', 'rightAlt': '|#' } }

" Buffer navigation (,,) (,]) (,[) (,ls)
nnoremap <C-p> :bnext<CR>
nnoremap <C-n> :bprev<CR>
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

" Save and restore folds
" :au BufWinLeave * mkview
" :au BufWinEnter * silent loadview

" Join lines and restore cursor location (J)
nnoremap J mjJ`j

" Toggle folds (<Space>)
nnoremap <silent> <space> :exe 'silent! normal! '.((foldclosed('.')>0)? 'zMzx' : 'zc')<CR>

" Fix page up and down
map <PageUp> <C-U>
map <PageDown> <C-D>
imap <PageUp> <C-O><C-U>
imap <PageDown> <C-O><C-D>

" Restore cursor position
autocmd BufReadPost *
      \ if line("'\"") > 1 && line("'\"") <= line("$") |
      \   exe "normal! g`\"" |
      \ endif

" Set relative line numbers
set relativenumber " Use relative line numbers. Current line is still in status bar.
au BufReadPost,BufNewFile * set relativenumber

" Emulate bundles, allow plugins to live independantly. Easier to manage.
" call pathogen#runtime_append_all_bundles()
filetype plugin indent on

" JSON
au BufRead,BufNewFile *.json set ft=json syntax=javascript

" Jade
au BufRead,BufNewFile *.jade set ft=jade syntax=jade

" Common Ruby files
au BufRead,BufNewFile Rakefile,Capfile,Gemfile,.autotest,.irbrc,*.treetop,*.tt set ft=ruby syntax=ruby

" Nu
au BufNewFile,BufRead *.nu,*.nujson,Nukefile setf nu

" Coffee Folding
au BufNewFile,BufReadPost *.coffee setl foldmethod=indent nofoldenable

" ZSH
au BufRead,BufNewFile .zsh_rc,.functions,.commonrc set ft=zsh

" Rainbow Parenthesis
nnoremap <leader>rp :RainbowParenthesesToggle<CR>

" NERDTree
map <F2> :NERDTreeToggle<CR>
" set autochdir
let NERDTreeChDirMode=2
nnoremap <leader>n :NERDTreeToggle .<CR>

" tabs
noremap <F3> :tabp<CR>
noremap <F4> :tabn<CR>
noremap <F5> :tabnew<CR>

" ack
" nnoremap <C-S-F> :Ack<space>
nnoremap K :grep! "\b<C-R><C-W>\b"<CR>:Ack<CR>

" NerdCommneter
filetype plugin on

" Unite
let g:unite_source_history_yank_enable = 1
call unite#filters#matcher_default#use(['matcher_fuzzy'])
nnoremap <leader>t :<C-u>Unite -no-split -buffer-name=files   -start-insert file_rec/async:!<cr>
nnoremap <leader>f :<C-u>Unite -no-split -buffer-name=files   -start-insert file<cr>
nnoremap <leader>r :<C-u>Unite -no-split -buffer-name=mru     -start-insert file_mru<cr>
" nnoremap <leader>o :<C-u>Unite -no-split -buffer-name=outline -start-insert outline<cr>
" nnoremap <leader>y :<C-u>Unite -no-split -buffer-name=yank    history/yank<cr>
nnoremap <leader>b :<C-u>Unite -no-split -buffer-name=buffer  buffer<cr>

" Custom mappings for the unite buffer
autocmd FileType unite call s:unite_settings()
function! s:unite_settings()
  " Play nice with supertab
  let b:SuperTabDisabled=1
  " Enable navigation with control-j and control-k in insert mode
  imap <buffer> <C-j>   <Plug>(unite_select_next_line)
  imap <buffer> <C-k>   <Plug>(unite_select_previous_line)
endfunction
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

" tabularize
" nmap <Leader>a= :Tabularize /=<CR>
" nmap <Leader>a: :Tabularize /:\zs<CR>

" vimux
" nmap <leader>rt :call VimuxRunCommand('r t')<CR>
" nmap <leader>vc :call VimuxCloseRunner()<CR>

" next and do again
nnoremap Q :normal n.<CR>

" windows clipboard hacks
let s:clip = '/mnt/c/Windows/System32/clip.exe'  " change this path according to your mount point
if executable(s:clip)
    augroup WSLYank
        autocmd!
        autocmd TextYankPost * if v:event.operator ==# 'y' | call system(s:clip, @0) | endif
    augroup END
endif
" windows clipboard hacks

" clipboard
set clipboard=unnamed
" if has('unnamedplus')
  " set clipboard=unnamed,unnamedplus
" endif

" esc
imap jj <Esc>
imap JJ <Esc>
imap kk <Esc>
imap ii <Esc>

" Coffee
" map <leader>co :CoffeeCompile<CR>

" fugitive
map <leader>dg :diffget<CR>
map <leader>dp :diffput<CR>
map <leader>ga :Git a<CR>
map <leader>gb :Gblame<CR>
map <leader>gb :Gbrowse<CR>
map <leader>gc :Git commit<CR>
map <leader>gd :Gdiff<CR>
map <leader>ge :Gedit<CR>
map <leader>gl :Glog -10<CR>
map <leader>gla :Glog -10 --<CR>
map <leader>gr :Gread<CR>
map <leader>gs :Git status<CR>
map <leader>gw :Gwrite<CR>

" presenting.vim
au FileType rst let b:presenting_slide_separator = '\v(^|\n)\~{4,}'

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

" spotify
" let g:spotify_country_code = 'MX'
" let g:spotify_prev_key = "<F9>"
" let g:spotify_playpause_key = "<F10>"
" let g:spotify_next_key = "<F11>"

" spell
map <Leader>es :set spell spelllang=es_mx<CR>
map <Leader>en :set spell spelllang=en_us<CR>
map <Leader>no :set nospell<CR>

" Allow JSX in normal JS files
" let g:jsx_ext_required = 0

" vimrc
map <Leader>vim :so $MYVIMRC<CR>

" lint
map <Leader>l :!./node_modules/.bin/eslint % <CR>

" nightwatch
" map <Leader>e2 :!node_modules/.bin/nightwatch --config nightwatch.conf.BASIC.js --env localtest --test %<CR>

" ctags
nnoremap <Leader>tag :!ctags -R --exclude=.git --exclude=node_modules .<CR>
" es-ctags (for javascript projects)
" https://www.npmjs.com/package/es-ctags
nnoremap <Leader>et :!es-ctags -R .<CR>

map <leader>jes :w<CR> :!./node_modules/.bin/jest %<CR>

map <leader>w :w<CR>

map <leader>ts :!clear; ./node_modules/.bin/tsc %<CR>

map <leader>cop :RuboCop<CR>
map <leader>rt :!bundle exec rails test<CR>

