# Tasks: Firebase本番環境構築

**Input**: Design documents from `/specs/001-firebase-prod-setup/`
**Prerequisites**: plan.md (required), spec.md (required)

## Format: `[ID] [Status] Description`

- **[x]**: 完了
- **[ ]**: 未完了

---

## Phase 1: Setup（準備）

**Purpose**: Terraform設定ファイルの作成

- [x] T001 `terraform/`ディレクトリ作成
- [x] T002 `terraform/main.tf`作成（Firebase/Firestoreリソース定義）
- [x] T003 `terraform/variables.tf`作成（変数定義）
- [x] T004 `terraform/outputs.tf`作成（出力定義）
- [x] T005 `terraform/environments/dev.tfvars`作成
- [x] T006 `terraform/environments/prod.tfvars`作成
- [x] T007 `terraform/.gitignore`作成（tfstate除外）

**Checkpoint**: Terraform設定ファイルが揃った

---

## Phase 2: GCPプロジェクト作成

**Purpose**: 本番環境の器を作成

- [x] T008 `gcloud projects create limimeshi-prod`でプロジェクト作成
- [x] T009 Firebase/Firestore/Identity Toolkit APIを有効化

**Checkpoint**: GCPプロジェクトが利用可能

---

## Phase 3: User Story 1 - Firebase/Firestore構築 (Priority: P1)

**Goal**: Terraform + CLIで本番環境を構築

- [x] T010 `terraform init`でプロバイダー初期化
- [x] T011 `terraform plan -var-file=environments/prod.tfvars`で計画確認
- [x] T012 `terraform apply`でFirebase/Firestore作成
- [x] T013 Identity Platform設定をmain.tfからコメントアウト（手動対応へ変更）
- [x] T014 Firebase Console でAuthentication（メール/パスワード）有効化
- [x] T015 `firebase deploy --only firestore`でRules/Indexesデプロイ

**Checkpoint**: Firestore/Authenticationが利用可能

---

## Phase 4: User Story 3 - 管理者設定 (Priority: P3)

**Goal**: 管理者ユーザーを本番環境で利用可能に

- [x] T016 Firebase Consoleで管理者ユーザー作成
- [x] T017 `scripts/set-admin-claim.js`を環境変数対応に修正
- [x] T018 `GCLOUD_PROJECT=limimeshi-prod node scripts/set-admin-claim.js <UID>`実行

**Checkpoint**: 管理者がAdmin権限を持つ

---

## Phase 5: ドキュメント・整備

**Purpose**: 変更内容の記録と整備

- [x] T019 `terraform/README.md`作成
- [x] T020 ルート`.gitignore`作成（node_modules除外）
- [x] T021 `terraform/.gitignore`から`.terraform.lock.hcl`を除外
- [x] T022 `README.md`にFirebase環境情報を追加
- [x] T023 `docs/roadmap.md`更新
- [x] T024 `docs/CHANGELOG.md`更新
- [x] T025 featureブランチ作成・コミット

**Checkpoint**: 全ての変更がGitで管理されている

---

## Phase 6: Spec Kit（逆算）

**Purpose**: 実施した作業をSpec Kit形式で記録

- [x] T026 `.specify/specs/001-firebase-prod-setup/`ディレクトリ作成
- [x] T027 `spec.md`作成（仕様書）
- [x] T028 `plan.md`作成（実装計画）
- [x] T029 `tasks.md`作成（このファイル）
- [ ] T030 `checklist.md`作成（完了チェックリスト）
- [ ] T031 Spec Kit追加をコミット

**Checkpoint**: Spec Kitドキュメントが完備

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 依存なし
- **Phase 2 (GCPプロジェクト)**: Phase 1完了後
- **Phase 3 (Firebase/Firestore)**: Phase 2完了後
- **Phase 4 (管理者設定)**: Phase 3完了後
- **Phase 5 (ドキュメント)**: Phase 4完了後
- **Phase 6 (Spec Kit)**: Phase 5完了後

### 実際の実行順

1. Phase 1-5を実施（Spec Kitなしで進行）
2. Phase 6で逆算してSpec Kit作成
