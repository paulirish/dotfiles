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

    vim.cmd("cnoreabbrev fzf FzfLua")

    local nmap = require("user.key-map").nmap

    nmap("<C-S-P>", "<cmd>lua require('fzf-lua').files()<CR>", "Fzf files")
    nmap("<leader>fc", "<cmd>FzfLua<CR>", "Fzf commands")
    nmap("<leader>fb", "<cmd>lua require('fzf-lua').buffers()<CR>", "Fzf buffers")
    nmap("<leader>fm", "<cmd>lua require('fzf-lua').marks()<CR>", "Fzf marks")
    nmap("<leader>fg", "<cmd>lua require('fzf-lua').grep_project()<CR>", "Fzf grep_project")
    nmap("<leader>fr", "<cmd>lua require('fzf-lua').registers()<CR>", "Fzf registers")
    nmap("<leader>fs", "<cmd>lua require('fzf-lua').colorschemes()<CR>", "Fzf color-schemes")
    nmap("<leader>cs", "<cmd>lua require('fzf-lua').colorschemes()<CR>", "Fzf color-schemes")
  end
}
