#!/bin/bash

curl -X PATCH https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/images/v1/config \
    -H "Authorization: Bearer $CF_IMAGES_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data '{"flexible_variants": true}'
