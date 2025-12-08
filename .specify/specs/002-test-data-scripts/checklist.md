# Completion Checklist: テストデータ管理スクリプト

**Purpose**: スクリプト実装の完了確認  
**Created**: 2025-12-06  
**Feature**: [spec.md](./spec.md)  

## スクリプトファイル

- [x] CHK001 `scripts/seed-test-data.js`が作成されている
- [x] CHK002 `scripts/clear-test-data.js`が作成されている
- [x] CHK003 両スクリプトにJSDocコメントがある

## データ投入スクリプト

- [x] CHK004 チェーン店16件のデータが定義されている
- [x] CHK005 キャンペーン32件のデータが定義されている
- [x] CHK006 チェーン店は固定IDで投入される
- [x] CHK007 キャンペーンは自動IDで投入される
- [x] CHK008 createdAt/updatedAtが設定される
- [x] CHK009 進捗がコンソールに表示される

## データ削除スクリプト

- [x] CHK010 chains/campaignsコレクションを削除できる
- [x] CHK011 バッチ処理で一括削除される
- [x] CHK012 削除件数がコンソールに表示される
- [x] CHK013 対象プロジェクトの警告が表示される

## セキュリティ

- [x] CHK014 プロジェクトIDが`limimeshi-dev`にハードコードされている
- [x] CHK015 本番環境で誤実行しないよう警告コメントがある
- [x] CHK016 認証情報がスクリプトに含まれていない（ADC使用）

## ドキュメント

- [x] CHK017 README.mdに使用方法が記載されている
- [x] CHK018 各スクリプトに事前準備が記載されている

## Git

- [ ] CHK019 `feature/test-data-scripts`ブランチで作業されている
- [ ] CHK020 変更がコミットされている
- [ ] CHK021 `develop`ブランチにマージされている

## 検証コマンド

```bash
# データ投入テスト
node scripts/seed-test-data.js

# データ削除テスト
node scripts/clear-test-data.js

# Firebase Consoleで確認
# https://console.firebase.google.com/project/limimeshi-dev/firestore
```

## Notes

- 本番環境への投入は手動でプロジェクトID書き換えが必要
- 削除スクリプトは開発環境専用（本番では使用禁止）
