require('tabnine').setup({
  disable_auto_comment=true,
  accept_keymap="<Tab>",
  dismiss_keymap = "<C-]>",
  debounce_ms = 200,
  suggestion_color = {gui = "#808080", cterm = 244},
  execlude_filetypes = {"TelescopePrompt"}
})

require("nvim-navic").setup({ -- requires to install vscode-codicons-git
  icons = {
    File = ' ',
    Module = ' ',
    Namespace = ' ',
    Package = ' ',
    Class = ' ',
    Method = ' ',
    Property = ' ',
    Field = ' ',
    Constructor = ' ',
    Enum = ' ',
    Interface = ' ',
    Function = ' ',
    Variable = ' ',
    Constant = ' ',
    String = ' ',
    Number = ' ',
    Boolean = ' ',
    Array = ' ',
    Object = ' ',
    Key = ' ',
    Null = ' ',
    EnumMember = ' ',
    Struct = ' ',
    Event = ' ',
    Operator = ' ',
    TypeParameter = ' '
  },
  highlight = false,
  separator = " > ",
  depth_limit = 0,
  depth_limit_indicator = "..",
  safe_output = true
})

require('neoclip').setup({
  default_register = '"',
  enable_persistent_history = true,
  db_path = vim.fn.stdpath("data") .. "/databases/neoclip.sqlite3",
  continuous_sync = true,
  keys = {
    telescope = {
      n = {
        paste = '<c-p>',
      },
    },
  },
})

require("telescope").setup {
  extensions = {
    repo = {
      list = {
        fd_opts = {
        },
        search_dirs = {
          "~/Projects",
        },
      },
    },
  },
}

-- Load telescope extensions
require('telescope').load_extension 'neoclip'
require'telescope'.load_extension'repo'
