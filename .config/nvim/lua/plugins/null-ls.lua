-- Using various additional tools without direct lsp support

local codespell_ignore_filepath = os.getenv( "HOME" ) .. "/.codespellignore"

return {
  'jose-elias-alvarez/null-ls.nvim',
  config = function ()
    local null_ls = require("null-ls")
    null_ls.setup({
      sources = {
        null_ls.builtins.formatting.stylua,
        null_ls.builtins.diagnostics.eslint,
        null_ls.builtins.diagnostics.ansiblelint,
        null_ls.builtins.diagnostics.codespell.with {
          extra_args = { "--ignore-words="..codespell_ignore_filepath},
        },
        null_ls.builtins.completion.spell,
        null_ls.builtins.formatting.eslint,
        null_ls.builtins.formatting.prettier.with {
          extra_filetypes = { "toml", "yaml", "json", "markdown", "html" },
          extra_args = { "--no-semi", "--single-quote", "--jsx-single-quote" },
        },
      },
    })
  end
}

