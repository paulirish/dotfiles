-- Library of 40+ independent Lua modules improving overall Neovim
-- https://github.com/echasnovski/mini.nvim/tree/main
return {
  'echasnovski/mini.nvim',
  enabled = true,
  config = function()
    require('mini.move').setup({
      mappings = {
        up = '<C-K>',
        down = '<C-J>',
        line_up = '<C-K>',
        line_down = '<C-J>',
      },
    })

    -- Press enter to start the jump mode
    -- https://github.com/echasnovski/mini.nvim/blob/main/readmes/mini-jump2d.md
    require('mini.jump2d').setup()
  end

}
