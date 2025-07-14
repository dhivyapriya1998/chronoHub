
CACHE_OPTION=""
if [ "$2" != "cache" ]; then
  CACHE_OPTION="--no-cache"
fi

docker compose -f compose-mac.yml build $CACHE_OPTION $1 && \
docker compose -f compose-mac.yml down $1 && \
docker compose -f compose-mac.yml up $1 -d
