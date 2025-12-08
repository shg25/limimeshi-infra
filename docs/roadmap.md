# limimeshi-infra ロードマップ

Firestore Rules、Indexes、データモデル設計の管理

## 現在のフェーズ

**Phase2: MVP実装**

## タスク一覧

### 進行中

（なし）

### 完了

- [x] リポジトリ作成
- [x] 初期セットアップ（/setup-new-repo）
- [x] Firestore Rules/Indexes移行（limimeshi-adminから）
- [x] データモデル設計移行（limimeshi-docsから）
- [x] 本番環境セットアップガイド移行（limimeshi-docsから）
- [x] デプロイスクリプト作成（deploy-dev.sh、deploy-prod.sh）
- [x] データ管理スクリプト移行（seed-test-data.js、clear-test-data.js、set-admin-claim.js）
- [x] ディレクトリ構成整理（docs/に集約）
- [x] 本番環境構築（limimeshi-prod）
  - [x] GCPプロジェクト作成
  - [x] Terraform設定（Firebase/Firestore）
  - [x] Authentication設定
  - [x] Firestore Rules/Indexesデプロイ
  - [x] 管理者Claims設定

### 今後の予定

- [ ] 本番Hosting設定（limimeshi-adminリポジトリで実施）
- [ ] テストデータ更新

## 更新履歴

- 2025/12/06：リポジトリ作成、初期セットアップ
- 2025/12/06：インフラ分離完了（Firestore設定、data-model、guides、scripts移行）
- 2025/12/08：本番環境構築（limimeshi-prod）

---

**最終更新**: 2025/12/08
