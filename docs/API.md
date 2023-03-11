# API 設計書

## theme取得API

url = BASE/themes<br>
method = GET

## theme登録API

url = BASE/themes<br>
method = POST

### Request

| name | parameter | format|
| -- | --| --|
| タイトル名 | title | string |

### Response

| name | parameter | format|
| -- | --| --|
| テーマID | id | int |
| タイトル | title | string |


```

{
    "id" : 123,
    "title" : "最近の悩み事"
}

```

## theme変更API

url = BASE/themes/{id}
method = PUT

### Request

| name | parameter | format|
| -- | --| --|
| 対象テーマID | id | int |
| タイトル名 | title | string |

### Response

| name | parameter | format|
| -- | --| --|
| テーマID | id | int |
| タイトル | title | string |


```
{
    "id" : 123,
    "title" : "最近の悩み事"
}
```


## comment一覧取得API

url = BASE/comments/themes/{id}<br>
method = GET

### Response

| name | parameter | format |
| ---  | -----  | -----|
| コメントID | id | int |
| テーマID | theme_id | int |
| コメント | comment | string|

```
{
    "id" : 456,
    "theme_id" : 123,
    "comment": "ストレスたまってきてる"
}
```

## comment追加API

url = BASE/comments
method = POST

### Request

| name | parameter | format|
| -- | -- |-- |
| 対象テーマID | theme_id | int|
| コメント | comment | string |

### Response

| name | parameter | format |
| --| -- | --|
| コメントID | id | int |
| テーマID | theme_id | int |
| コメント | comment | string |

```
{
    "id" : 457,
    "theme_id" : 124,
    "comment" : "新しいコメント"
}
```

## comment更新API

url = BASE/comments/{id}<br>
method = PUT


## comment削除API

url = BASE/comments/{id}<br>
method = DELETE

