-- See https://github.com/simrat39/rust-tools.nvim 
-- See also https://sharksforarms.dev/posts/neovim-rust/ 
local rust_tools_status_ok, rust_tools = pcall(require, 'rust-tools')
if not rust_tools_status_ok then
  return
end

rust_tools.setup({
  server = {
    on_attach = function(_, bufnr)
      -- Hover actions
      vim.keymap.set("n", "<Leader>rha", rust_tools.hover_actions.hover_actions, { buffer = bufnr })
      -- Code action groups
      vim.keymap.set("n", "<Leader>rca", rust_tools.code_action_group.code_action_group, { buffer = bufnr })
    end,
  },
})
