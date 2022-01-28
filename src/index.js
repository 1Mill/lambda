import { Buffer } from 'buffer'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'

const fetchEnv = (name) => {
	return (typeof process !== 'undefined') && process && process.env && process.env[name]
}

export class Lambda {
	constructor({
		accessKeyId = fetchEnv('MILL_LAMBDA_AWS_ACCESS_KEY_ID'),
		endpoint = fetchEnv('MILL_LAMBDA_AWS_ENDPOINT'),
		region = fetchEnv('MILL_LAMBDA_AWS_REGION'),
		secretAccessKey = fetchEnv('MILL_LAMBDA_AWS_SECRET_ACCESS_KEY'),
	}) {
		// * Credentials
		this.accessKeyId = accessKeyId
		if (!this.accessKeyId) throw new Error('AWS "accessKeyId" is required')

		this.region = region
		if (!this.region) throw new Error('AWS "region" is required')

		this.secretAccessKey = secretAccessKey
		if (!this.secretAccessKey) throw new Error('AWS "secretAccessKey" is required')

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

		let data = undefined
		if (invocationType === 'RequestResponse') {
			// * Turn Buffer payload into string AND IF the
			// * string is JSON then parse the string into
			// * an object, boolean, number, etc.
			data = Buffer.from(response.Payload).toString()
			try { data = JSON.parse(data) } catch (err) {}
		}

		// ! When @aws-sdk/client-lambda is used in the browser, response.FunctionError
		// ! is not set whenever a Lambda throws an error. However, the error payload
		// ! is still returned. This checks the payload to check if an error occured
		// ! at the Lambda level as a workaround
		if (data && data.errorType && data.errorType === 'InvocationException') throw new Error(data.errorMessage)
		if (response.FunctionError) throw new Error(data.errorMessage)

		return data
	}
}
