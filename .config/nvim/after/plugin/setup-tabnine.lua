local tabnine_status_ok, tabnine = pcall(require, 'tabine')
if not tabnine_status_ok then
  return
end

tabnine.setup({
  disable_auto_comment=true,
  accept_keymap="<Tab>",
  dismiss_keymap = "<C-]>",
  debounce_ms = 200,
  suggestion_color = {gui = "#808080", cterm = 244},
  execlude_filetypes = {"TelescopePrompt"}
})
