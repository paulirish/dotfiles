-- See https://github.com/jose-elias-alvarez/null-ls.nvim 
local null_ls_status_ok, null_ls = pcall(require, 'null-ls')
if not null_ls_status_ok then
  return
end

null_ls.setup({
  sources = {
    -- null_ls.builtins.formatting.stylua,
    null_ls.builtins.diagnostics.eslint,
    null_ls.builtins.formatting.prettier,
    -- null_ls.builtins.completion.spell,
  },
})
