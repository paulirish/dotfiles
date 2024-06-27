-- A File Explorer For Neovim Written In Lua
-- https://github.com/nvim-tree/nvim-tree.lua
local function custom_on_attach(bufnr)
  local api = require("nvim-tree.api")

  local function opts(desc)
    return { desc = "nvim-tree: " .. desc, buffer = bufnr, noremap = true, silent = true, nowait = true }
  end

  -- default mappings
  api.config.mappings.default_on_attach(bufnr)

  -- custom mappings
  vim.keymap.set("n", "?", api.tree.toggle_help, opts("Help"))
  vim.keymap.set("n", "v", api.node.open.vertical, opts("Open: Vertical Split"))
  vim.keymap.set("n", "s", api.node.open.vertical, opts("Open: Vertical Split")) -- This is how it was with NerdTree
end

return {
  "nvim-tree/nvim-tree.lua",
  enabled = true,
  dependencies = { "nvim-tree/nvim-web-devicons" },
  opts = {
    -- set local keymaps
    on_attach = custom_on_attach,
    view = {
      width = 35,
      relativenumber = true,
    },
    renderer = {
      indent_markers = {
        enable = true,
      },
    },
    -- disable window_picker for
    -- explorer to work well with
    -- window splits
    actions = {
      open_file = {
        window_picker = {
          enable = false,
        },
      },
    },
    filters = {
      custom = { ".DS_Store", ".git", "node_modules", ".terraform" },
    },
    git = {
      ignore = false,
    },
  },
  config = function(_, opts)
    local nvimtree = require("nvim-tree")

    -- recommended settings from nvim-tree documentation
    vim.g.loaded_netrw = 1
    vim.g.loaded_netrwPlugin = 1

    -- change color for arrows in tree to light blue
    vim.cmd([[ highlight NvimTreeFolderArrowClosed guifg=#3FC5FF ]])
    vim.cmd([[ highlight NvimTreeFolderArrowOpen guifg=#3FC5FF ]])

    -- configure nvim-tree
    nvimtree.setup(opts)

    -- set global keymaps
    local keymap = vim.keymap

    keymap.set("n", "<c-t>", "<cmd>NvimTreeToggle<CR>", { desc = "Toggle file explorer" })
    keymap.set("n", "<leader>tl", "<cmd>NvimTreeFindFile<CR>", { desc = "Find current file in file explorer" })
    keymap.set("n", "<leader>ec", "<cmd>NvimTreeCollapse<CR>", { desc = "Collapse file explorer" })
    keymap.set("n", "<leader>er", "<cmd>NvimTreeRefresh<CR>", { desc = "Refresh file explorer" })

    vim.api.nvim_create_autocmd("QuitPre", {
      callback = function()
        local invalid_win = {}
        local wins = vim.api.nvim_list_wins()
        for _, w in ipairs(wins) do
          local bufname = vim.api.nvim_buf_get_name(vim.api.nvim_win_get_buf(w))
          if bufname:match("NvimTree_") ~= nil then
            table.insert(invalid_win, w)
          end
        end
        if #invalid_win == #wins - 1 then
          -- Should quit, so we close all invalid windows.
          for _, w in ipairs(invalid_win) do vim.api.nvim_win_close(w, true) end
        end
      end
    })
  end,
}
