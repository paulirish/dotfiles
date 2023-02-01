return function(use)
  use ({ 'codota/tabnine-nvim', 
    run = "./dl_binaries.sh"
    config = function()
      require('tabnine').setup({
        disable_auto_comment=true,
        accept_keymap="<Tab>",
        dismiss_keymap = "<C-]>",
        debounce_ms = 300,
        suggestion_color = {gui = "#808080", cterm = 244},
        execlude_filetypes = {"TelescopePrompt"}
      })
    end
  })

  use 'liuchengxu/vim-which-key'  -- Show the current leader mappings
  -- use 'zirrostig/vim-schlepp' -- Moving blocks of text easily
  -- use 'tpope/vim-unimpaired'  -- Pairs of handy bracket mappings
  use 'scrooloose/nerdtree'   -- A tree explorer plugin for vim
  use({
    "folke/which-key.nvim",
      config = function()
        vim.o.timeout = true
        vim.o.timeoutlen = 300
        require("which-key").setup({})
      end
  })
end
