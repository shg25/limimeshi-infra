# Terraform

Firebase/GCPリソースをコードで管理するための設定ファイル群

## 概要

Terraformを使用して以下のリソースを管理：

| リソース | 説明 |
|----------|------|
| Firebase Project | Firebaseプロジェクトの有効化 |
| Firestore Database | Firestoreデータベースの作成 |

※ Authentication（Identity Platform）はTerraformで問題が発生するため、Firebase Consoleで手動設定

## ディレクトリ構成

```
terraform/
├── main.tf                    # メインの設定ファイル
├── variables.tf               # 変数定義
├── outputs.tf                 # 出力定義
├── environments/
│   ├── dev.tfvars             # 開発環境の変数
│   └── prod.tfvars            # 本番環境の変数
├── .terraform.lock.hcl        # プロバイダーバージョンロック
└── .gitignore                 # tfstate等を除外
```

## 使い方

### 前提条件

- Terraform CLI インストール済み（`brew install terraform`）
- gcloud 認証済み（`gcloud auth application-default login`）

### 初期化

```bash
cd terraform
terraform init
```

### プラン確認

```bash
# 開発環境
terraform plan -var-file=environments/dev.tfvars

# 本番環境
terraform plan -var-file=environments/prod.tfvars
```

### 適用

```bash
# 開発環境
terraform apply -var-file=environments/dev.tfvars

# 本番環境
terraform apply -var-file=environments/prod.tfvars
```

## 注意事項

- **tfstateファイルはGitに含めない**（`.gitignore`で除外済み）
- 本番環境への適用は慎重に（`terraform plan`で差分を必ず確認）
- Firestoreのロケーションは一度作成すると変更不可

## Terraformで管理できないもの

以下はFirebase ConsoleまたはFirebase CLIで設定

| 項目 | 設定方法 |
|------|----------|
| Blazeプラン切り替え | Firebase Console |
| Authentication Sign-in method | Firebase Console |
| Firestore Rules/Indexes | Firebase CLI（`firebase deploy --only firestore`） |
| 管理者Custom Claims | スクリプト（`scripts/set-admin-claim.js`） |
