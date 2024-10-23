=======================================================
Steps to Standup the Asset Maintenance App on Ubuntu 22.04 LTS Headless
=======================================================
sudo apt update;sudo apt upgrade
sudo apt install git
cd ~
git clone https://github.com/Squidbuf/asset_maintenance_request.git
cd asset_maintenance_request
=======================================================
sudo apt install -y python3 python3-pip
sudo apt install python3.10-venv
sudo apt install redis-server redis-tools
sudo apt install mysql-client-8.0 mysql-server-8.0 mysql-common
pip3 --version
sudo pip3 install frappe-bench
=======================================================
sudo apt install -y curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
================
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
==================
source ~/.profile
nvm install 18
sudo apt-get install npm
sudo npm install -g yarn
=======================================================
sudo chmod -R 775 asset_maintenance_request/
sudo chown -R ${User}:root asset_maintenance_request/
=======================================================
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
source ~/.nvm/nvm.sh
nvm install 18
nvm use 18
node -v
=======================================================
bench init --frappe-branch version-15 frappe-bench
cd frappe-bench/
bench new-site project.site
bench get-app --branch version-15 erpnext
=======================================================
