" MacVim colorscheme

highlight clear

if exists("syntax_on")
  syntax reset
endif

let colors_name = "macvim"

hi Directory    guifg=#1600FF
hi ErrorMsg     guibg=#ee2c2c guifg=White
hi FoldColumn   guibg=Grey guifg=#00008B
hi Folded       guibg=#E6E6E6 guifg=#00008B
hi IncSearch    gui=reverse
hi ModeMsg      gui=bold
hi MoreMsg      gui=bold guifg=#2E8B57
hi NonText      gui=bold guifg=Blue
hi Pmenu        guibg=#CAE1E1
hi PmenuSbar    guibg=Grey
hi PmenuSel     guifg=White guibg=#4A708B
hi PmenuThumb   gui=reverse
hi Question     gui=bold guifg=Chartreuse4
hi SignColumn   guibg=Grey guifg=#00008B
hi SpecialKey   guifg=Blue
hi SpellBad     guisp=#ee2c2c gui=undercurl
hi SpellCap     guisp=Blue gui=undercurl
hi SpellLocal   guisp=#4A708B gui=undercurl
hi SpellRare    guisp=#ff00ff gui=undercurl
hi TabLine      gui=underline guibg=#D3D3D3
hi TabLineFill  gui=reverse
hi TabLineSel   gui=bold
hi Title        gui=bold guifg=#009ACD
hi VertSplit    gui=NONE guifg=#2F4F4F guibg=Gray90
hi Visual       guibg=#72F7FF
hi WarningMsg   guifg=#ee2c2c

hi Error        guifg=#a71d5d guibg=NONE
hi Identifier   gui=NONE guifg=#458B74 guibg=NONE
hi Ignore       gui=NONE guifg=bg guibg=NONE
hi PreProc      gui=NONE guifg=#1874CD guibg=NONE
hi Special      gui=NONE guifg=#8A2BE2 guibg=NONE
hi String       gui=NONE guifg=#4A708B guibg=NONE
hi Underlined   gui=underline guifg=#63B8FF

hi Boolean      gui=NONE guifg=#CD5555 guibg=NONE
hi Comment      gui=italic guifg=#0000FF guibg=NONE
hi Constant     gui=NONE guifg=#FF8C00 guibg=NONE
hi Cursor       guibg=fg guifg=bg
hi CursorColumn guibg=#F1F5FA
hi CursorIM     guibg=fg guifg=bg
hi CursorLine   guibg=#F1F5FA
hi LineNr       guifg=#888888 guibg=#E6E6E6
hi MatchParen   guifg=White guibg=#AB82FF
hi Search       guibg=#98F5FF guifg=NONE
hi Statement    gui=bold guifg=#a71d5d guibg=NONE
hi Todo         gui=NONE guifg=#006400 guibg=PaleGreen1
hi Type         gui=bold guifg=#009E00 guibg=NONE
hi WildMenu     guibg=#87CEEB guifg=Black
hi lCursor      guibg=fg guifg=bg
hi Normal       guifg=#333333 ctermfg=236 guibg=#ffffff ctermbg=15 gui=NONE cterm=NONE

hi DiffAdd    ctermfg=233 ctermbg=194 guifg=#003300 guibg=#DDFFDD gui=none cterm=none
hi DiffChange ctermbg=255  guibg=#ececec gui=none   cterm=none
hi DiffText   ctermfg=233  ctermbg=189  guifg=#000033 guibg=#DDDDFF gui=none cterm=none
hi DiffDelete ctermfg=252 ctermbg=224   guifg=#DDCCCC guibg=#FFDDDD gui=none    cterm=none

" vim: sw=2
