#!/bin/bash
cd /home/ubuntu/super-g/server
apt update

apt install -y npm

nvm install node
npm cache clean --force
npm install -g n
n stable
npm install -g npm
nvm install 16.14.2
nvm use 16.14.2

npm install
npm install pm2@latest -g
apt install -y authbind
touch /etc/authbind/byport/3000
chown ubuntu /etc/authbind/byport/3000
chmod 755 /etc/authbind/byport/3000

