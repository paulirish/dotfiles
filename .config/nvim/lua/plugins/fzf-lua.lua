-- Improved fzf.vim written in lua
-- https://github.com/cleong14/fzf-lua
return {
  "cleong14/fzf-lua",
  -- optional for icon support
  enabled = true,
  dependencies = { "nvim-tree/nvim-web-devicons" },
  opts = {
    fzf_opts = {
      ['--layout'] = 'reverse-list',
    },
    "telescope",
    winopts = {
      preview = {
        default = "bat"
      }
    }
  },
  config = function(_, opts)
    -- calling `setup` is optional for customization
    require("fzf-lua").setup(opts)
    vim.keymap.set("n", "<C-S-P>", "<cmd>lua require('fzf-lua').files()<CR>", { silent = true, desc = "Fzf files" })

    vim.cmd("cnoreabbrev fzf FzfLua")
  end
}
