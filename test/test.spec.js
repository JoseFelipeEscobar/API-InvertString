const request = require('supertest')
let chai = require('chai');
const expect = chai.expect;
const server = require('../bin/www')




//request route
const url = 'http://localhost:3000/iecho';

describe('Test 1: validar que el string este invertido', () => {
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

describe('Test 2 : ', () => {
    it('validar que se cumpla el flag de palindromo', (done) => {
        request(url)
            .get('/')
            .query({ text: "kayak" })
            .end(function (err, res) {
                //verifica que la respuesta a la peticion es 200
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property('palindromo').to.be.equal(true);
                done();
                
            });

    });
});

describe('Test 3 : ', () => {
    it('validar manejo de errores en los parametros', (done) => {
        
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



describe('Test 4 : ', () => {
    it('validar manejo de error en saltos fuera de la ruta', (done) => {
        // invalid route
        const wrongURL = 'http://localhost:3000/iech';
        request(wrongURL)
            .get('/')
            .query({ tex: "test" })
            .end(function (err, res) {
                //verifica que la respuesta a la peticion es 404
                expect(res.status).to.eql(404);
                done();
            });

    });
});

