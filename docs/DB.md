# Dynamodbの設計

## アクセスパターン

| アクセスパターン | 優先度 | 読み書き | 説明 | Type | Filters | 並び替え |
|----------------- | ----- | --------- | --- | -- | ---------| ---------|
| テーマ一覧を取得する | high | Read | テーマリストを取得する | Multiple Items | ALL | N/A |
| テーマを追加する | middle | Write | テーマを新しく追加する | Single Item | N/A | N/A |
| テーマのタイトルを変更する | low | Write | テーマのタイトルを変更する | Single Item | theme = XYZ | N/A |
| コメント一覧を取得する| high | Read | テーマを選んでコメント一覧を表示させる| Multiple Items | theme = XYZ | register_date ASC|
| コメントを追加する | middle | Write| テーマに対してコメントを１つ追加する | Single Item | N/A | N/A |

## データモデル

- パーティションキー：theme.id
- ソートキー：register_date

| Partition | Sort |  a | b |  -- | 
|----------- | ---- | -- | --|  -- | 
| entity_id | sort  | date | -- |  -- | 
| theme_0001 | theme_0001 | title <br> アイディアノートアプリ | -- | 
| comment_0001  | theme_0001 | 2023/02/01 11:00:00 | theme_id <br> theme_0001 | comment <br> ○○してみるもの面白そう |

GSI1（テーマリスト）

| partition | sort| 
| -- | -- | 
| theme_id | title |
| theme_0001 | title <br> アイディアノートアプリ |
| theme_0002 | title  <br> ああああ|

GSI2 コメント一覧
| partition | sort | --- | 
| ---       | ----  | ----  |
| theme_0001 | 2023/02/01 11:00:00 | comment <br> ○○してみるもの面白そう |

