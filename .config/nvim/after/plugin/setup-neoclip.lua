local neoclip_status_ok, neoclip = pcall(require, 'neoclip')
if not neoclip_status_ok then
  return
end

neoclip.setup({
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

require('telescope').load_extension 'neoclip'
