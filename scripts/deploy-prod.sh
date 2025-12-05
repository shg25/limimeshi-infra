#!/bin/bash
# 本番環境へのFirestore Rules/Indexesデプロイ
# 注意: 本番環境へのデプロイは慎重に行うこと

set -e

echo "=== Deploying to PROD environment ==="
echo "WARNING: This will deploy to PRODUCTION environment!"
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Deploy cancelled."
    exit 1
fi

# プロジェクト確認
firebase use prod

# Firestore Rules と Indexes をデプロイ
firebase deploy --only firestore

echo "=== Deploy to PROD completed ==="
