#!/bin/bash
# 開発環境へのFirestore Rules/Indexesデプロイ

set -e

echo "=== Deploying to DEV environment ==="

# プロジェクト確認
firebase use dev

# Firestore Rules と Indexes をデプロイ
firebase deploy --only firestore

echo "=== Deploy to DEV completed ==="
