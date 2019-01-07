# ServeRX-serverless

This app is an example of a serverless deployment of [ServeRX-ts](https://github.com/mflorence99/serverx-ts).

> [serverless](https://serverless.com/) must be installed.

To deploy, first modify `serverless.yml` appropriately. Then:

```sh
  npm install
  npm run deploy
```

> Be sure to include the following options in `tsconfig.json` when you build [ServeRX-ts](https://github.com/mflorence99/serverx-ts) applications:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
  }
}
```

See https://xgbb3jvk6h.execute-api.us-east-1.amazonaws.com/dev/openapi.yml for the sample in action.
