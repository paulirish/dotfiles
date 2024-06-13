-- Git Blame
-- https://github.com/f-person/git-blame.nvim
return {
  "f-person/git-blame.nvim",
  enabled = true,
  event = "VeryLazy",
  opts = {
    enabled = false,                   -- disable by default, enabled only on keymap
    date_format = "%m/%d/%y %H:%M:%S", -- more concise date format
  },
}
