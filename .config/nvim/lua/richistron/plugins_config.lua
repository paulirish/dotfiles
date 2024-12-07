--theme
require('rose-pine').setup({
  --- @usage 'auto'|'main'|'moon'|'dawn'
  variant = 'moon'
})
vim.cmd('colorscheme rose-pine')
vim.cmd [[
  let g:airline_theme = 'solarized'
]]

--telescope
require("telescope").setup {
  defaults = {
    file_ignore_patterns = { "^.git/", "^node_modules/", "^vendor/" }
  },
  pickers = {
    live_grep = {
      additional_args = function(opts)
        return {"--hidden"}
      end
    }
  }
}

require'nvim-treesitter.configs'.setup {
  -- A list of parser names, or "all" (the five listed parsers should always be installed)
  ensure_installed = {
    "ruby",
    -- "typescript",
    -- "vim",
    -- "lua",
    -- "javascript",
    -- "python",
    -- "c_sharp",
    -- "make",
    -- "hcl",
    -- "bash",
    -- "dockerfile",
    -- "gitignore",
    -- "html",
    -- "css",
    -- "go",
    -- "json",
    "markdown",
    -- "yaml"
  },

  -- Install parsers synchronously (only applied to `ensure_installed`)
  sync_install = false,

  -- Automatically install missing parsers when entering buffer
  -- Recommendation: set to false if you don't have `tree-sitter` CLI installed locally
  auto_install = true,

  highlight = {
    enable = true,
    -- NOTE: these are the names of the parsers and not the filetype. (for example if you want to
    -- disable highlighting for the `tex` filetype, you need to include `latex` in this list as this is
    -- the name of the parser)
    -- list of language that will be disabled
    --disable = { "c", "rust" },
    -- Or use a function for more flexibility, e.g. to disable slow treesitter highlight for large files
    disable = function(lang, buf)
      local max_filesize = 100 * 1024 -- 100 KB
      local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
      if ok and stats and stats.size > max_filesize then
        return true
      end
    end,

    -- Setting this to true will run `:h syntax` and tree-sitter at the same time.
    -- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
    -- Using this option may slow down your editor, and you may see some duplicate highlights.
    -- Instead of true it can also be a list of languages
    additional_vim_regex_highlighting = false,
  },
}

