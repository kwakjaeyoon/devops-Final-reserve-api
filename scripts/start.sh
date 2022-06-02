#!/bin/bash
cd /home/ubuntu/super-g/server

source /opt/env_elastic_host
source /opt/env_elastic_pass
source /opt/env_redis_host
source /opt/env_db_endpoint
source /opt/env_db_port
source /opt/env_db_user
source /opt/env_db_pass
source /opt/env_db_use
source /opt/env_server_port
# source /opt/env_access_key
# source /opt/env_secret_key
source /opt/env_notify_url

pm2 start npm -- start