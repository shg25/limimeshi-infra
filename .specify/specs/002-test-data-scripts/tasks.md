# Tasks: テストデータ管理スクリプト

**Input**: Design documents from `/specs/002-test-data-scripts/`
**Prerequisites**: plan.md (required), spec.md (required)

## Format: `[ID] [Status] Description`

- **[x]**: 完了
- **[ ]**: 未完了

---

## Phase 1: Setup（準備）

**Purpose**: 依存パッケージの準備

- [x] T001 `package.json`にfirebase-admin依存を追加
- [x] T002 `npm install`で依存パッケージをインストール

**Checkpoint**: firebase-adminが利用可能

---

## Phase 2: User Story 1 - データ投入スクリプト (Priority: P1)

**Goal**: テストデータをFirestoreに投入できる

- [x] T003 `scripts/seed-test-data.js`を作成
- [x] T004 チェーン店データ（16件）を定義
- [x] T005 キャンペーンデータ（32件）を定義
- [x] T006 Firebase Admin SDK初期化処理を実装
- [x] T007 チェーン店データ投入処理を実装（固定ID）
- [x] T008 キャンペーンデータ投入処理を実装（自動ID）
- [x] T009 進捗・結果表示を実装

**Checkpoint**: スクリプト実行でデータが投入される

---

## Phase 3: User Story 2 - データ削除スクリプト (Priority: P2)

**Goal**: テストデータを一括削除できる

- [x] T010 `scripts/clear-test-data.js`を作成
- [x] T011 Firebase Admin SDK初期化処理を実装
- [x] T012 コレクション削除関数を実装（バッチ処理）
- [x] T013 chains/campaigns削除処理を実装
- [x] T014 進捗・結果表示を実装
- [x] T015 本番誤実行防止の警告メッセージを追加

**Checkpoint**: スクリプト実行でデータが削除される

---

## Phase 4: ドキュメント・整備

**Purpose**: 使用方法の記載

- [x] T016 README.mdにスクリプトの使い方を追記
- [x] T017 各スクリプトにJSDocコメントを追加

**Checkpoint**: 使用方法がドキュメント化されている

---

## Phase 5: Spec Kit（逆算）

**Purpose**: 実施した作業をSpec Kit形式で記録

- [x] T018 `.specify/specs/002-test-data-scripts/`ディレクトリ作成
- [x] T019 `spec.md`作成（仕様書）
- [x] T020 `plan.md`作成（実装計画）
- [x] T021 `tasks.md`作成（このファイル）
- [x] T022 `checklist.md`作成（完了チェックリスト）
- [ ] T023 Spec Kit追加をコミット

**Checkpoint**: Spec Kitドキュメントが完備

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: 依存なし
- **Phase 2 (データ投入)**: Phase 1完了後
- **Phase 3 (データ削除)**: Phase 1完了後（Phase 2と並行可能）
- **Phase 4 (ドキュメント)**: Phase 2, 3完了後
- **Phase 5 (Spec Kit)**: Phase 4完了後

### 実際の実行順

1. Phase 1-4を実施（Spec Kitなしで進行）
2. Phase 5で逆算してSpec Kit作成
