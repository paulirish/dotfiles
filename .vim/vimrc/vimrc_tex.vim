
"""LATEX
"autocmd FileType tex nnoremap <C-p> :w<Enter>:!/home/kulade/Documents/latex/compile.sh<Space><C-R>%<Backspace><Backspace><Backspace><Backspace><Enter><Enter>
autocmd FileType tex nnoremap <C-p> :w<Enter>:!(setsid<Space>pdflatex<Space><C-R>%<Space>&><space>/dev/null&)<Enter><Enter>
autocmd FileType tex nnoremap <C-t> :w<Enter>:!bibtex<Space><C-R>%<Backspace><Backspace><Backspace><Backspace><Enter>
autocmd FileType tex nnoremap <C-o> :!<Space>setsid<Space>evince<Space><C-R>%<Backspace><Backspace><Backspace>pdf<Space>&><Space>/dev/null<Space>&<Enter><Enter>

autocmd FileType tex inoremap ;fr \begin{frame}<Enter>\frametitle{}<Enter><Enter>(<>)<Enter><Enter>\end{frame}<Enter><Enter>(<>)<Esc>6kf}i
autocmd FileType tex inoremap ;fi \begin{fitch}<Enter><Enter>\end{fitch}<Enter><Enter>(<>)<Esc>3kA
autocmd FileType tex inoremap ;exe \begin{exe}<Enter>\ex<Space><Enter>\end{exe}<Enter><Enter>(<>)<Esc>3kA
autocmd FileType tex inoremap ;em \emph{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;bf \textbf{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;it \textit{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;ct \citet{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;p \citep{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;glos {\gll<Space>(<>)<Space>\\<Enter>(<>)<Space>\\<Enter>\trans{``(<>)''}}<Esc>2k2bcw
autocmd FileType tex inoremap ;x \begin{xlist}<Enter>\ex<Space><Enter>\end{xlist}<Esc>kA<Space>
autocmd FileType tex inoremap ;ol \begin{enumerate}<Enter><Enter>\end{enumerate}<Enter><Enter>(<>)<Esc>3kA\item<Space>
autocmd FileType tex inoremap ;ul \begin{itemize}<Enter><Enter>\end{itemize}<Enter><Enter>(<>)<Esc>3kA\item<Space>
autocmd FileType tex inoremap ;ref \ref{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;t \begin{tabular}<Enter>(<>)<Enter>\end{tabular}<Enter><Enter>(<>)<Esc>4kA{}<Esc>i
autocmd FileType tex inoremap ;tab \begin{tableau}<Enter>\inp{(<>)}<Tab>\const{(<>)}<Tab>(<>)<Enter>(<>)<Enter>\end{tableau}<Enter><Enter>(<>)<Esc>5kA{}<Esc>i
autocmd FileType tex inoremap ;can \cand{}<Tab>(<>)<Esc>T{i
autocmd FileType tex inoremap ;con \const{}<Tab>(<>)<Esc>T{i
autocmd FileType tex inoremap ;v \vio{}<Tab>(<>)<Esc>T{i
autocmd FileType tex inoremap ;a \href{}{(<>)}<Space>(<>)<Esc>2T{i
autocmd FileType tex inoremap ;sc \textsc{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;sec \section{}<Enter><Enter>(<>)<Esc>2kf}i
autocmd FileType tex inoremap ;ssec \subsection{}<Enter><Enter>(<>)<Esc>2kf}i
autocmd FileType tex inoremap ;sssec \subsubsection{}<Enter><Enter>(<>)<Esc>2kf}i
autocmd FileType tex inoremap ;st <Esc>F{i*<Esc>f}i
autocmd FileType tex inoremap ;beg \begin{%DELRN%}<Enter>(<>)<Enter>\end{%DELRN%}<Enter><Enter>(<>)<Esc>4kfR:MultipleCursorsFind<Space>%DELRN%<Enter>c
"autocmd FileType tex inoremap ;up \usepackage{}<Esc>i
autocmd FileType tex inoremap ;up <Esc>/usepackage<Enter>o\usepackage{}<Esc>i
autocmd FileType tex nnoremap ;up /usepackage<Enter>o\usepackage{}<Esc>i
autocmd FileType tex inoremap ;tt \texttt{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;bt {\blindtext}
autocmd FileType tex inoremap ;nu $\varnothing$
autocmd FileType tex inoremap ;col \begin{columns}[T]<Enter>\begin{column}{.5\textwidth}<Enter><Enter>\end{column}<Enter>\begin{column}{.5\textwidth}<Enter>(<>)<Enter>\end{column}<Enter>\end{columns}<Esc>5kA
"""END

"""Logical Symbols
autocmd FileType tex inoremap ;m $$<Space>(<>)<Esc>2T$i
autocmd FileType tex inoremap ;M $$<Esc>i
autocmd FileType tex inoremap ;neg {\neg}
autocmd FileType tex inoremap ;V {\vee}
autocmd FileType tex inoremap ;or {\vee}
autocmd FileType tex inoremap ;L {\wedge}
autocmd FileType tex inoremap ;and {\wedge}
autocmd FileType tex inoremap ;ra {\rightarrow}
autocmd FileType tex inoremap ;la {\leftarrow}
autocmd FileType tex inoremap ;lra {\leftrightarrow}
autocmd FileType tex inoremap ;fa {\forall}
autocmd FileType tex inoremap ;ex {\exists}
autocmd FileType tex inoremap ;dia	{\Diamond}
autocmd FileType tex inoremap ;box	{\Box}
"""END

autocmd Filetype tex inoremap ;nom {\textsc{nom}}
autocmd FileType tex inoremap ;acc {\textsc{acc}}
autocmd FileType tex inoremap ;dat {\textsc{dat}}
autocmd FileType tex inoremap ;gen {\textsc{gen}}
autocmd FileType tex inoremap ;abl {\textsc{abl}}
autocmd FileType tex inoremap ;voc {\textsc{voc}}
autocmd FileType tex inoremap ;loc {\textsc{loc}}
autocmd Filetype tex inoremap ;inst {\textsc{inst}}
"autocmd FileType tex inoremap ;

"""IPA
autocmd FileType tex inoremap ;tipa \textipa{}<Space>(<>)<Esc>T{i
autocmd FileType tex inoremap ;ae {\ae}
autocmd FileType tex inoremap ;A {\textscripta}
autocmd FileType tex inoremap ;dh {\dh}
autocmd FileType tex inoremap ;yogh {\textyogh}
autocmd FileType tex inoremap ;j {\textdyoghlig}
autocmd FileType tex inoremap ;uh {\textschwa}
autocmd FileType tex inoremap ;eps {\textepsilon}
autocmd FileType tex inoremap ;gam {\textgamma}
autocmd FileType tex inoremap ;I {\textsci}
autocmd FileType tex inoremap ;sh {\textesh}
autocmd FileType tex inoremap ;th {\texttheta}
autocmd FileType tex inoremap ;ups {\textupsilon}
autocmd FileType tex inoremap ;ph {\textphi}
autocmd FileType tex inoremap ;om {\textomega}
autocmd FileType tex inoremap ;sig {\textsigma}
autocmd FileType tex inoremap ;oe {\oe}
autocmd FileType tex inoremap ;ng {\ng}
autocmd FileType tex inoremap ;au {\textopeno}
autocmd FileType tex inoremap ;O {\textopeno}
autocmd FileType tex inoremap ;glot {\textglotstop}
autocmd FileType tex inoremap ;ch {\textteshlig}
"""END
