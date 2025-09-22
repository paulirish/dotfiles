-- This file can be loaded by calling `lua require('plugins')` from your init.vim

-- Only required if you have packer configured as `opt`
vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function(use)
  use 'wbthomason/packer.nvim'

  use({ 'rose-pine/neovim', as = 'rose-pine' })

  use {
    'nvim-telescope/telescope.nvim',
--     tag = '0.1.5',
    branch = '0.1.x',
    requires = { { 'nvim-lua/plenary.nvim' } }
  }

  use('tpope/vim-fugitive')
  use('tpope/vim-surround')

  use('nvim-treesitter/nvim-treesitter', { run = ':TSUpdate' })
  use('editorconfig/editorconfig-vim')
  use('mbbill/undotree')
  use('preservim/nerdcommenter')
  use('vim-airline/vim-airline') 
  use('vim-airline/vim-airline-themes') 
end)

