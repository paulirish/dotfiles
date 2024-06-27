return {
  "Exafunction/codeium.nvim",
  enabled = true,
  event = "VeryLazy",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "hrsh7th/nvim-cmp",
  },
  opts = {},
  config = function(_, opts)
    require("codeium").setup(opts)
  end,
}
