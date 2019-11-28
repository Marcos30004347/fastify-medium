const fastify = require('fastify')({ logger: true })
const path = require('path');

fastify.register(require('fastify-sensible'));
fastify.register(require('fastify-autoload'), {
    dir: path.join(__dirname, 'rest'),
    options: {
        /**
         * Aqui definimos que os plugins carregados através
         * do autoload serão registrados sobre o prefixo
         * /api
         * 
         * Como temos 2 plugins em /rest, um dentro de /public,
         * e outro dentro de /private, ambos registrando
         * endpoints /hello, teremos após p registro desse plugins
         * 2 enpoints em nosso servidor.
         * 
         * /api/public/hello
         * /api/private/hello
         **/
        prefix: '/api/'
    },
});

const { ApolloServer } = require('apollo-server-fastify');
const { resolvers } = require("./graphql/resolvers");
const { typeDefs } = require("./graphql/typeDefs");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    tracing: true,
});

fastify.register(server.createHandler());

const run = async () => {
  try {
    await fastify.listen(3000)
    fastify.log.info(`Server escutando na porta ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

run();