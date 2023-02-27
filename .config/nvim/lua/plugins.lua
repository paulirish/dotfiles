return function(use)

  use 'liuchengxu/vim-which-key'      -- Show the current leader mappings
  use 'zirrostig/vim-schlepp'         -- Moving blocks of text easily
  use 'Xuyuanp/nerdtree-git-plugin'   -- A plugin of NERDTree showing git status
  use 'easymotion/vim-easymotion'     -- Vim motions on speed
  use 'evanleck/vim-svelte'           -- Support for Svelte 3 in vim
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

  use {'tzachar/cmp-tabnine', run='./install.sh', requires = 'hrsh7th/nvim-cmp'}

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

  use 'simrat39/rust-tools.nvim' -- Better support for Rust
  use 'fatih/vim-go' -- Better support for Go
  use 'jose-elias-alvarez/null-ls.nvim' -- Using various additional tools without direct lsp support

  use {
    "ThePrimeagen/refactoring.nvim",  -- Refactoring for various languages like GO, TS, JS - see https://github.com/ThePrimeagen/refactoring.nvim
    requires = {
      {"nvim-lua/plenary.nvim"},
      {"nvim-treesitter/nvim-treesitter"}
    }
  }
  use { -- https://github.com/windwp/nvim-autopairs
    "windwp/nvim-autopairs",
      config = function() require("nvim-autopairs").setup {} end
  }
end
