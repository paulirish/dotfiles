local telescope_status_ok, telescope = pcall(require, 'telescope')
if not telescope_status_ok then
  return
end

local telescope_repo_status_ok, _ = pcall(require, 'telescope-repo')
if not telescope_repo_status_ok then
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
  },
}

-- Load telescope extensions
require'telescope'.load_extension'repo'
