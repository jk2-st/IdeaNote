# API 設計書

## theme取得API
url = BASE/themes
method = GET

## theme登録API
url = BASE/themes
method = POST

| name | parameter | format|
| -- | --| --|
| タイトル名 | title | string |

## theme変更API
url = BASE/themes/{theme_id}
method = PUT

| name | parameter | format|
| -- | --| --|
| テーマID | theme_id | int |
| タイトル名 | title | string |

## comment一覧取得API
url = BASE/comments/theme/{theme_id}
method = GET

## comment追加API
url = BASE/comments
method = POST

| name | parameter | format| 
| -- | -- |-- |
| テーマID | theme_id | int| 
| コメント | comment| string | 
