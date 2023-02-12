local telescope_status_ok, telescope = pcall(require, 'telescope')
if not telescope_status_ok then
  return
end

local telescope_repo_status_ok, _ = pcall(require, 'telescope-repo')
if not telescope_repo_status_ok then
  return
end

local telescope_fzf_status_ok, _ = pcall(require, 'telescope-fzf-native')
if not telescope_fzf_status_ok then
  return
end

telescope.setup {
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
    fzf = {
      fuzzy = true,                    -- false will only do exact matching
      override_generic_sorter = true,  -- override the generic sorter
      override_file_sorter = true,     -- override the file sorter
      case_mode = "smart_case",        -- or "ignore_case" or "respect_case"
                                       -- the default case_mode is "smart_case"
    }
  },
}

-- Load telescope extensions
telescope.load_extension('repo')
telescope.load_extension('fzf')
