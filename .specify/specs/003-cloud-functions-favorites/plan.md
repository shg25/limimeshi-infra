# Implementation Plan: Cloud Functions - お気に入りカウント同期

**Input**: spec.md
**Created**: 2025-12-16
**Status**: Completed

## Overview

お気に入り登録・解除時にチェーン店のfavoriteCountを自動更新するCloud Functionsを実装する。

## Implementation Steps

### Phase 1: Setup

1. **functionsディレクトリ作成**
   - `functions/` ディレクトリを作成
   - `src/` サブディレクトリを作成

2. **依存関係設定**
   - package.json作成（firebase-functions, firebase-admin, typescript）
   - tsconfig.json作成

3. **Firebase設定更新**
   - firebase.json に functions 設定を追加
   - .gitignore に functions/lib/ を追加

### Phase 2: Implementation

4. **onFavoriteCreated関数**
   - トリガー: `/users/{userId}/favorites/{chainId}` 作成時
   - 処理: `FieldValue.increment(1)` で favoriteCount を +1

5. **onFavoriteDeleted関数**
   - トリガー: `/users/{userId}/favorites/{chainId}` 削除時
   - 処理: `FieldValue.increment(-1)` で favoriteCount を -1

### Phase 3: Deploy & Verify

6. **ビルド確認**
   - `npm install` 実行
   - `npm run build` でTypeScriptコンパイル確認

7. **デプロイ**
   - `firebase deploy --only functions` 実行
   - Firebase Console で関数が表示されることを確認

8. **動作確認**
   - お気に入り登録 → favoriteCount +1 を確認
   - お気に入り解除 → favoriteCount -1 を確認

### Phase 4: Android Integration

9. **不要コード削除**
   - limimeshi-android の `tryUpdateChainFavoriteCount` を削除
   - Cloud Functionsが担当する旨のコメント追加

## Technical Decisions

### Cloud Functions Gen2 採用理由

- Firestore トリガーのネイティブサポート
- リージョン指定が容易
- 将来のスケーラビリティ

### リージョン選定

- `asia-northeast1`（東京）を使用
- Firestore と同じリージョンで低レイテンシ

### エラーハンドリング方針

- チェーンドキュメントが存在しない場合はログ出力のみ
- 処理は継続（他のお気に入り操作に影響しない）

---

**最終更新**: 2025/12/18
