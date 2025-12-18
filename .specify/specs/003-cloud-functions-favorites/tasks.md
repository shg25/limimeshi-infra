# Tasks: Cloud Functions - お気に入りカウント同期

**Input**: spec.md

## タスク一覧

### Setup

- [x] T001 functionsディレクトリ作成
- [x] T002 package.json作成（firebase-functions, firebase-admin, typescript）
- [x] T003 tsconfig.json作成
- [x] T004 firebase.json更新（functions設定追加）
- [x] T005 .gitignore更新（functions/lib/追加）

### Implementation

- [x] T006 onFavoriteCreated関数実装（/users/{userId}/favorites/{chainId}作成時）
- [x] T007 onFavoriteDeleted関数実装（/users/{userId}/favorites/{chainId}削除時）
- [x] T008 npm install & ビルド確認

### Deploy

- [x] T009 Cloud Functionsデプロイ（firebase deploy --only functions）
- [x] T010 動作確認（Firebase Console）

### Android側対応

- [x] T011 tryUpdateChainFavoriteCount削除（limimeshi-android）
- [x] T012 動作確認（アプリからお気に入り登録・解除）

---

**最終更新**: 2025/12/18
