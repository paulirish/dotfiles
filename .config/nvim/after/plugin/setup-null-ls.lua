-- See https://github.com/jose-elias-alvarez/null-ls.nvim
local null_ls_status_ok, null_ls = pcall(require, 'null-ls')
if not null_ls_status_ok then
  return
end

-- local augroup = vim.api.nvim_create_augroup("LspFormatting", {})

null_ls.setup({
  sources = {
    null_ls.builtins.formatting.stylua,
    null_ls.builtins.diagnostics.eslint,
    null_ls.builtins.diagnostics.ansiblelint,
    null_ls.builtins.diagnostics.codespell,
    null_ls.builtins.completion.spell,
    null_ls.builtins.formatting.eslint,
    null_ls.builtins.formatting.prettier.with {
      extra_filetypes = { "toml", "yaml", "json", "markdown", "html" },
      extra_args = { "--no-semi", "--single-quote", "--jsx-single-quote" },
    },
  },
  -- on_attach = function(client, bufnr)
  -- if client.supports_method("textDocument/formatting") then
  --   vim.api.nvim_clear_autocmds({ group = augroup, buffer = bufnr })
  --   vim.api.nvim_create_autocmd("BufWritePre", {
  --     group = augroup,
  --     buffer = bufnr,
  --     callback = function()
  --       vim.lsp.buf.format({ async = false, bufnr = bufnr })
  --     end
  --   })
  -- end
  -- end,
})
