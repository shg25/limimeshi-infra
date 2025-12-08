# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/ja/).

## [Unreleased]

### Added
- 本番環境（limimeshi-prod）構築
  - GCPプロジェクト作成
  - Terraform設定（Firebase/Firestore）
  - Authentication（メール/パスワード）有効化
  - Firestore Rules/Indexesデプロイ
  - 管理者Custom Claims設定
- Terraform設定ファイル追加（`terraform/`）
- ルートに`.gitignore`追加（node_modules除外）
- `terraform/README.md`追加

### Changed
- `scripts/set-admin-claim.js`：環境変数でプロジェクト切り替え可能に
- `README.md`：Firebase環境情報を追加

## [0.1.0] - 2025-12-06

### Added
- 初期セットアップ
- Firestore Rules/Indexes移行（limimeshi-adminから）
- データモデル設計移行（limimeshi-docsから）
- 本番環境セットアップガイド移行
- デプロイスクリプト（deploy-dev.sh、deploy-prod.sh）
- データ管理スクリプト（seed-test-data.js、clear-test-data.js、set-admin-claim.js）
