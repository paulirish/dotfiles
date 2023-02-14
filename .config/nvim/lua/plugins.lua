return function(use)

  use 'liuchengxu/vim-which-key'      -- Show the current leader mappings
  use 'zirrostig/vim-schlepp'         -- Moving blocks of text easily
  use 'Xuyuanp/nerdtree-git-plugin'   -- A plugin of NERDTree showing git status
  use 'easymotion/vim-easymotion'     -- Vim motions on speed
  use 'mileszs/ack.vim'               -- Provides support for ack and the SilverlightSearcher in vim
  use 'rafamadriz/friendly-snippets'  -- Set of preconfigured snippets for different languages.
  use 'scrooloose/nerdtree'           -- A tree explorer plugin for vim
  use 'szw/vim-maximizer'             -- Maximizes and restores the current window in Vim.
  use 'terryma/vim-multiple-cursors'  -- This True Sublime Text style multiple selections for Vim
  use 'tpope/vim-repeat'              -- Enable repeating supported plugin maps with \".\"
  use 'tpope/vim-surround'            -- surround.vim: quoting/parenthesizing made simple
  use 'hashivim/vim-terraform'        -- Highlighting for Terraform
  use 'voldikss/vim-floaterm'         -- Showing a floating terminal for example TIG
  -- use 'tpope/vim-unimpaired'  -- Pairs of handy bracket mappings

  use 'NLKNguyen/papercolor-theme'
  use 'marko-cerovac/material.nvim'

  use { 'codota/tabnine-nvim', run = "./dl_binaries.sh" }

  use 'kkharji/sqlite.lua'          -- Required from nvim-neoclip
  use 'nvim-lua/plenary.nvim'       -- Required from telescope-repo
  use 'airblade/vim-rooter'         -- Required from telescope-repo, otherwise it would not change the directory

  -- telescope plugins
  use {
    'AckslD/nvim-neoclip.lua',
    requires = {
      {'kkharji/sqlite.lua', module = 'sqlite'},
      {'nvim-telescope/telescope.nvim'},
    }
  }
  use 'cljoly/telescope-repo.nvim'
  use { 'nvim-telescope/telescope-fzf-native.nvim', run = 'make' }

  use({
    "folke/which-key.nvim",
      config = function()
        vim.o.timeout = true
        vim.o.timeoutlen = 500
      end
  })
end
