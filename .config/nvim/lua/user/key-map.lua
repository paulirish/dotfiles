local M = {}

function M.map(mode, shortcut, command, desc)
  vim.keymap.set(mode, shortcut, command, { noremap = true, silent = true, desc = desc })
end

function M.nmap(shortcut, command, desc)
  M.map("n", shortcut, command, desc)
end

function M.imap(shortcut, command, desc)
  M.map("i", shortcut, command, desc)
end

function M.vmap(shortcut, command, desc)
  M.map("v", shortcut, command, desc)
end

function M.cmd(command)
  return table.concat({ "<Cmd>", command, "<CR>" })
end

return M
