// Importamos o fastify.
const fastify = require('fastify')({ logger: true })

// Declaramos uma rota simples.
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Queremos que nosso servidor escute na porta 3000.
const run = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`Server escutando na porta ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// Rode o servidor!
run()