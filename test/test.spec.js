
const request = require('supertest')
let chai = require('chai');
const expect = chai.expect;

/** 
 * import our server to test 
 */
const server = require('../bin/www')




/**
 * url we will make the request
 * @type {string}
 */
const url = 'http://localhost:3000/iecho';

describe('Test 1: valida que el string este invertido', () => {
    it('valida que la cadena esta invertida ', (done) => {
        request(url)
            .get('/')
            .query({ text: "test" })//cadena de entrada
            .end(function (req, res,err) {
                //verifica que la respuesta a la peticion es 200
                expect(res.statusCode).to.be.equal(200);
                // expect('Content_Type', );
                expect('Content_Type', /json/);
                //verifica que la salida esperada sea la correcta con valor de prueba
                expect(res.body).to.have.property('text').to.be.equal("tset");
                if (err) return done(err);
                return done();

            });

    });
});
/**
 * testing feature palindrome
 */
describe('Test 2 : valida que se muestre el flag de palindrome ', () => {
    it('valida que se cumpla el flag de palindrome', (done) => {
        request(url)
            .get('/')
            .query({ text: "kayak" })
            .end(function (err, res) {
                //verifica que la respuesta a la peticion es 200
                expect(res.status).to.be.equal(200);
                //verifica que la palbara es palindrome
                expect(res.body).to.have.property('palindrome').to.be.equal(true);
                done();
                
            });

    });
});
/**
 * testing query errors
 */
describe('Test 3: validar manejo de errores en los parametros ', () => {
    it('valida manejo de errores en los parametros', (done) => {
        
        request(url)
            .get('/')
            //in the querys put invalid param, right query ({"text":"test"})
            .query({ texto: "test" })
            .end(function (err, res) {
                //verifica que la respuesta a la peticion es 400 
                expect(res.status).to.be.equal(400);
                expect('Content_Type', 'application/json/');
                //verifica que en caso de ingreso de parametro incorrecto se muestre el mensaje indicado
                expect(res.body).to.have.property('error').to.be.equal('no text');
                done();
            });

    });
});


/**
 * Testing  error handler with wrong route
 */
describe('Test 4: validar el manejo de error en saltos fuera de la ruta ', () => {
    it('valida manejo de error en saltos fuera de la ruta', (done) => {
        /**
         * invalid url route
         * @type {string}
         * the right url is: http://localhost:3000/iecho
         */
        const wrongURL = 'http://localhost:3000/iech';
        request(wrongURL)
            .get('/')
            .query({ tex: "test" })
            .end(function (err, res) {
                //verifica que la respuesta a la peticion sea 404
                expect(res.status).to.eql(404);
                done();
            });

    });
});

