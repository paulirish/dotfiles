return {
  'AckslD/nvim-neoclip.lua',
  dependencies = {
    { 'kkharji/sqlite.lua', module = 'sqlite' },
    { 'nvim-telescope/telescope.nvim' },
  },
  config = function()
    require('neoclip').setup({
      default_register = '"',
      enable_persistent_history = true,
      db_path = vim.fn.stdpath("data") .. "/databases/neoclip.sqlite3",
      continuous_sync = true,
      keys = {
        telescope = {
          n = {
            paste = '<c-p>',
          },
        },
      },
    })
    require('telescope').load_extension('neoclip')
  end
}
