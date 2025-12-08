# Feature Specification: テストデータ管理スクリプト

**Feature Branch**: `feature/test-data-scripts`  
**Created**: 2025-12-06  
**Status**: Completed  
**Input**: User description: "Firestoreにテストデータを投入・削除するスクリプトを作成する"  

## User Scenarios & Testing

### User Story 1 - テストデータを投入する (Priority: P1)

開発者として、開発環境のFirestoreにテストデータを投入したい

これにより開発・検証作業でリアルなデータを使った動作確認ができる

**Why this priority**：データがなければアプリの動作確認ができないため、最優先

**Independent Test**：スクリプト実行後、Firebase Consoleでチェーン店・キャンペーンデータが登録されていることを確認できる

**Acceptance Scenarios**:

1. **Given** ADC認証済み, **When** `node scripts/seed-test-data.js`を実行, **Then** チェーン店16件とキャンペーン32件が投入される
2. **Given** 既存データあり, **When** 同じIDで再投入, **Then** データが上書きされる（チェーン店は固定ID）

---

### User Story 2 - テストデータを削除する (Priority: P2)

開発者として、開発環境のテストデータを一括削除したい

これによりクリーンな状態からのテストや、データ再投入が可能になる

**Why this priority**：投入したデータを削除できないと、テストのやり直しが困難

**Independent Test**：スクリプト実行後、Firebase Consoleでchains/campaignsコレクションが空になっていることを確認できる

**Acceptance Scenarios**:

1. **Given** テストデータ投入済み, **When** `node scripts/clear-test-data.js`を実行, **Then** chains/campaignsの全データが削除される
2. **Given** データなし, **When** 削除スクリプト実行, **Then** エラーなく完了（0件削除）

---

### Edge Cases

- 認証されていない場合 → ADC認証エラーでスクリプト終了
- ネットワークエラー → Firebase SDKのエラーメッセージを表示
- 本番環境で誤実行 → プロジェクトIDがハードコードされているため、意図的に書き換えない限り実行されない

## Requirements

### Functional Requirements

- **FR-001**: System MUST チェーン店データ（16店舗）を投入できる
- **FR-002**: System MUST キャンペーンデータ（32件）を投入できる
- **FR-003**: System MUST チェーン店は固定ID（URL用）で管理する
- **FR-004**: System MUST キャンペーンは自動生成IDで管理する
- **FR-005**: System MUST chains/campaignsコレクションの全データを削除できる
- **FR-006**: System MUST ADC（Application Default Credentials）で認証する

### Key Entities

- **Chain**: チェーン店情報（id, name, furigana, officialUrl, favoriteCount, createdAt, updatedAt）
- **Campaign**: キャンペーン情報（chainId, name, description?, saleStartTime, saleEndTime?, createdAt, updatedAt）

## Success Criteria

### Measurable Outcomes

- **SC-001**: `seed-test-data.js`実行でチェーン店16件・キャンペーン32件が投入される
- **SC-002**: `clear-test-data.js`実行で全データが削除される
- **SC-003**: 投入データがFirestoreのデータモデル定義に準拠している
- **SC-004**: スクリプトが進捗・結果をコンソールに表示する
