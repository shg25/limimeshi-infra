# Implementation Plan: テストデータ管理スクリプト

**Branch**: `feature/test-data-scripts` | **Date**: 2025-12-06 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-test-data-scripts/spec.md`  

## Summary

Firestoreにテストデータを投入・削除するNode.jsスクリプトを作成する

開発・検証用にチェーン店16件とキャンペーン32件のサンプルデータを管理する

## Technical Context

**Language/Version**: JavaScript (Node.js)  
**Primary Dependencies**: firebase-admin  
**Storage**: Firestore  
**Testing**: 手動確認（Firebase Console）  
**Target Platform**: ローカル開発環境  
**Project Type**: スクリプト  
**Performance Goals**: N/A  
**Constraints**: ADC認証必須、開発環境専用  
**Scale/Scope**: チェーン店16件、キャンペーン32件  

## Constitution Check

- [x] Firebase-First：Firestore/Admin SDKを使用
- [x] シンプルさ優先：単一ファイルのスクリプト
- [x] ドキュメント重視：README.mdに使用方法記載

## Project Structure

### Documentation (this feature)

```text
.specify/specs/002-test-data-scripts/
├── spec.md              # 仕様書
├── plan.md              # 実装計画（このファイル）
├── tasks.md             # タスク一覧
└── checklist.md         # 完了チェックリスト
```

### Source Code (repository root)

```text
scripts/
├── seed-test-data.js    # データ投入スクリプト
└── clear-test-data.js   # データ削除スクリプト
```

**Structure Decision**：単純なスクリプトのため`scripts/`ディレクトリに配置

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| なし | - | - |

## Implementation Approach

### データ投入（seed-test-data.js）

- Firebase Admin SDKでFirestoreに接続
- チェーン店データは固定ID（`doc(id).set()`）で投入
- キャンペーンデータは自動ID（`add()`）で投入
- 進捗をコンソールに表示

### データ削除（clear-test-data.js）

- chains/campaignsコレクションの全ドキュメントを取得
- バッチ処理で一括削除
- 本番環境での誤実行防止のためプロジェクトIDをハードコード

## Limitations

- 本番環境への投入は手動でプロジェクトID書き換えが必要
- 削除スクリプトは本番環境での実行を想定していない
- 500件以上のデータ削除はバッチ分割が必要（現状は不要）
