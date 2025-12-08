# Completion Checklist: Firebase本番環境構築

**Purpose**: 本番環境構築の完了確認
**Created**: 2025-12-08
**Feature**: [spec.md](./spec.md)

## GCPプロジェクト

- [x] CHK001 `limimeshi-prod`プロジェクトが作成されている
- [x] CHK002 プロジェクトがACTIVE状態である
- [x] CHK003 Firebase APIが有効化されている
- [x] CHK004 Firestore APIが有効化されている
- [x] CHK005 Identity Toolkit APIが有効化されている

## Firestore

- [x] CHK006 Firestoreデータベースが作成されている
- [x] CHK007 ロケーションが`asia-northeast1`（東京）である
- [x] CHK008 タイプが`FIRESTORE_NATIVE`である
- [x] CHK009 Firestore Rulesがデプロイされている
- [x] CHK010 Firestore Indexesがデプロイされている

## Authentication

- [x] CHK011 Authenticationが有効化されている
- [x] CHK012 メール/パスワード認証が有効化されている
- [x] CHK013 管理者ユーザーが作成されている
- [x] CHK014 管理者ユーザーに`admin: true`のCustom Claimsが設定されている

## Terraform

- [x] CHK015 `terraform/main.tf`が作成されている
- [x] CHK016 `terraform/variables.tf`が作成されている
- [x] CHK017 `terraform/outputs.tf`が作成されている
- [x] CHK018 `terraform/environments/prod.tfvars`が作成されている
- [x] CHK019 `.terraform.lock.hcl`がGitに含まれている
- [x] CHK020 `terraform.tfstate`がGitから除外されている

## ドキュメント

- [x] CHK021 `terraform/README.md`が作成されている
- [x] CHK022 `README.md`にFirebase環境情報が記載されている
- [x] CHK023 `docs/roadmap.md`が更新されている
- [x] CHK024 `docs/CHANGELOG.md`が更新されている

## Git

- [x] CHK025 `feature/firebase-prod-setup`ブランチで作業されている
- [x] CHK026 変更がコミットされている
- [ ] CHK027 `develop`ブランチにマージされている

## 検証コマンド

```bash
# GCPプロジェクト確認
gcloud projects describe limimeshi-prod

# Firestore確認
gcloud firestore databases list --project=limimeshi-prod

# API有効化確認
gcloud services list --project=limimeshi-prod --enabled --filter="name:(firebase OR firestore OR identitytoolkit)"

# Firestore Indexes確認
firebase use prod && firebase firestore:indexes
```

## Notes

- Identity Platform（Authentication）はTerraformで問題が発生したため手動設定
- Blazeプランは現時点では不要（Sparkプランで運用）
- 本番HostingはlimimeshI-adminリポジトリで対応
