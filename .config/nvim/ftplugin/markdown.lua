-- Markdown specific settings
vim.bo.shiftwidth = 2
vim.bo.tabstop = 2
vim.bo.softtabstop = 2
vim.wo.wrap = true

-- Allow j/k when navigating wrapped lines
vim.keymap.set("n", "j", "gj")
vim.keymap.set("n", "k", "gk")

vim.wo.foldmethod = "manual"

-- Spell check
vim.wo.spell = true
vim.bo.spelllang = "de,en"
vim.bo.spellfile = os.getenv("HOME") .. "/Projects/dotfiles/.config/nvim/spell/de.utf-8.add"
