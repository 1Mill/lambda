# lambda

Simple wrapper around the `@aws-sdk/client-lambda` to invoke a Lambda function to reduce boilerplate.

## Usage

### Node

```bash
npm install @1mill/lambda
```

```node
const { Lambda } = require('@1mill/lambda')

const lambda = new Lambda({
  accessKeyId: process.env.LAMBDA_AWS_ACCESS_KEY_ID,
  endpoint: process.env.LAMBDA_AWS_ENDPOINT,
  region: process.env.LAMBDA_AWS_REGION,
  secretAccessKey: process.env.LAMBDA_AWS_SECRET_ACCESS_KEY,
})

await invoke({
  cloudevent,
  functionName: 'my-lambda-arn',
  invocationType: 'Event',
})
```
