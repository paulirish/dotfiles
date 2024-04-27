-- Auto-completion of bracket/paren/quote pairs
-- https://github.com/windwp/nvim-autopairs
return {
  "windwp/nvim-autopairs",
  event = "InsertEnter",
  opts = {
    check_ts = true,                      -- enable treesitter
    ts_config = {
      lua = { "string" },                 -- don't add pairs in lua string treesitter nodes
      javascript = { "template_string" }, -- don't add pairs in javascript template_string
    },
  },
}
