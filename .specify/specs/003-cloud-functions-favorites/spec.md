# Feature Specification: Cloud Functions - お気に入りカウント同期

**Feature Branch**: `feature/cloud-functions-favorites`
**Created**: 2025-12-16
**Status**: In Progress
**Input**: User description: "お気に入り登録・解除時にチェーン店のfavoriteCountを自動更新するCloud Functionsを作成する"

## User Scenarios & Testing

### User Story 1 - お気に入り登録時にカウントを自動増加 (Priority: P1)

ユーザーとして、チェーン店をお気に入り登録すると、そのチェーンのfavoriteCountが自動的に+1されてほしい

これによりセキュリティを維持しながらカウントの一貫性が保たれる

**Why this priority**: Firestoreセキュリティルールで一般ユーザーがchainsコレクションを更新できないため、Cloud Functionsが必須

**Independent Test**: お気に入り登録後、Firebase Consoleで該当チェーンのfavoriteCountが+1されていることを確認

**Acceptance Scenarios**:

1. **Given** ユーザーがログイン済み, **When** チェーン店をお気に入り登録, **Then** `/chains/{chainId}/favoriteCount`が+1される
2. **Given** favoriteCountが0のチェーン, **When** お気に入り登録, **Then** favoriteCountが1になる
3. **Given** Cloud Functionsがデプロイ済み, **When** `/users/{userId}/favorites/{chainId}`にドキュメント作成, **Then** 5秒以内にfavoriteCountが更新される

---

### User Story 2 - お気に入り解除時にカウントを自動減少 (Priority: P1)

ユーザーとして、チェーン店のお気に入りを解除すると、そのチェーンのfavoriteCountが自動的に-1されてほしい

**Why this priority**: 登録と同様、解除時もCloud Functionsが必須

**Independent Test**: お気に入り解除後、Firebase Consoleで該当チェーンのfavoriteCountが-1されていることを確認

**Acceptance Scenarios**:

1. **Given** ユーザーがお気に入り登録済み, **When** お気に入り解除, **Then** `/chains/{chainId}/favoriteCount`が-1される
2. **Given** favoriteCountが1のチェーン, **When** お気に入り解除, **Then** favoriteCountが0になる

---

## Requirements

### Functional Requirements

- **FR-001**: システムは`/users/{userId}/favorites/{chainId}`作成時に`/chains/{chainId}/favoriteCount`を+1しなければならない
- **FR-002**: システムは`/users/{userId}/favorites/{chainId}`削除時に`/chains/{chainId}/favoriteCount`を-1しなければならない
- **FR-003**: カウント更新は5秒以内に完了しなければならない
- **FR-004**: チェーンドキュメントが存在しない場合、エラーをログに出力し処理を継続しなければならない

### Non-Functional Requirements

- **NFR-001**: Cloud Functions Gen2を使用する
- **NFR-002**: リージョンは`asia-northeast1`を使用する（Firestoreと同じ）

## Technical Design

### トリガー

| 関数名 | トリガー | 処理 |
|--------|---------|------|
| `onFavoriteCreated` | `/users/{userId}/favorites/{chainId}` 作成 | favoriteCount +1 |
| `onFavoriteDeleted` | `/users/{userId}/favorites/{chainId}` 削除 | favoriteCount -1 |

### ディレクトリ構成

```
functions/
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
```

## Out of Scope

- バッチ処理による整合性チェック（Phase3以降）
- favoriteCountのマイナス値防止（現時点では信頼）
