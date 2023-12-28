return {
  'sindrets/diffview.nvim',
  event = 'VeryLazy',
  opts = {
    -- See ':h diffview-config-enhanced_diff_hl'
    enhanced_diff_hl = true,
    view = {
      merge_tool = {
        layout = 'diff3_mixed',
      },
    },
  }
}
