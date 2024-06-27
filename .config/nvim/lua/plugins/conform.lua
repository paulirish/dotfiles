-- https://www.josean.com/posts/neovim-linting-and-formatting
-- https://github.com/stevearc/conform.nvim
return {
  "stevearc/conform.nvim",
  enabled = true,
  event = { "BufReadPre", "BufNewFile" },
  dependencies = {
    "williamboman/mason.nvim",
  },
  opts = {
    formatters = {
      prettier = {
        -- args = { "--no-semi", "--single-quote", "--jsx-single-quote" },
      },
    },
    formatters_by_ft = {
      javascript = { "prettier" },
      typescript = { "prettier" },
      javascriptreact = { "prettier" },
      typescriptreact = { "prettier" },
      svelte = { "prettier" },
      css = { "prettier" },
      html = { "prettier" },
      json = { "prettier" },
      yaml = { "prettier" },
      markdown = { "prettier" },
      graphql = { "prettier" },
      lua = { "stylua" },
    },
    -- format_on_save = {
    --   lsp_fallback = true,
    --   async = false,
    --   timeout_ms = 500,
    -- },
  },
  config = function(_, opts)
    local conform = require("conform")
    conform.setup(opts)

    local format_options = {
      async = false,
      lsp_fallback = true,
      timeout_ms = 1500,
    }

    local map = require("user.key-map").map
    map({ "n", "v" }, "<leader>lf", function()
      conform.format(format_options)
    end, "Format file or range (in visual mode)")

    vim.api.nvim_create_user_command("Format", function()
      conform.format(format_options)
    end, { desc = "Format current buffer with LSP" })
  end,
}
