-- handle-url.lua

local M = {}

function M.open_url()
  -- Get the current line
  local line = vim.api.nvim_get_current_line()

  -- Find the URL using Lua's pattern matching
  local uri = string.match(line, '[a-z]*://[^ >,;()]*')

  -- Escape the URL
  -- Note: Lua does not have an equivalent to Vim's shellescape function,
  -- so this step may need to be adjusted based on your specific needs.
  local escaped_uri = uri and vim.fn.shellescape(uri, 1) or nil

  -- Output the URL or a message if no URL is found
  if escaped_uri and escaped_uri ~= "" then
    vim.notify("Goto url " .. escaped_uri)
    -- Execute the open command
    -- Note: The 'silent' Vim command is not needed in Lua
    vim.cmd("silent !xdg-open '" .. escaped_uri .. "'")
    vim.cmd("redraw!")
  else
    vim.notify("No URI found in line.")
  end
end

return M
