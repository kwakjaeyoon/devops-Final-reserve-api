#!/bin/bash
cd /home/ubuntu/super-g/server
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs
npm install