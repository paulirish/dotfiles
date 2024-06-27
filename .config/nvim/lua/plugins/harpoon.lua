-- Getting you where you want with the fewest keystrokes.
-- https://github.com/ThePrimeagen/harpoon/tree/harpoon2
return {
  "ThePrimeagen/harpoon",
  branch = "harpoon2",
  enabled = false,
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-telescope/telescope.nvim",
  },
  lazy = false,
  keys = {
    {
      "<leader>hh",
      function()
        local harpoon = require("harpoon")
        harpoon.ui:toggle_quick_menu(harpoon:list())
      end,
      desc = "Harpoon quick menu",
    },
    { "<leader>ha", function() require("harpoon"):list():append() end,  desc = "Harpoon file", },
    { "<leader>h1", function() require("harpoon"):list():select(1) end, desc = "Harpoon to file 1", },
    { "<leader>h2", function() require("harpoon"):list():select(2) end, desc = "Harpoon to file 2", },
    { "<leader>h3", function() require("harpoon"):list():select(3) end, desc = "Harpoon to file 3", },
    { "<leader>h4", function() require("harpoon"):list():select(4) end, desc = "Harpoon to file 4", },
    { "<leader>h5", function() require("harpoon"):list():select(5) end, desc = "Harpoon to file 5", },
    { "<leader>hp", function() require("harpoon"):list():prev() end,    desc = "Harpoon previous file", },
    { "<leader>hn", function() require("harpoon"):list():next() end,    desc = "Harpoon next file", },
    { "<leader>hr", function() require("harpoon"):list():remove() end,  desc = "Harpoon remove file", },
  },
  config = function()
    local harpoon = require("harpoon")
    harpoon.setup({})

    local conf = require("telescope.config").values
    local function toggle_telescope(harpoon_files)
      local file_paths = {}
      for _, item in ipairs(harpoon_files.items) do
        table.insert(file_paths, item.value)
      end

      require("telescope.pickers").new({}, {
        prompt_title = "Harpoon",
        finder = require("telescope.finders").new_table({
          results = file_paths,
        }),
        previewer = conf.file_previewer({}),
        sorter = conf.generic_sorter({}),
      }):find()
    end

    local nmap = require("user.key-map").nmap
    nmap(
      "<leader>th",
      function() toggle_telescope(harpoon:list()) end,
      "Open harpoon window"
    )
  end
}
