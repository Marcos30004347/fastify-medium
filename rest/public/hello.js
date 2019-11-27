function hello(fastify, _opts, next) {
    fastify.get("/hello", (req, res) => {
        res.send({ message: "Olá pra você de uma rota pública!" });
    });
    next();
}

module.exports = hello;