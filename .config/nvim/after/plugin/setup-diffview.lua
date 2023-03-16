local diffview_status_ok, diffview = pcall(require, 'diffview')
if not diffview_status_ok then
  return
end

diffview.setup({
  -- See ':h diffview-config-enhanced_diff_hl'
  enhanced_diff_hl = true,
  view = {
    merge_tool = {
      layout = 'diff3_mixed',
    },
  },
})
