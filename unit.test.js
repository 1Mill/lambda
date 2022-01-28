import cloudevents from '@1mill/cloudevents'
// import { Lambda } from './src/index.js'
// import { Lambda } from './dist/index.cjs'
import { Lambda } from './dist/index.module.js'

const { Cloudevent } = cloudevents

const lambda = new Lambda({
	accessKeyId: 'localstack',
	endpoint: 'http://localstack:4566/',
	region: 'us-east-1',
	secretAccessKey: 'localstack',
})

const main = async () => {
	try {
		const cloudevent = new Cloudevent({
			data: JSON.stringify({
				something: 'bbb',
			}),
			source: '1mill.lambda.unit.test.js',
			type: 'TEST',
		})

		const data = await lambda.invoke({
			cloudevent,
			functionName: 'rapids-v0-hydrator',
			invocationType: 'RequestResponse',
		})
		console.log('Success ---')
		console.log(data)
	} catch (err) {
		console.log('Error ---')
		console.error(err)
	}
}
main()
