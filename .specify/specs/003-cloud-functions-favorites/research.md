# Technical Research: Cloud Functions - お気に入りカウント同期

**Input**: spec.md
**Created**: 2025-12-16

## 調査項目

### 1. Firebase Cloud Functions Gen2

**概要**: Firebase Cloud Functions の第2世代。Cloud Run ベースで動作。

**メリット**:
- 最大1時間のタイムアウト（Gen1は9分）
- 最大32GBメモリ
- 同時実行数の柔軟な設定
- Firestoreトリガーのネイティブサポート

**採用決定**: Gen2を採用

### 2. Firestore Triggers

**onDocumentCreated**:
```typescript
import { onDocumentCreated } from "firebase-functions/v2/firestore";

export const myFunction = onDocumentCreated(
  "collection/{docId}",
  (event) => {
    const data = event.data?.data();
    const params = event.params;
  }
);
```

**onDocumentDeleted**:
```typescript
import { onDocumentDeleted } from "firebase-functions/v2/firestore";

export const myFunction = onDocumentDeleted(
  "collection/{docId}",
  (event) => {
    const params = event.params;
  }
);
```

### 3. FieldValue.increment

**使用方法**:
```typescript
import { FieldValue } from "firebase-admin/firestore";

await db.collection("chains").doc(chainId).update({
  favoriteCount: FieldValue.increment(1),
});
```

**特徴**:
- アトミック操作（競合状態を防ぐ）
- ドキュメントが存在しない場合はエラー
- 負の値への減少も可能（今回は許容）

### 4. リージョン設定

**Firestoreリージョン**: `asia-northeast1`

**Cloud Functionsリージョン**: 同じリージョンを推奨
- レイテンシ低減
- データ転送コスト削減

**設定方法**:
```typescript
export const myFunction = onDocumentCreated(
  {
    document: "path/{id}",
    region: "asia-northeast1",
  },
  async (event) => { ... }
);
```

### 5. 代替案の検討

| 方式 | メリット | デメリット |
|------|----------|-----------|
| Cloud Functions | セキュア、自動実行 | Blazeプラン必須 |
| セキュリティルール緩和 | 簡単 | セキュリティリスク |
| Optimistic UIのみ | コスト0 | データ不整合 |

**採用**: Cloud Functions（セキュリティ重視）

## 参考リンク

- [Cloud Functions for Firebase (2nd gen)](https://firebase.google.com/docs/functions/get-started?gen=2nd)
- [Firestore triggers](https://firebase.google.com/docs/functions/firestore-events?gen=2nd)
- [FieldValue.increment](https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore.fieldvalue.md#fieldvalueincrement)

---

**最終更新**: 2025/12/18
