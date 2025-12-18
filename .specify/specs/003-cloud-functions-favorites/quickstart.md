# Quickstart: Cloud Functions - お気に入りカウント同期

**Input**: spec.md, plan.md

## 概要

お気に入り登録・解除時にチェーンのfavoriteCountを自動更新するCloud Functions。

## ディレクトリ構成

```
limimeshi-infra/
├── functions/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts          # Cloud Functions実装
├── firebase.json             # functions設定追加済み
└── .specify/specs/003-cloud-functions-favorites/
    ├── spec.md
    ├── plan.md
    ├── tasks.md
    ├── research.md
    └── quickstart.md
```

## 関数一覧

| 関数名 | トリガー | 処理 |
|--------|----------|------|
| `onFavoriteCreated` | `/users/{userId}/favorites/{chainId}` 作成 | favoriteCount +1 |
| `onFavoriteDeleted` | `/users/{userId}/favorites/{chainId}` 削除 | favoriteCount -1 |

## 開発コマンド

```bash
# 依存関係インストール
cd functions && npm install

# ビルド
npm run build

# デプロイ（開発環境）
firebase use limimeshi-dev
firebase deploy --only functions

# デプロイ（本番環境）
firebase use limimeshi-prod
firebase deploy --only functions

# ログ確認
firebase functions:log
```

## 動作確認手順

1. Firebase Console → Firestore → `/users/{userId}/favorites` を開く
2. 新しいドキュメントを追加（chainIdを指定）
3. `/chains/{chainId}` の favoriteCount が +1 されることを確認
4. ドキュメントを削除
5. `/chains/{chainId}` の favoriteCount が -1 されることを確認

## Android連携

- Android側の `tryUpdateChainFavoriteCount` は削除済み
- Cloud Functions が自動的にカウントを更新
- Optimistic UI（Android側）との組み合わせで即時反映を実現

## トラブルシューティング

### デプロイエラー: Blazeプラン必要

```
Error: Your project must be on the Blaze (pay-as-you-go) plan
```

→ Firebase Console でBlazeプランにアップグレード

### 初回デプロイ: Eventarc権限エラー

```
Error: Permission denied while using the Eventarc Service Agent
```

→ 60秒待ってリトライ（初回セットアップの遅延）

### カウントが更新されない

1. Firebase Console → Functions でエラーログを確認
2. チェーンドキュメント（/chains/{chainId}）が存在するか確認
3. リージョンが `asia-northeast1` になっているか確認

---

**最終更新**: 2025/12/18
