return {
  "nvim-neotest/neotest",
  dependencies = {
    "nvim-lua/plenary.nvim",
    "nvim-treesitter/nvim-treesitter",
    "antoinemadec/FixCursorHold.nvim",
    "rouge8/neotest-rust",
    "nvim-neotest/neotest-vim-test",
    "nvim-neotest/neotest-jest",
    "marilari88/neotest-vitest",
    "nvim-neotest/neotest-go",
  },
  lazy = true,
  -- stylua: ignore
  keys = {
    { "<leader>nt", function() require("neotest").run.run(vim.fn.expand("%")) end,                      desc = "Run current file" },
    { "<leader>nT", function() require("neotest").run.run(vim.loop.cwd()) end,                          desc = "Run all test files" },
    { "<leader>nr", function() require("neotest").run.run() end,                                        desc = "Run nearest" },
    { "<leader>ns", function() require("neotest").summary.toggle() end,                                 desc = "Toggle summary" },
    { "<leader>no", function() require("neotest").output.open({ enter = true, auto_close = true }) end, desc = "Show output" },
    { "<leader>nO", function() require("neotest").output_panel.toggle() end,                            desc = "Toggle output panel" },
    { "<leader>nS", function() require("neotest").run.stop() end,                                       desc = "Stop" },
    { "<leader>nl", function() require("neotest").run.run_last() end,                                   desc = "Run last test" },
    -- { "<leader>nL", function() require("neotest").run.run_last({ strategy = "dap" }) end,               desc = "Debug last test" },
    { "<leader>nw", function() require('neotest').run.run({ jestCommand = 'jest --watch ' }) end,       desc = "Run watch" },
  },
  ft = { "go", "typescript", "javascript", "rust" },
  config = function()
    require("which-key").register({ n = { name = "+Neotest" } }, { prefix = "<leader>" })

    local neotest = require("neotest")
    neotest.setup({
      adapters = {
        require("neotest-rust"),
        require("neotest-jest")({
          jestCommand = "yarn test",
          -- jestConfigFile = "jest.config.json",
          env = {},
          cwd = function()
            return vim.fn.getcwd()
          end,
        }),
        require("neotest-vitest"),
        require("neotest-go")({
          experimental = {
            test_table = true,
          },
          args = { "-count=1", "-timeout=60s" }
        }),
      },
    })

    -- local commands = {
    --   {
    --     name = "NeotestRunNearest",
    --     opts = {
    --       desc = "require('neotest').run.run()"
    --     },
    --     command = neotest.run.run
    --   },
    --   {
    --     name = "NeotestRunCurrentFile",
    --     opts = {
    --       desc = "require('neotest').run.run(vim.fn.expand('%'))"
    --     },
    --     command = function()
    --       neotest.run.run(vim.fn.expand("%"))
    --     end
    --   },
    --   {
    --     name = "NeotestDebugNearest",
    --     opts = {
    --       desc = "require('neotest').run.run({strategy = 'dap'})"
    --     },
    --     command = function()
    --       neotest.run.run({ strategy = "dap" })
    --     end
    --   },
    --   {
    --     name = "NeotestStopNearest",
    --     opts = {
    --       desc = "require('neotest').run.stop()"
    --     },
    --     command = neotest.run.stop
    --   },
    --   {
    --     name = "NeotestSummaryToggle",
    --     opts = {
    --       desc = "require('neotest').summary.toggle()"
    --     },
    --     command = neotest.summary.toggle
    --   },
    --   {
    --     name = "NeotestAttachToNearest",
    --     opts = {
    --       desc = "require('neotest').run.attach()"
    --     },
    --     command = neotest.run.attach
    --   },
    --   {
    --     name = "NeotestOutputOpen",
    --     opts = {
    --       desc = "Open the output of a test result"
    --     },
    --     command = function()
    --       neotest.output.open()
    --     end
    --   },
    -- }
    --
    -- for _, cmd in ipairs(commands) do
    --   vim.api.nvim_create_user_command(cmd.name, cmd.command, cmd.opts)
    -- end

    -- get neotest namespace (api call creates or returns namespace)
    local neotest_ns = vim.api.nvim_create_namespace("neotest")
    vim.diagnostic.config({
      virtual_text = {
        format = function(diagnostic)
          local message =
              diagnostic.message:gsub("\n", " "):gsub("\t", " "):gsub("%s+", " "):gsub("^%s+", "")
          return message
        end,
      },
    }, neotest_ns)
  end
}
