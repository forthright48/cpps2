#!/bin/bash

BOLD='\e[1;31m'      # Bold Red
REV='\e[1;32m'       # Bold Green
OFF='\e[0m'

TYPE=""
HELP="false"

#Help function
function HELP_DETAILS {
  echo -e "${REV}TYPE${OFF}: Can be one of dev, prod, beta, init, mongo or mongo-express"
  exit 1
}

while getopts hp:t: FLAG; do
  case $FLAG in
    h) HELP="true" ;;
    t) TYPE=$OPTARG ;;
    *) echo "Unexpected option" && HELP_DETAILS && exit 1 ;;
  esac
done

if [[ $HELP = "true" ]] ; then
  HELP_DETAILS
  exit 1
fi

if [[ $TYPE = "" ]] ; then
  echo -e "${BOLD}Error${OFF}: Type flag is required."
  HELP_DETAILS
  exit 1
fi

# Check if secret.js file exists
if [[ ! -f server/secret.js ]] ; then
  echo -e "${BOLD}File missing${OFF}: server/secret.js (Please read README.md)"
  exit 0
fi

if [[ $TYPE = "prod" || $TYPE = "beta" ]] ; then
  docker-compose down
  docker rmi $(docker images -f "dangling=true" -q)
  git pull origin
  if [[ $TYPE = "prod" ]] ; then
    git checkout master
  else
    git checkout release
  fi
  docker-compose build
  docker-compose up &
  sleep 5s
  docker cp server/secret.js cpps2_app_1:/home/src/server/
  docker exec -itd cpps2_app_1 /bin/bash -c "forever start server/index.js"
  docker exec -itd cpps2_app_1 forever start server/node_modules/queue/worker.js
elif [[ $TYPE = "dev" ]] ; then
  docker-compose down
  docker rmi $(docker images -f "dangling=true" -q)
  docker-compose build
  docker-compose up &
  sleep 5s
  docker cp server/secret.js cpps2_app_1:/home/src/server/
  docker exec -itd cpps2_app_1 /bin/bash -c "cd /root/src && node server/node_modules/queue/worker.js"
  docker exec -it cpps2_app_1 /bin/bash -c "cd /root/src && yarn install && nodemon server/index.js"
elif [[ $TYPE = "mongo" ]] ; then
  docker exec -it cpps2_db_1 mongo
elif [[ $TYPE = "mongo-express" ]] ; then
  docker run -it --rm \
      --name mongo-express \
      --network cpps2_ntw \
      --link cpps2_db_1:mongo \
      -p 8081:8081 \
      -e ME_CONFIG_OPTIONS_EDITORTHEME="ambiance" \
      mongo-express
elif [[ $TYPE = "init" ]] ; then
  docker exec -it cpps2_app_1 node server/scripts/dbInit.js
elif [[ $TYPE = "mongo-backup" ]]; then
  # Create backup and copy it out from docker
  # Run this from root folder
  docker exec -it cpps2_db_1 mongodump --db cpps2 --out /root/volumes/cpps2_db/`date +"%m-%d-%y"`
  docker cp cpps2_db_1:/root/volumes/cpps2_db ./backup/
  docker exec -it cpps2_db_1 rm -r /root/volumes/cpps2_db/`date +"%m-%d-%y"`
elif [[ $TYPE = "mongo-restore" ]]; then
  # Copy the backup file to docker into path /root/volumes/cpps2_db/restore/cpps2
  # docker cp <your_folder> cpps2_db_1:/root/volumes/cpps2_db/restore
  # Then run this command
  docker exec cpps2_db_1 rm -rf /root/volumes/cpps2_db/restore
  docker cp ./backup/restore cpps2_db_1:/root/volumes/cpps2_db/restore
  docker exec -it cpps2_db_1 mongorestore --db cpps2 --drop /root/volumes/cpps2_db/restore/cpps2/
elif [[ $TYPE = "kuejs" ]] ; then
  docker exec -it cpps2_app_1 node_modules/kue/bin/kue-dashboard -p 3050 -r redis://cpps2_redis_1:6379
elif [[ $TYPE = "redis-clean" ]] ; then
  docker exec -it cpps2_redis_1 redis-cli flushall
elif [[ $TYPE = "worker" ]] ; then
  docker exec -it cpps2_app_1 /bin/bash -c "cd /root/src && node server/node_modules/queue/worker.js"
elif [[ $TYPE = "stop" ]] ; then
  docker-compose down
  docker rmi $(docker images -f "dangling=true" -q)
else
    echo -e "${BOLD}Unknown Type${OFF}: $TYPE"
fi
