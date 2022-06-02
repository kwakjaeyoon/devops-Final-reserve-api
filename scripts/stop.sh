#!/bin/bash
cd /home/ubuntu/super-g/server
pm2 stop npm 2> /dev/null || true
pm2 delete npm 2> /dev/null || true