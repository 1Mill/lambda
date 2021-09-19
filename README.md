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
  accessKeyId: 'required' || process.env.MILL_LAMBDA_AWS_ACCESS_KEY_ID,
  endpoint: 'optional' || process.env.MILL_LAMBDA_AWS_ENDPOINT,
  region: 'required' || process.env.MILL_LAMBDA_AWS_REGION,
  secretAccessKey: 'required' || process.env.MILL_LAMBDA_AWS_SECRET_ACCESS_KEY,
})
```

|                 | Required | Default                                        | Notes                                                                                  |
|-----------------|----------|------------------------------------------------|----------------------------------------------------------------------------------------|
| accessKeyId     | yes      | process.env.MILL_LAMBDA_AWS_ACCESS_KEY_ID      |                                                                                        |
| endpoint        |          | process.env.MILL_LAMBDA_AWS_ENDPOINT           | Good for local development environment when using Localstack (or other AWS simulators) |
| region          | yes      | process.env.MILL_LAMBDA_AWS_REGION             |                                                                                        |
| secretAccessKey | yes      | process.env.MILL_LAMBDA_AWS_SECRET_ACCESS_KEY  |                                                                                        |

```node
const lambda = new Lambda({...})

await lambda.invoke({
  cloudevent,
  functionName: 'required-my-lambda-arn',
  invocationType: 'optional' || 'Event',
})
```

|                | Required | Default | Notes                                    |
|----------------|----------|---------|------------------------------------------|
| cloudevent     | yes      |         | @1mill/cloudevents                       |
| functionname   | yes      |         |                                          |
| invocationType |          | 'Event' | Options are 'Event' or 'RequestResponse' |
