local whichkey_status_ok, whichkey = pcall(require, 'which-key')
if not whichkey_status_ok then
  return
end

whichkey.setup()
