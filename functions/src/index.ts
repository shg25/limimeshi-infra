import { onDocumentCreated, onDocumentDeleted } from "firebase-functions/v2/firestore";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Firebase Admin SDK 初期化
initializeApp();
const db = getFirestore();

// Firestoreと同じリージョンを使用
const REGION = "asia-northeast1";

/**
 * お気に入り登録時にチェーンのfavoriteCountを+1
 *
 * トリガー: /users/{userId}/favorites/{chainId} 作成時
 */
export const onFavoriteCreated = onDocumentCreated(
  {
    document: "users/{userId}/favorites/{chainId}",
    region: REGION,
  },
  async (event) => {
    const chainId = event.params.chainId;

    try {
      await db.collection("chains").doc(chainId).update({
        favoriteCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      });
      console.log(`favoriteCount +1 for chain: ${chainId}`);
    } catch (error) {
      console.error(`Failed to increment favoriteCount for chain: ${chainId}`, error);
    }
  }
);

/**
 * お気に入り解除時にチェーンのfavoriteCountを-1
 *
 * トリガー: /users/{userId}/favorites/{chainId} 削除時
 */
export const onFavoriteDeleted = onDocumentDeleted(
  {
    document: "users/{userId}/favorites/{chainId}",
    region: REGION,
  },
  async (event) => {
    const chainId = event.params.chainId;

    try {
      await db.collection("chains").doc(chainId).update({
        favoriteCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      });
      console.log(`favoriteCount -1 for chain: ${chainId}`);
    } catch (error) {
      console.error(`Failed to decrement favoriteCount for chain: ${chainId}`, error);
    }
  }
);