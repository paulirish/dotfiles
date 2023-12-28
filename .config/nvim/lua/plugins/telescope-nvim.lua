local function cmd(command)
  return table.concat({ '<Cmd>', command, '<CR>' })
end

-- Fuzzy finder
return {
  -- https://github.com/nvim-telescope/telescope.nvim
  'nvim-telescope/telescope.nvim',
  lazy = true,
  branch = '0.1.x',
  dependencies = {
    -- https://github.com/nvim-lua/plenary.nvim
    -- { 'kkharji/sqlite.lua' },
    { 'nvim-lua/plenary.nvim' },
    { 'airblade/vim-rooter' },
    { 'cljoly/telescope-repo.nvim' },
    {
      -- https://github.com/nvim-telescope/telescope-fzf-native.nvim
      'nvim-telescope/telescope-fzf-native.nvim',
      build = 'make',
      cond = function()
        return vim.fn.executable 'make' == 1
      end,
    },
  },
  keys = {
    -- See `:help telescope.builtin`
    { '<leader>?', require('telescope.builtin').oldfiles, desc = '[?] Find recently opened files' },
    { '<leader>b', require('telescope.builtin').buffers, desc = '[ ] Find existing buffers' },
    { '<leader>/', function()
        -- You can pass additional configuration to telescope to change theme, layout, etc.
        require('telescope.builtin').current_buffer_fuzzy_find(require('telescope.themes').get_dropdown {
          winblend = 10,
          previewer = false,
        })
      end,
      desc = '[/] Fuzzily search in current buffer]'
    },
    { '<leader>tf', require('telescope.builtin').find_files, desc = 'Search [F]iles' },
    { '<leader>th', require('telescope.builtin').help_tags, desc = 'Search [H]elp' },
    { '<leader>tg', require('telescope.builtin').live_grep, desc = 'Search by [G]rep' },
    { '<leader>td', require('telescope.builtin').diagnostics, desc = 'Search [D]iagnostics' },
    { '<leader>tr', require('telescope.builtin').resume, desc = '[R]esume last search' },
    { '<c-p>', cmd('Telescope find_files'), desc = 'Telescope find files' },
    { '<leader>tt', cmd('Telescope'), desc = 'Show Telescope' },
    { '<leader>tp', cmd('Telescope neoclip'), 'Telescope neoclip' },
    { '<leader>tr', cmd('Telescope repo'), 'Telescope repos' },
  },
  config = function()
    local telescope = require('telescope')
    local actions = require('telescope.actions')

    telescope.setup({
      defaults = {
        mappings = {
          i = {
            ['<c-u>'] = false,
            ['<c-d>'] = false,
            ['<c-h>'] = actions.which_key,
            ['<c-w>'] = actions.send_selected_to_qflist + actions.open_qflist, -- Send current selected list to quick-fix-list
          },
          n = {
            ['<c-h>'] = actions.which_key, -- Show predefined keys with using which_key
            ["<c-q>"] = actions.send_to_qflist + actions.open_qflist, -- Send current list to quick-fix-list
            ["<c-w>"] = actions.send_selected_to_qflist + actions.open_qflist, -- Send current selected list to quick-fix-list
          },
        },
        file_ignore_patterns = {
          "^.git/", "^node_modules"
        },
        vimgrep_arguments = { -- :h telescope.defaults.vimgrep_arguments
          'rg',
          '--color=never',
          '--no-heading',
          '--with-filename',
          '--line-number',
          '--column',
          '--smart-case',
          '--hidden',
        },
        layout_config = {
          vertical = {
            width = 0.75
          }
        }
      },
      pickers = {
        find_files = {
          hidden = true
        },
      },
      extensions = {
        repo = {
          list = {
            fd_opts = {
            },
            search_dirs = {
              "~/Projects",
            },
          },
        },
        fzf = {
          fuzzy = true,                    -- false will only do exact matching
          override_generic_sorter = true,  -- override the generic sorter
          override_file_sorter = true,     -- override the file sorter
          case_mode = "smart_case",        -- or "ignore_case" or "respect_case"
                                           -- the default case_mode is "smart_case"
        }
      },
    })

    telescope.load_extension('repo')
    telescope.load_extension('fzf')
  end,
}
