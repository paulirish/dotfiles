-- Status line

-- Set lualine as statusline
-- See `:help lualine.txt`
return {
  -- https://github.com/nvim-lualine/lualine.nvim
  'nvim-lualine/lualine.nvim',
  dependencies = {
    -- https://github.com/SmiteshP/nvim-navic
    'SmiteshP/nvim-navic',
    -- https://github.com/nvim-tree/nvim-web-devicons
    'nvim-tree/nvim-web-devicons', -- fancy icons
    -- https://github.com/linrongbin16/lsp-progress.nvim
    'linrongbin16/lsp-progress.nvim', -- LSP loading progress
  },
  config = function()
    local function get_navic()
      local navic = require("nvim-navic")
      if navic.is_available() then
        return navic.get_location()
      else
        return ''
      end
    end

    require('lualine').setup({
      options = {
        icons_enabled = true,
        theme = 'auto',
        component_separators = { left = '', right = ''},
        section_separators = { left = '', right = ''},
      },
      tabline = {
        lualine_a = {},
        lualine_b = {},
        lualine_c = {'filename'},
        lualine_x = {},
        lualine_y = {},
        lualine_z = {{ get_navic }}
      },
      sections = {
        lualine_a = {'mode'},
        lualine_b = {'branch', 'diff', 'diagnostics', 'filename'},
        lualine_c = {},
        lualine_x = {
          'encoding',
          {
            'fileformat',
            icons_enabled = true,
            symbols = {
              unix = 'LF',
              dos = 'CRLF',
              mac = 'CR',
            },
          },
          'filetype'
        },
        lualine_y = {'progress'},
        lualine_z = {'location'}
      },
    })
  end
}
