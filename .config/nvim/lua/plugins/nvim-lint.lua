-- https://www.josean.com/posts/neovim-linting-and-formatting
-- https://github.com/mfussenegger/nvim-lint
return {
  "mfussenegger/nvim-lint",
  enabled = true,
  event = {
    "BufReadPre",
    "BufNewFile",
  },
  dependencies = {
    "williamboman/mason.nvim",
  },
  config = function()
    local lint = require("lint")

    lint.linters_by_ft = {
      ansible = { "ansible_lint", "yamllint" },
      javascript = { "eslint_d" },
      javascriptreact = { "eslint_d" },
      lua = { "luacheck" },
      typescript = { "eslint_d" },
      typescriptreact = { "eslint_d" },
      svelte = { "eslint_d" },
      json = { "jsonlint" },
      -- python = { "pylint" },
      sh = { "shellcheck" },
      yaml = { "yamllint" },
      zsh = { "zsh" },
    }

    -- https://luacheck.readthedocs.io/en/stable/cli.html
    lint.linters.luacheck.args = {
      "--globals=nvim",
    }

    -- Activate codespell for all registered filetypes
    -- for ft, _ in pairs(lint.linters_by_ft) do
    --   table.insert(lint.linters_by_ft[ft], "codespell")
    -- end
    --
    -- -- https://github.com/codespell-project/codespell
    -- local codespell_ignore_filepath = os.getenv("HOME") .. "/.codespellignore"
    -- lint.linters.codespell.args = {
    --   "--ignore-words=" .. codespell_ignore_filepath,
    --   "--check-hidden",
    -- }

    -- local lint_augroup = vim.api.nvim_create_augroup("lint", { clear = true })

    -- vim.api.nvim_create_autocmd({ "BufEnter", "BufWritePost", "InsertLeave" }, {
    --   group = lint_augroup,
    --   callback = function()
    --     lint.try_lint()
    --     lint.try_lint("codespell")
    --   end,
    -- })
    local nmap = require("user.key-map").nmap
    nmap("<leader>ll", lint.try_lint, "Trigger linting for current file")
  end,
}
