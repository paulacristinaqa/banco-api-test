const request = require('supertest');//condições para chamr o supertest
const { expect } = require('chai');//condições para chamar o chai
require('dotenv').config(); //puxa as variáveis de ambiente do .env
const { obterToken }= require ('../helpers/autenticacao')


describe('Transferências', () => {
  describe ('POST/Traneferencias', () => {
    let token
    let tokenSemPermissao
    beforeEach(async() =>{
      token = await obterToken ('julio.lima','123456')
      tokenSemPermissao = await obterToken('junior.lima','123456')
    })
    it('Teste 1-Deve retornar 201 quando for efetuada uma transferência maior ou igual a R$10,00', async () => {         
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json')    
        .set('Authorization',`Bearer ${token}`)                
        .send({
          'contaOrigem':1,
          'contaDestino': 3,
          'valor':10,
          'token':''
        })                  
      expect(resposta.status).to.equal(201); 
                
    });
    it('Teste 2-Deve retornar 422 quando for efetuada uma transferência menor ou igual a R$10,00', async () => {              
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json')   
        .set('Authorization',`Bearer ${token}`)                   
        .send({
          'contaOrigem':1,
          'contaDestino': 3,
          'valor':9.99,
          'token':''
        })                  
      expect(resposta.status).to.equal(422); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    it('Teste 3-Deve retornar 404 quando for efetuada uma transferência com conta origem inválida', async () => {
     const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json')    
        .set('Authorization',`Bearer ${token}`)                  
        .send({
          'contaOrigem':488,
          'contaDestino': 3,
          'valor':10,
          'token':''
        })                  
      expect(resposta.status).to.equal(404); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    it('Teste 3-Deve retornar 404 quando for efetuada uma transferência com conta destino inválida', async () => {
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json')    
        .set('Authorization',`Bearer ${token}`)                  
        .send({
          'contaOrigem':1,
          'contaDestino': 500,
          'valor':10,
          'token':''
        })                  
      expect(resposta.status).to.equal(404); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    it('Teste 5-Deve retornar 403 quando for efetuada uma transferência com usuário sem permissão', async () => {
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json') 
        .set('Authorization',`Bearer ${tokenSemPermissao}`)                     
        .send({
          'contaOrigem':1,
          'contaDestino': 3,
          'valor':10,
          'token':''
        })                  
      expect(resposta.status).to.equal(403); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    // it('Teste 6-Deve retornar 500 quando for efetuada uma transferênciacom quando o servidor estiver com algum erro interno ', async () => {    //  
    //   const resposta = await request('http://localhost:3000')
      //   .post('/transferencias')
      //   .set('Content-Type','application/json')  
      //   .set('Authorization',`Bearer ${token}`)                    
      //   .send({
      //     'contaOrigem':1,
      //     'contaDestino': 3,
      //     'valor':10,
      //     'token':''
      //   })                  
      // expect(resposta.status).to.equal(500); 
      // console.log(resposta.status);
      // console.log(resposta.body);  
    //});
  });
});
