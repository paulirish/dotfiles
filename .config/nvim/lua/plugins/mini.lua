return {
  'echasnovski/mini.nvim',
  config = function()
    require('mini.move').setup {
      mappings = {
        up = '<C-K>',
        down = '<C-J>',
        line_up = '<C-K>',
        line_down = '<C-J>',
      },
    }
  end

}
