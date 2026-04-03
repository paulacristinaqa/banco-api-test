const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const postLogin = require ('../fixtures/postLogin.json')

describe('Login', () => {
  describe('POST /login()',  () => {
    it('Teste 1-Deve retornar 200 com token em string ao usar credenciais válidas', async () => {
      const bodyLogin = postLogin
        const resposta = await request(process.env.BASE_URL)
          .post('/login')
          .set('Content-Type','application/json')
          .send(bodyLogin)
          console.log(resposta.status);
          console.log(resposta.body);
        expect(resposta.status).to.equal(200);   
        expect(resposta.body.token).to.be.a('string');      
      
    });
      it('Teste 2- Deve retornar 400 com request sem parâmetros de login ', async () => {
        const bodyLogin ={
            "username":"",
            "senha": "123456"
          }
        //bodyLogin.username = 'chuchu' //como validar o erro 400 na teste de login????
        const resposta = await request('http://localhost:3000')
          .post('/login')
          .set('Content-Type','application/json')
          .send(bodyLogin)
          console.log(resposta.status);
          console.log(resposta.body);
    
        expect(resposta.status).to.equal(400);
    // Remove a expectativa de token, pois erro 400 não retorna token
    // expect(resposta.body.token).to.be.a('string');  
    
    // Opcional: valida a mensagem de erro
        expect(resposta.body.error).to.equal("Usuário e senha são obrigatórios.");
    });
  });
});