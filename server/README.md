# バックエンドのデプロイ方法

AWS apigateway(congnito) + lambda(layer) + Dynamodb

```
cd server
sam build
sam deploy --guided --config-file samconfig.toml
```

本番：samconfig.toml
STG：samconfig-stg.toml
