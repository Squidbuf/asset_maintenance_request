# Asset Maintenance App Setup on Ubuntu 22.04 LTS Headless

Follow these steps to set up the Asset Maintenance App on a headless Ubuntu 22.04 LTS server.

```bash
## Update and Upgrade the System
sudo apt update
sudo apt upgrade

## Install Git

sudo apt install git

## Install Python and Related Packages

sudo apt install -y python3 python3-pip
sudo apt install python3.10-venv

## Install Redis

sudo apt install redis-server redis-tools

## Install MySQL

sudo apt install mysql-client-8.0 mysql-server-8.0 mysql-common

## Verify pip3 Installation

sudo pip3 --version

## Install Frappe Bench

sudo pip3 install frappe-bench

## Install curl

sudo apt install -y curl

## Install NVM (Node Version Manager)

curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
source ~/.profile
nvm install 18

## Install npm and yarn

sudo apt-get install npm
sudo npm install -g yarn

## Set Permissions for the Asset Maintenance Request Directory

sudo chmod -R 775 asset_maintenance_request/
sudo chown -R ${USER}:root asset_maintenance_request/

## Reinstall NVM (if necessary)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
source ~/.nvm/nvm.sh
nvm install 18
nvm use 18
node -v

## Initialize Frappe Bench

bench init --frappe-branch version-15 frappe-bench
cd frappe-bench/
bench new-site project.site
bench get-app --branch version-15 erpnext

## Start the Bench

bench start
