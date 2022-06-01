#!/bin/bash
cd /home/ubuntu/super-g/server
apt-get update
apt-get upgrade -y
apt-get dist-upgrade -y
apt-get autoremove -y
apt-get install nodejs npm git -y
ln -s /usr/bin/nodejs /usr/bin/node
npm install