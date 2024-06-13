-- Improved fzf.vim written in lua
-- https://github.com/ibhagwan/fzf-lua
return {
  "ibhagwan/fzf-lua",
  enabled = true,
  -- optional for icon support
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

    vim.keymap.set("n", "<C-S-P>", "<cmd>lua require('fzf-lua').files()<CR>", { desc = "Fzf files" })
    vim.keymap.set("n", "<leader>fc", "<cmd>FzfLua<CR>", { desc = "Fzf commands" })
    vim.keymap.set("n", "<leader>fb", "<cmd>lua require('fzf-lua').buffers()<CR>", { desc = "Fzf buffers" })
    vim.keymap.set("n", "<leader>fm", "<cmd>lua require('fzf-lua').marks()<CR>", { desc = "Fzf marks" })
    vim.keymap.set("n", "<leader>fg", "<cmd>lua require('fzf-lua').grep_project()<CR>", { desc = "Fzf grep_project" })
    vim.keymap.set("n", "<leader>fr", "<cmd>lua require('fzf-lua').registers()<CR>", { desc = "Fzf registers" })
    vim.keymap.set("n", "<leader>fs", "<cmd>lua require('fzf-lua').colorschemes()<CR>", { desc = "Fzf color-schemes" })
    vim.keymap.set("n", "<leader>cs", "<cmd>lua require('fzf-lua').colorschemes()<CR>", { desc = "Fzf color-schemes" })
    vim.cmd("cnoreabbrev fzf FzfLua")
  end
}
