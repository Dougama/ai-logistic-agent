#!/bin/bash

# Validar el proyecto actual de gcloud
CURRENT_PROJECT=$(gcloud config get-value project)
EXPECTED_PROJECT="backend-developer-446300"
if [ "$CURRENT_PROJECT" != "$EXPECTED_PROJECT" ]; then
    echo "Error: El proyecto actual ($CURRENT_PROJECT) no coincide con $EXPECTED_PROJECT"
    echo "Por favor, ejecuta: gcloud config set project $EXPECTED_PROJECT"
    exit 1
fi
PROJECT_ID=$EXPECTED_PROJECT

pnpm --filter=indexer-service build
gcloud functions deploy pdfIndexer \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=./packages/indexer-service \
  --entry-point=pdfIndexer \
  --trigger-event-filters type=google.cloud.storage.object.v1.finalized \
  --trigger-event-filters bucket=ia-agent