# lambda

Simple wrapper around the `@aws-sdk/client-lambda` to invoke a Lambda function to reduce boilerplate.

## Usage

### Node

```bash
npm install @1mill/lambda
```

```node
const { invoke } = require('@1mill/lambda')
await invoke({
  accessKeyId: process.env.LAMBDA_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.LAMBDA_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  functionName: 'my-lambda-function-name',
  invocationType: 'RequestResponse',
  payload: JSON.stringify({ myValues: [1, 2, 3, 'a' ]}),
})
```
