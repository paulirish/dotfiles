-- https://github.com/williamboman/mason.nvim
return {
  "williamboman/mason.nvim",
  dependencies = {
    { "rcarriga/nvim-notify" },
    -- { "williamboman/mason-lspconfig.nvim" },
    { "WhoIsSethDaniel/mason-tool-installer.nvim" },
  },
  config = function()
    require("mason").setup()

    local mason_tool_installer = require("mason-tool-installer")

    -- Install required linters and formatters
    mason_tool_installer.setup({
      ensure_installed = {
        -- Required linter
        "ansible-lint",
        "codespell",
        "eslint_d",
        "jsonlint",
        "luacheck",
        -- "nix",
        -- "pylint", -- python linter
        "shellcheck",
        "stylelint",
        "yamllint",
        -- Required formatters
        -- "trivy",
        "prettier",
        "stylua",
      },
    })

  end,
}
