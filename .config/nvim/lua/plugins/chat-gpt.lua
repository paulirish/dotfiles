-- https://github.com/jackMort/ChatGPT.nvim
-- https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo
return {
  "jackMort/ChatGPT.nvim",
  event = "VeryLazy",
  enabled = true,
  opts = {
    -- api_key_cmd = nil,
    api_key_cmd = "echo $OPENAI_API_KEY",
    yank_register = "+",
    edit_with_instructions = {
      diff = false,
      keymaps = {
        close = "<C-c>",
        accept = "<C-y>",
        toggle_diff = "<C-d>",
        toggle_settings = "<C-o>",
        toggle_help = "<C-h>",
        cycle_windows = "<Tab>",
        use_output_as_input = "<C-i>",
      },
    },
    chat = {
      welcome_message = WELCOME_MESSAGE,
      max_line_length = 120,
      keymaps = {
        close = "<C-c>",
        yank_last = "<C-y>",
        yank_last_code = "<C-k>",
        scroll_up = "<C-u>",
        scroll_down = "<C-d>",
        new_session = "<C-n>",
        cycle_windows = "<Tab>",
        cycle_modes = "<C-f>",
        next_message = "<C-j>",
        prev_message = "<C-k>",
        select_session = "<Space>",
        rename_session = "r",
        delete_session = "d",
        draft_message = "<C-r>",
        edit_message = "e",
        delete_message = "d",
        toggle_settings = "<C-o>",
        toggle_sessions = "<C-p>",
        toggle_help = "<C-h>",
        toggle_message_role = "<C-r>",
        toggle_system_role_open = "<C-s>",
        stop_generating = "<C-x>",
      },
    },
    openai_params = {
      model = "gpt-4o",
      frequency_penalty = 0,
      presence_penalty = 0,
      max_tokens = 300,
      temperature = 0,
      top_p = 1,
      n = 1,
    },
    openai_edit_params = {
      model = "gpt-4o",
      frequency_penalty = 0,
      presence_penalty = 0,
      temperature = 0,
      top_p = 1,
      n = 1,
    },
    use_openai_functions_for_edits = false,
    actions_paths = {
      vim.fn.stdpath("config") .. "/files/custom-actions.json"
    },
    show_quickfixes_cmd = "Trouble quickfix",
    predefined_chat_gpt_prompts = "https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv",
    highlights = {
      help_key = "@symbol",
      help_description = "@comment",
    },

  },
  dependencies = {
    "MunifTanjim/nui.nvim",
    "nvim-lua/plenary.nvim",
    "folke/trouble.nvim",
    "nvim-telescope/telescope.nvim"
  },
  config = function(_, opts)
    require("chatgpt").setup(opts)

    vim.cmd("cnoreabbrev gpt ChatGPT")
    vim.cmd("cnoreabbrev gptr ChatGPTRun")
    vim.cmd("cnoreabbrev gr ChatGPTRun")
    vim.cmd("cnoreabbrev gptaa ChatGPTActAs")
    vim.cmd("cnoreabbrev gaa ChatGPTActAs")

    local map = require("user.key-map").map

    map({ "n", "v" }, "<leader>ct", "<cmd>ChatGPT<CR>", "Show ChatGPT window")
    map(
      { "n", "v" },
      "<leader>ce",
      "<cmd>ChatGPTEditWithInstruction<CR>",
      "ChatGPTEditWithInstruction"
    )
  end
}
