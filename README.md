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

- このリポジトリは**git-flow**を採用
- 詳細は [CONTRIBUTING.md](https://github.com/shg25/limimeshi-docs/blob/main/CONTRIBUTING.md) を参照

| ブランチ | 用途 |
|---------|------|
| `main` | 本番環境 |
| `develop` | 開発環境（通常はここから作業） |
| `feature/*` | 機能開発 |

## Firebase環境

| 環境 | プロジェクトID | 用途 |
|------|---------------|------|
| dev | `limimeshi-dev` | 開発・テスト |
| prod | `limimeshi-prod` | 本番 |

### 使用中のFirebase機能

| 機能 | dev | prod | 備考 |
|------|-----|------|------|
| Authentication | ✅ | ✅ | メール/パスワード認証 |
| Firestore | ✅ | ✅ | asia-northeast1（東京） |
| Hosting | ✅ | - | 管理画面（limimeshi-admin） |

### プラン

- 両環境とも **Sparkプラン（無料）** で運用中
- Cloud Functions等が必要になった場合はBlazeプランへ切り替え

## ディレクトリ構成

### Firebase設定（デプロイ対象）

| ファイル | 用途 |
|---------|------|
| `firestore.rules` | Firestoreセキュリティルール |
| `firestore.indexes.json` | Firestore複合インデックス |
| `firebase.json` | デプロイ設定 |
| `.firebaserc` | プロジェクト設定（dev/prod） |

### ドキュメント・スクリプト

| ディレクトリ | 内容 |
|-------------|------|
| `docs/data-model/` | データモデル設計 |
| `docs/guides/` | 本番環境セットアップガイド |
| `scripts/` | デプロイ・データ管理スクリプト |

## スクリプト

### デプロイ

```bash
./scripts/deploy-dev.sh   # 開発環境へデプロイ
./scripts/deploy-prod.sh  # 本番環境へデプロイ
```

### データ管理

```bash
# 管理者権限付与
node scripts/set-admin-claim.js <USER_UID>

# テストデータ管理
node scripts/seed-test-data.js   # 投入（16チェーン店 + キャンペーン）
node scripts/clear-test-data.js  # 削除
```

## 開発手法：Spec-Driven Development

本プロジェクトは **GitHub Spec Kit** による仕様駆動開発を採用

- **仕様が王様、コードは従者**：spec.mdが唯一の信頼できる情報源
- 全ての機能は`.specify/specs/`の仕様書から開始
- 進捗は`docs/roadmap.md`と`docs/CHANGELOG.md`で管理

### ワークフロー

```
1. /speckit-specify → spec.md（仕様書）を作成
2. /speckit-plan → plan.md + tasks.md（実装計画）を作成
3. /speckit-implement → tasks.md の順序に従って実装
4. /speckit-checklist → 完了確認
```

詳細：`.specify/README.md`、`.specify/memory/constitution.md`

## 関連リポジトリ

- [limimeshi-docs](https://github.com/shg25/limimeshi-docs): 企画・設計ドキュメント
- [limimeshi-admin](https://github.com/shg25/limimeshi-admin): 管理画面
- [limimeshi-android](https://github.com/shg25/limimeshi-android): Androidアプリ
