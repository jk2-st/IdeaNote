# API 設計書

## theme取得API
url = BASE/theme
method = GET

## theme変更API
url = BASE/theme/{theme_id}
method = PUT

| name | parameter | format|
| -- | --| --|
| テーマID | theme_id | int |
| タイトル名 | title | string |

## comment取得API
url = BASE/theme/{theme_id}
method = GET

## comment追加API
url = BASE/comment
method = POST

| name | parameter | format| 
| -- | -- |-- |
| テーマID | theme_id | int| 
| コメント | comment| string | 
