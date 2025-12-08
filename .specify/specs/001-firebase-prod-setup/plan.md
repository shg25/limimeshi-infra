# Implementation Plan: Firebase本番環境構築

**Branch**: `feature/firebase-prod-setup` | **Date**: 2025-12-08 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-firebase-prod-setup/spec.md`  

## Summary

Firebase本番環境（limimeshi-prod）をTerraformとCLIツールを組み合わせて構築する

GCPプロジェクト作成→Firebase/Firestore有効化→Rules/Indexesデプロイ→管理者設定の順で進める

## Technical Context

**Language/Version**: HCL (Terraform), JavaScript (Node.js)  
**Primary Dependencies**: Terraform (~> 1.0), google-beta provider (~> 5.0), firebase-admin  
**Storage**: Firestore（asia-northeast1）  
**Testing**: gcloud/firebase CLI での手動確認  
**Target Platform**: GCP/Firebase  
**Project Type**: Infrastructure as Code  
**Performance Goals**: N/A（インフラ構築）  
**Constraints**: Firestoreロケーションは作成後変更不可  
**Scale/Scope**: 1プロジェクト、1 Firestoreデータベース  

## Constitution Check

- [x] Firebase-First: Firestore/Authenticationを使用
- [x] シンプルさ優先: 最小限の設定で構築
- [x] ドキュメント重視: README.md、roadmap.md、CHANGELOG.md更新

## Project Structure

### Documentation (this feature)

```text
.specify/specs/001-firebase-prod-setup/
├── spec.md              # 仕様書
├── plan.md              # 実装計画（このファイル）
├── tasks.md             # タスク一覧
└── checklist.md         # 完了チェックリスト
```

### Source Code (repository root)

```text
terraform/
├── main.tf                    # Firebase/Firestoreリソース定義
├── variables.tf               # 変数定義
├── outputs.tf                 # 出力定義
├── environments/
│   ├── dev.tfvars             # 開発環境変数
│   └── prod.tfvars            # 本番環境変数
├── .terraform.lock.hcl        # プロバイダーバージョンロック
├── .gitignore                 # tfstate除外
└── README.md                  # 使用方法

scripts/
└── set-admin-claim.js         # 管理者Claims設定（既存、環境変数対応追加）
```

**Structure Decision**：Terraformは`terraform/`ディレクトリに集約し、環境ごとの差分は`.tfvars`ファイルで管理

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Terraform使用 | 環境構築の再現性・変更管理 | 手動構築では変更履歴が残らない |
| Identity Platform手動設定 | TerraformでADC認証エラー | 自動化よりも確実性を優先 |

## Implementation Approach

### 自動化（Terraform + CLI）

- GCPプロジェクト作成: `gcloud`
- Firebase有効化: Terraform
- Firestore作成: Terraform
- Rules/Indexesデプロイ: Firebase CLI

### 手動（Firebase Console）

- Authentication Sign-in method設定
- 管理者ユーザー作成

### スクリプト

- 管理者Custom Claims設定: `set-admin-claim.js`

## Limitations

Terraformで自動化できない項目：

1. **Blazeプラン切り替え**：課金設定のためConsole必須
2. **Identity Platform**：ADC認証でクォータプロジェクトエラー
3. **Androidアプリ登録**：google-services.json生成のためConsole必須
