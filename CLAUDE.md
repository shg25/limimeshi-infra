# AI Agent Context: 期間限定めし（リミメシ）インフラ

このファイルはClaude CodeなどのAIエージェントがプロジェクトを効率的に理解するための情報です。

## 前提条件

このリポジトリは limimeshi-docs と同じ親ディレクトリに配置する必要がある：
```
parent-directory/
├── limimeshi-docs/    ← 必須
└── limimeshi-infra/
```

## ブランチ戦略

このリポジトリは**git-flow**を採用

### ブランチ構成
| ブランチ | 用途 |
|---------|------|
| `main` | 本番環境 |
| `develop` | 開発環境 |
| `feature/*` | 機能開発 |
| `release/*` | リリース準備 |
| `hotfix/*` | 緊急修正 |

### 基本フロー
1. `develop`から`feature/xxx`ブランチを作成
2. 作業完了後、`develop`へPR
3. リリース時は`release/x.x`→`main`にマージ

詳細は [CONTRIBUTING.md](https://github.com/shg25/limimeshi-docs/blob/main/CONTRIBUTING.md) を参照

## ディレクトリ構成（ガバナンス関連）

本リポジトリは limimeshi-docs のガバナンスルールに従う

### docs/
- `roadmap.md`：ロードマップ（実体、リポジトリ固有）
- `CHANGELOG.md`：変更履歴（実体、リポジトリ固有）
- `README.md`：ディレクトリ説明（コピー、編集不可）

### docs/adr/
- リポジトリ固有のADR（実体）
- `README.md`：ADR説明（コピー、編集不可）

### docs/governance/
- `docs-style-guide.md`：ドキュメント記述ルール（シンボリックリンク）
- `shared-rules.md`：複数リポジトリ共通ルール（シンボリックリンク）
- `README.md`：ガバナンス説明（コピー、編集不可）

### .claude/
Claude Code設定（シンボリックリンク）：
- `settings.json`：Hooks設定
- `commands/suggest-claude-md.md`
- `skills/`：Agent Skills

### .specify/
GitHub Spec Kit（仕様駆動開発）：
- `memory/constitution.md`：プロジェクトの憲法（実体、カスタマイズ可）
- `specs/`：機能仕様書（実体、リポジトリ固有）
- `.claude/commands/`：speckit-*コマンド（シンボリックリンク）
- `templates/`：仕様書テンプレート（シンボリックリンク）
- `README.md`：Spec Kit説明（コピー、編集不可）

### 同期について
- **シンボリックリンク**: limimeshi-docs更新で自動反映
- **READMEコピー**: limimeshi-docsから`/sync-shared-rules [リポジトリ名]`で同期
- **リポジトリ固有**: constitution.md、roadmap.md、CHANGELOG.md、specs/、adr/

---

## プロジェクト概要

**正式名称**: 期間限定めし（リミメシ）インフラ
**リポジトリ**: limimeshi-infra
**役割**: Firestore Rules、Indexes、データモデル設計の一元管理

## このリポジトリの責務

| 責務 | 説明 |
|------|------|
| Firestoreルール管理 | セキュリティルールの定義・デプロイ |
| インデックス管理 | 複合インデックスの定義・デプロイ |
| データモデル設計 | Firestoreスキーマ設計ドキュメント |
| 環境セットアップ | 本番環境構築ガイド |

## ディレクトリ構造

```
limimeshi-infra/
├── firestore.rules           # Firestoreセキュリティルール
├── firestore.indexes.json    # Firestore複合インデックス
├── firebase.json             # Firebase設定
├── .firebaserc               # Firebaseプロジェクト設定
├── data-model/               # データモデル設計
│   ├── firestore-collections.md
│   ├── security-rules.md
│   └── indexes.md
├── guides/                   # セットアップガイド
│   └── firebase-production-setup.md
├── scripts/                  # デプロイスクリプト
│   ├── deploy-dev.sh
│   └── deploy-prod.sh
└── docs/                     # ドキュメント
    ├── roadmap.md
    └── CHANGELOG.md
```

## デプロイ手順

### 開発環境

```bash
./scripts/deploy-dev.sh
```

### 本番環境

```bash
./scripts/deploy-prod.sh
```

## 重要な注意事項

- Firestore Rules変更時は全アプリへの影響を確認
- 本番デプロイ前に開発環境でテスト必須
- インデックス追加時はFirebase Console側で確認

---

**最終更新**: 2025/12/06
