local hop_status_ok, hop = pcall(require, 'hop')
if not hop_status_ok then
  return
end

hop.setup()
