/**
 * Cloud Functions ユニットテスト
 *
 * firebase-functions-test v3 + Cloud Functions v2のテスト
 * ハンドラ関数を直接テストするアプローチを採用
 */

// モック用のFirestore
const mockUpdate = jest.fn();
const mockDoc = jest.fn(() => ({ update: mockUpdate }));
const mockCollection = jest.fn(() => ({ doc: mockDoc }));

// firebase-admin/appのモック
jest.mock("firebase-admin/app", () => ({
  initializeApp: jest.fn(),
}));

// firebase-admin/firestoreのモック
jest.mock("firebase-admin/firestore", () => ({
  getFirestore: jest.fn(() => ({
    collection: mockCollection,
  })),
  FieldValue: {
    increment: jest.fn((n: number) => ({ _increment: n })),
    serverTimestamp: jest.fn(() => ({ _serverTimestamp: true })),
  },
}));

// firebase-functions/v2/firestoreのモック
jest.mock("firebase-functions/v2/firestore", () => ({
  onDocumentCreated: jest.fn((_options, handler) => handler),
  onDocumentDeleted: jest.fn((_options, handler) => handler),
}));

import { FieldValue } from "firebase-admin/firestore";
import { onFavoriteCreated, onFavoriteDeleted } from "./index";

describe("Cloud Functions - お気に入りカウント同期", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpdate.mockResolvedValue(undefined);
  });

  describe("onFavoriteCreated", () => {
    it("お気に入り登録時にfavoriteCountを+1する", async () => {
      // Arrange
      const chainId = "chain-001";
      const userId = "user-001";

      const event = {
        params: { userId, chainId },
      };

      // Act
      await (onFavoriteCreated as (event: unknown) => Promise<void>)(event);

      // Assert
      expect(mockCollection).toHaveBeenCalledWith("chains");
      expect(mockDoc).toHaveBeenCalledWith(chainId);
      expect(mockUpdate).toHaveBeenCalledWith({
        favoriteCount: FieldValue.increment(1),
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    it("異なるchainIdでも正しく動作する", async () => {
      // Arrange
      const chainId = "chain-xyz-123";
      const userId = "user-abc";

      const event = {
        params: { userId, chainId },
      };

      // Act
      await (onFavoriteCreated as (event: unknown) => Promise<void>)(event);

      // Assert
      expect(mockDoc).toHaveBeenCalledWith(chainId);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });

    it("チェーンドキュメントが存在しない場合はエラーをログ出力して継続", async () => {
      // Arrange
      const chainId = "non-existent-chain";
      const userId = "user-001";
      const error = new Error("Document not found");

      mockUpdate.mockRejectedValue(error);
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const event = {
        params: { userId, chainId },
      };

      // Act - エラーが投げられないことを確認
      await expect(
        (onFavoriteCreated as (event: unknown) => Promise<void>)(event)
      ).resolves.not.toThrow();

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        `Failed to increment favoriteCount for chain: ${chainId}`,
        error
      );

      consoleSpy.mockRestore();
    });
  });

  describe("onFavoriteDeleted", () => {
    it("お気に入り解除時にfavoriteCountを-1する", async () => {
      // Arrange
      const chainId = "chain-002";
      const userId = "user-001";

      const event = {
        params: { userId, chainId },
      };

      // Act
      await (onFavoriteDeleted as (event: unknown) => Promise<void>)(event);

      // Assert
      expect(mockCollection).toHaveBeenCalledWith("chains");
      expect(mockDoc).toHaveBeenCalledWith(chainId);
      expect(mockUpdate).toHaveBeenCalledWith({
        favoriteCount: FieldValue.increment(-1),
        updatedAt: FieldValue.serverTimestamp(),
      });
    });

    it("異なるchainIdでも正しく動作する", async () => {
      // Arrange
      const chainId = "chain-abc-999";
      const userId = "user-xyz";

      const event = {
        params: { userId, chainId },
      };

      // Act
      await (onFavoriteDeleted as (event: unknown) => Promise<void>)(event);

      // Assert
      expect(mockDoc).toHaveBeenCalledWith(chainId);
      expect(mockUpdate).toHaveBeenCalledTimes(1);
    });

    it("チェーンドキュメントが存在しない場合はエラーをログ出力して継続", async () => {
      // Arrange
      const chainId = "non-existent-chain";
      const userId = "user-001";
      const error = new Error("Document not found");

      mockUpdate.mockRejectedValue(error);
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const event = {
        params: { userId, chainId },
      };

      // Act - エラーが投げられないことを確認
      await expect(
        (onFavoriteDeleted as (event: unknown) => Promise<void>)(event)
      ).resolves.not.toThrow();

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        `Failed to decrement favoriteCount for chain: ${chainId}`,
        error
      );

      consoleSpy.mockRestore();
    });
  });
});
