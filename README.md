# lambda

Simple wrapper around the `@aws-sdk/client-lambda` library to invoke AWS Lambda functions with [Cloudevents](https://github.com/1mill/cloudevents).

## Usage

### Node

```html
<script src="https://unpkg.com/@1mill/lambda@0.4/dist/index.umd.js"></script>
```

or

```bash
npm install @1mill/lambda
```

```node
const { Lambda } = require('@1mill/lambda') // CommonJS
import { Lambda } from '@1mill/lambda' // EMS

const lambda = new Lambda({
  accessKeyId: 'required' || process.env.MILL_LAMBDA_AWS_ACCESS_KEY_ID,
  endpoint: 'optional' || process.env.MILL_LAMBDA_AWS_ENDPOINT,
  region: 'required' || process.env.MILL_LAMBDA_AWS_REGION,
  secretAccessKey: 'required' || process.env.MILL_LAMBDA_AWS_SECRET_ACCESS_KEY,
  sessionToken: 'optional' || process.env.AWS_SESSION_TOKEN,
})
```

|                 | Required | Default                                                                                                       | Notes                                                                                  |
|-----------------|----------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| accessKeyId     | yes      | process.env.MILL_LAMBDA_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY      |                                                                                        |
| endpoint        |          | process.env.MILL_LAMBDA_AWS_ENDPOINT || process.env.AWS_ENDPOINT                                              | Good for local development environment when using Localstack (or other AWS simulators) |
| region          | yes      | process.env.MILL_LAMBDA_AWS_REGION || process.env.AWS_REGION                                                  |                                                                                        |
| secretAccessKey | yes      | process.env.MILL_LAMBDA_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY                            |                                                                                        |
| sessionToken    |          | process.env.AWS_SESSION_TOKEN                                                                                 |                                                                                        |

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
| functionName   | yes      |         |                                          |
| invocationType |          | 'Event' | Options are 'Event' or 'RequestResponse' |
