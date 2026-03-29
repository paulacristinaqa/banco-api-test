const request = require('supertest');
const { expect } = require('chai');

describe('Login', () => {
  describe('POST /login()',  () => {
    it('Teste 1-Deve retornar 200 com token em string ao usar credenciais válidas', async () => {
        const resposta = await request('http://localhost:3000')
          .post('/login')
          .set('Content-Type','application/json')
          .send({
            'username': 'julio.lima',
            'senha': '123456'
          })
          console.log(resposta.status);
          console.log(resposta.body);
        expect(resposta.status).to.equal(200);   
        expect(resposta.body.token).to.be.a('string');      
      
    });
    //   it('Teste 2- Deve retornar 400 com request sem parâmetros de login ', async () => {//como validar o erro 400 na teste de login
    //     const resposta = await request('http://localhost:3000')
    //       .post('/login')
    //       .set('Content-Type','application/json')
    //       .send({
    //         'username': 'julio.lima',
    //         'senha': '123456'
    //       })
    //       console.log(resposta.status);
    //       console.log(resposta.body);
    //     expect(resposta.status).to.equal(200);   
    //     expect(resposta.body.token).to.be.a('string');      
      
    // });
  });
});