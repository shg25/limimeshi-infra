# Feature Specification: Firebase本番環境構築

**Feature Branch**: `feature/firebase-prod-setup`  
**Created**: 2025-12-08  
**Status**: Completed  
**Input**: User description: "Firebase本番環境（limimeshi-prod）をTerraformを使って構築する"  

## User Scenarios & Testing

### User Story 1 - 本番環境でFirebaseリソースを利用可能にする (Priority: P1)

開発者として、本番環境のFirebaseプロジェクトを作成し、Firestore/Authenticationを利用可能な状態にしたい

これにより本番リリースの準備が整う

**Why this priority**：本番リリースに必須の基盤であり、他の全ての作業の前提条件となる

**Independent Test**：Firebase Consoleで`limimeshi-prod`プロジェクトにアクセスし、FirestoreとAuthenticationが有効化されていることを確認できる

**Acceptance Scenarios**:

1. **Given** GCPアカウントにログイン済み, **When** `gcloud projects list`を実行, **Then** `limimeshi-prod`が表示される
2. **Given** `limimeshi-prod`プロジェクトが存在, **When** Firebase Consoleにアクセス, **Then** Firestoreが`asia-northeast1`で有効化されている
3. **Given** Firestoreが有効, **When** `firebase deploy --only firestore`を実行, **Then** Rules/Indexesがデプロイされる

---

### User Story 2 - Terraformで環境構築を再現可能にする (Priority: P2)

インフラ管理者として、Terraformコードで環境構築を管理したい

これにより環境構築の再現性が確保され、変更履歴がGitで追跡できる

**Why this priority**：再現性と変更管理はベストプラクティスだが、1回限りの構築なら手動でも可能

**Independent Test**：新規GCPプロジェクトに対して`terraform apply`を実行し、同等の環境が構築されることを確認できる

**Acceptance Scenarios**:

1. **Given** Terraform設定ファイルが存在, **When** `terraform plan`を実行, **Then** 作成されるリソースが表示される
2. **Given** 認証済みの状態, **When** `terraform apply`を実行, **Then** Firebase/Firestoreが作成される

---

### User Story 3 - 管理者ユーザーを本番環境で利用可能にする (Priority: P3)

管理者として、本番環境でAdmin権限を持つユーザーでログインしたい

これにより管理画面で本番データを操作できる

**Why this priority**：管理画面の本番運用に必要だが、環境構築後に実施可能

**Independent Test**：本番環境のAuthenticationで作成したユーザーで管理画面にログインし、Admin機能が使えることを確認

**Acceptance Scenarios**:

1. **Given** Authentication有効, **When** Firebase Consoleでユーザー作成, **Then** ユーザーが登録される
2. **Given** ユーザーが存在, **When** `set-admin-claim.js`を実行, **Then** Custom Claimsに`admin: true`が設定される

---

### Edge Cases

- GCPプロジェクトIDが既に使用されている場合 → 別の名前を使用
- Terraformで一部リソース作成失敗 → 手動で対応（Identity Platform等）
- Firestoreロケーション変更不可 → 作成時に正しいリージョンを指定

## Requirements

### Functional Requirements

- **FR-001**: System MUST GCPプロジェクト`limimeshi-prod`を作成
- **FR-002**: System MUST Firebase APIを有効化
- **FR-003**: System MUST Firestoreを`asia-northeast1`に作成
- **FR-004**: System MUST Authentication（メール/パスワード）を有効化
- **FR-005**: System MUST Firestore Rules/Indexesをデプロイ
- **FR-006**: System MUST 管理者ユーザーにCustom Claimsを設定

### Key Entities

- **GCPプロジェクト**: Firebase/GCPリソースのコンテナ
- **Firestoreデータベース**: ドキュメントデータベース（ロケーション固定）
- **Authentication**: ユーザー認証サービス
- **Custom Claims**: ユーザーに付与する権限情報

## Success Criteria

### Measurable Outcomes

- **SC-001**: `limimeshi-prod`プロジェクトがGCP/Firebaseで利用可能
- **SC-002**: Firestoreが東京リージョン（asia-northeast1）で稼働
- **SC-003**: Firestore Rules/Indexesが本番環境にデプロイ済み
- **SC-004**: 管理者ユーザーが`admin: true`のClaimsを持つ
- **SC-005**: Terraform設定がGitで管理され、再現可能
