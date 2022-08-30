export BORG_REPO="ssh://u315810@u315810.your-storagebox.de/./borg-backups/jabasoft-ds"
export BORG_RSH="ssh -i ~/.ssh/ssh_hetzner_storagebox -p23"
export BORG_PASSPHRASE="$(gopass show cloud/hetzner/storagebox_borg)"
