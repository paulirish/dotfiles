-- https://www.josean.com/posts/neovim-linting-and-formatting
-- https://github.com/stevearc/conform.nvim
return {
  "stevearc/conform.nvim",
  enabled = true,
  event = { "BufReadPre", "BufNewFile" },
  dependencies = {
    "williamboman/mason.nvim",
  },
  config = function()
    local conform = require("conform")

    conform.setup({
      formatters = {
        prettier = {
          args = { "--no-semi", "--single-quote", "--jsx-single-quote" },
        }
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
    })

    vim.keymap.set({ "n", "v" }, "<leader>lf", function()
      conform.format({
        async = false,
        lsp_fallback = true,
        formatters = {},
        timeout_ms = 500,
      })
    end, { desc = "Format file or range (in visual mode)" })
  end,
}
