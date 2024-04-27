-- LLM powered development for Neovim
-- https://github.com/huggingface/llm.nvim
return {
  'huggingface/llm.nvim',
  enabled = false,
  event = 'VeryLazy',
  opts = {
    -- api_token = nil, Will be read from LLM_NVIM_API_TOKEN

    enable_suggestions_on_startup = true,
    enable_suggestions_on_files = "*", -- pattern matching syntax to enable suggestions on specific files, either a string or a list of strings

    tokens_to_clear = { "<|endoftext|>" },
    fim = {
      enabled = true,
      prefix = "<fim_prefix>",
      middle = "<fim_middle>",
      suffix = "<fim_suffix>",
    },
    model = "bigcode/starcoder",
    context_window = 8192,
    tokenizer = {
      repository = "bigcode/starcoder",
    }
  },
  config = function(_, opts)
    require('llm').setup(opts)
  end
}
