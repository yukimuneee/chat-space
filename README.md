# README

# chat-space DB設計
## usersテーブル
| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| email    | string | null: false |
| password | string | null: false |
| username | string | null: false |
### Association
- has_many :messages
- has_many :users_groups
- has_many :groups,  through:  :users_groups

## messagesテーブル
| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| body     | text    |                                |
| image    | string  |                                |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
| Column | Type   | Options |
| ------ | ------ | ------- |
| name   | string |         |
### Association
- has_many :messages
- has_many :users_groups
- has_many  :users,  through:  :users_groups

## users_groupsテーブル
| Column   | Type    | Options                        |
| -------- | ------- | ------------------------------ |
| user_id  | integer | null: false, foreign_key: true |
| group_id | integer | null: false, foreign_key: true |
### Association
- belongs_to :user
- belongs_to :group
