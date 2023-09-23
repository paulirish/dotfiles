return function(use)
  use 'liuchengxu/vim-which-key'     -- Show the current leader mappings
  use 'zirrostig/vim-schlepp'        -- Moving blocks of text easily
  use 'Xuyuanp/nerdtree-git-plugin'  -- A plugin of NERDTree showing git status
  use 'evanleck/vim-svelte'          -- Support for Svelte 3 in vim
  use 'Joorem/vim-haproxy'           -- Syntaxsupport for HAProxy config files
  use 'mileszs/ack.vim'              -- Provides support for ack and the SilverlightSearcher in vim
  use 'rafamadriz/friendly-snippets' -- Set of preconfigured snippets for different languages.
  use 'scrooloose/nerdtree'          -- A tree explorer plugin for vim
  use 'szw/vim-maximizer'            -- Maximizes and restores the current window in Vim.
  use 'svermeulen/vim-cutlass'       -- Plugin that adds a 'cut' operation separate from 'delete'
  use 'terryma/vim-multiple-cursors' -- This True Sublime Text style multiple selections for Vim
  use 'tpope/vim-repeat'             -- Enable repeating supported plugin maps with \".\"
  use 'tpope/vim-surround'           -- surround.vim: quoting/parenthesizing made simple
  use 'hashivim/vim-terraform'       -- Highlighting for Terraform
  use 'voldikss/vim-floaterm'        -- Showing a floating terminal for example TIG
  use 'terryma/vim-expand-region'    -- Expand or reduce current selection

  -- Some nice colorschemes
  use 'NLKNguyen/papercolor-theme'
  use 'marko-cerovac/material.nvim'
  use 'folke/tokyonight.nvim'

  use { 'tzachar/cmp-tabnine', run = './install.sh', requires = 'hrsh7th/nvim-cmp' }

  -- AI powered autocompletion like TabNine https://github.com/jcdickinson/codeium.nvim 
  use {
    'jcdickinson/codeium.nvim',
    requires = {
      'nvim-lua/plenary.nvim',
      'MunifTanjim/nui.nvim',
      'hrsh7th/nvim-cmp',
    },
    config = function()
      require("codeium").setup({
      })
    end
  }

  use 'kkharji/sqlite.lua'    -- Required from nvim-neoclip
  use 'nvim-lua/plenary.nvim' -- Required from telescope-repo
  use 'airblade/vim-rooter'   -- Required from telescope-repo, otherwise it would not change the directory

  -- telescope plugins
  use {
    'AckslD/nvim-neoclip.lua',
    requires = {
      { 'kkharji/sqlite.lua',           module = 'sqlite' },
      { 'nvim-telescope/telescope.nvim' },
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

  use {
    "folke/trouble.nvim",
    requires = "nvim-tree/nvim-web-devicons",
    config = function()
      require("trouble").setup {
        -- your configuration comes here
        -- or leave it empty to use the default settings
        -- refer to the configuration section below
      }
    end
  }

  use 'simrat39/rust-tools.nvim'        -- Better support for Rust
  use 'fatih/vim-go'                    -- Better support for Go
  use 'jose-elias-alvarez/null-ls.nvim' -- Using various additional tools without direct lsp support

  -- https://dev.neovim.pro/lspsaga/
  use({
    "nvimdev/lspsaga.nvim",
    after = "nvim-lspconfig",
    config = function()
      require("lspsaga").setup({})
    end,
    requires = {
      {"nvim-tree/nvim-web-devicons"},
      {"nvim-treesitter/nvim-treesitter"}
    }
  })

  use {                                 -- https://github.com/windwp/nvim-autopairs
    "windwp/nvim-autopairs",
    config = function() require("nvim-autopairs").setup {} end
  }

  -- https://github.com/sindrets/diffview.nvim
  use({
    'sindrets/diffview.nvim',
    event = 'BufRead',
  })

  use { -- Replacement for vim-easymotion
    'smoka7/hop.nvim',
    config = function()
      -- you can configure Hop the way you like here; see :h hop-config
      require'hop'.setup { keys = 'etovxqpdygfblzhckisuran' }
    end
  }

  use({ -- See https://github.com/jackmort/chatgpt.nvim
    "jackMort/ChatGPT.nvim",
      requires = {
        "MunifTanjim/nui.nvim",
        "nvim-lua/plenary.nvim",
        "nvim-telescope/telescope.nvim"
      },
    config = function()
      require("chatgpt").setup()
    end,
  })
end
