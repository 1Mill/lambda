const { LambdaClient, InvokeCommand } = require('@aws-sdk/client-lambda')

const fetchEnv = (name) => {
	return process && process.env && process.env[name]
}

class Lambda {
	constructor({
		accessKeyId = fetchEnv('MILL_LAMBDA_AWS_ACCESS_KEY_ID'),
		endpoint = fetchEnv('MILL_LAMBDA_AWS_ENDPOINT'),
		region = fetchEnv('MILL_LAMBDA_AWS_REGION'),
		secretAccessKey = fetchEnv('MILL_LAMBDA_AWS_SECRET_ACCESS_KEY'),
	}) {
		// * Credentials
		this.accessKeyId = accessKeyId
		this.region = region
		this.secretAccessKey = secretAccessKey

		// * Optional for development purposes (e.g. localstack)
		this.endpoint = endpoint

		// * AWS connections
		this.client = undefined
	}

	async invoke({ cloudevent, functionName, invocationType = 'Event' }) {
		if (typeof this.client === 'undefined') {
			this.client = new LambdaClient({
				credentials: {
					accessKeyId: this.accessKeyId,
					secretAccessKey: this.secretAccessKey,
				},
				endpoint: this.endpoint,
				region: this.region,
			})
		}

		const { id, source, type } = cloudevent
		if (!id) throw new Error('Cloudevent "id" is required')
		if (!source) throw new Error('Cloudevent "source" is required')
		if (!type) throw new Error('Cloudevent "type" is required')

		const command = new InvokeCommand({
			FunctionName: functionName,
			InvocationType: invocationType,
			Payload: JSON.stringify(cloudevent),
		})
		const response = await this.client.send(command)

		const data = invocationType === 'RequestResponse'
			? JSON.parse(Buffer.from(response.Payload).toString())
			: undefined

		if (response.FunctionError) throw new Error(data.errorMessage)

		return data
	}
}

module.exports = { Lambda }
