#!/bin/bash
cd /home/ubuntu
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs
npm install