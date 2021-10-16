const { Lambda } = require('./index')

const lambda = new Lambda({
	accessKeyId: 'localstack',
	endpoint: 'http://localstack:4566/',
	region: 'us-east-1',
	secretAccessKey: 'localstack',
})

const main = async () => {
	try {
		const response = await lambda.invoke({
			cloudevent: {
				id: 'uuid',
				source: '1mill.lambda.unit.test.js',
				type: 'test',
			},
			functionName: 'rapids-v0-hydrator',
			invocationType: 'RequestResponse',
		})
		console.log('Success ---')
		console.log(response)
	} catch (err) {
		console.log('Error ---')
		console.error(err)
	}
}
main()
