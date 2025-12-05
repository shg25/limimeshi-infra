# 期間限定めし（リミメシ）インフラ

Firestore Rules、Indexes、データモデル設計の管理リポジトリ

## 前提条件

このリポジトリは limimeshi-docs と同じ親ディレクトリに配置する必要がある：
```
parent-directory/
├── limimeshi-docs/    ← 必須
└── limimeshi-infra/
```

## ブランチ戦略

このリポジトリは**git-flow**を採用。詳細は [CONTRIBUTING.md](https://github.com/shg25/limimeshi-docs/blob/main/CONTRIBUTING.md) を参照。

| ブランチ | 用途 |
|---------|------|
| `main` | 本番環境 |
| `develop` | 開発環境（通常はここから作業） |
| `feature/*` | 機能開発 |

## ディレクトリ構成

```
limimeshi-infra/
├── firestore.rules         # Firestoreセキュリティルール
├── firestore.indexes.json  # Firestore複合インデックス
├── firebase.json           # Firebase設定
├── data-model/             # データモデル設計ドキュメント
├── guides/                 # 本番環境セットアップガイド
└── scripts/                # デプロイスクリプト
```

## デプロイ

### 開発環境

```bash
./scripts/deploy-dev.sh
```

### 本番環境

```bash
./scripts/deploy-prod.sh
```

## 関連リポジトリ

- [limimeshi-docs](https://github.com/shg25/limimeshi-docs): 企画・設計ドキュメント
- [limimeshi-admin](https://github.com/shg25/limimeshi-admin): 管理画面
- [limimeshi-android](https://github.com/shg25/limimeshi-android): Androidアプリ
