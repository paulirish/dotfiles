#!/bin/zsh

# set -x

if [[ -z "${KEYCHAIN_KEYS}" ]]; then
  echo "KEYCHAIN_KEYS not set, skipping keychain"
  exit 1
fi

stringList="$KEYCHAIN_KEYS"

keys=(${(s: :)stringList})

for key in "${keys[@]}"; do
  eval $(keychain --agents ssh --eval "$key")
done

touch ~/tmp/keychain_init_done
