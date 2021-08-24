# ServeRX-serverless

This app is an example of a serverless deployment of [ServeRX-ts](https://github.com/mflorence99/serverx-ts).

> [serverless](https://serverless.com/) must be installed.

> Be sure to include the following options in `tsconfig.json` when building [ServeRX-ts](https://github.com/mflorence99/serverx-ts) applications:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

## AWS Lambda

To deploy, first modify `aws.yml` appropriately. Then:

```sh
  npm install # one time only
  npm run deploy-aws
```

See https://g0776hjw2i.execute-api.us-east-1.amazonaws.com/dev/openapi.yml for the sample in action.

## Google Cloud Functions

To deploy, first modify `gcf.yml` appropriately. Then:

```sh
  npm install # one time only
  npm run deploy-gcf
```

> https://us-east1-gcf-project-89309.cloudfunctions.net/gcf/openapi.yml not currently working
