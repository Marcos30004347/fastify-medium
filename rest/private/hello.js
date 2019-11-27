function hello(fastify, _opts, next) {
    fastify.route({
        method: 'GET',
        url: '/hello',
        preHandler: async (req, _res) => {
            fastify.log.info("autorizando...");
            fastify.assert(
                req.headers.authorization === "password",
                400,
                "Beeeh"
            );
            return;
        },
        handler: async (req, reply) => {
          return { message: "Olá pra você de uma rota privada!" };
        }
    })

    next();
}

module.exports = hello;