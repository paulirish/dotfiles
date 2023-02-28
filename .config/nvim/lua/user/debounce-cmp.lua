-- debounce-cmp.lua
-- see https://github.com/hrsh7th/nvim-cmp/issues/598

local M = {}

local cmp_status_ok, cmp = pcall(require, 'cmp')
if not cmp_status_ok then
  print("cmp plugin is not installed.")
  return
end

local timer = vim.loop.new_timer()
if timer == nil then
  return
end

function M.debounce(debounceDelay)
  timer:stop()
  timer:start(
    debounceDelay,
    0,
    vim.schedule_wrap(function()
      cmp.complete({ reason = cmp.ContextReason.Auto })
    end)
  )
end

return M
