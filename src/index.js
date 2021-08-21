const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda')

const PAYLOAD_DEFAULT = undefined

const invoke = async ({
	// Invocation
	functionName,
	invocationType = 'RequestResponse',
	payload = PAYLOAD_DEFAULT,
	// Credentials
	accessKeyId = (process && process.env && process.env.LAMBDA_AWS_ACCESS_KEY_ID),
	region = (process && process.env && process.env.LAMBDA_AWS_REGION),
	secretAccessKey = (process && process.env && process.env.LAMBDA_AWS_SECRET_ACCESS_KEY),
	// Optional for development purposes (e.g. localstack)
	endpoint = (process && process.env && process.env.LAMBDA_AWS_ENDPOINT),
}) => {
	if (!accessKeyId) throw new Error('Argument "accessKeyId" is required')
	if (!secretAccessKey) throw new Error('Argument "secretAccessKey" is required')
	if (payload !== PAYLOAD_DEFAULT) try { JSON.parse(payload) } catch (_err) { throw new Error('Argument "payload" must be valid JSON') }

	const aws = new LambdaClient({
		credentials: {
			accessKeyId: accessKeyId,
			secretAccessKey: secretAccessKey,
		},
		endpoint,
		region,
	})
	const command = new InvokeCommand({
		FunctionName: functionName,
		InvocationType: invocationType,
		Payload: payload,
	})
	const response = await aws.send(command)
	const data = JSON.parse(Buffer.from(response.Payload).toString())
	return data
}

module.exports = { invoke }
