const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://5e1bdc53.databases.neo4j.io';
const user = 'neo4j';
const password = process.env.REACT_APP_NEO_CODE;
// To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session()

try {
  const result = await session.executeWrite(tx =>
    tx.run(
      'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',
      { message: 'hello, world' }
    )
  )

  const singleRecord = result.records[0]
  const greeting = singleRecord.get(0)

  console.log(greeting)
} finally {
  await session.close()
}

// on application exit:
await driver.close()