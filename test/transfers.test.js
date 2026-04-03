const request = require('supertest');//condições para chamr o supertest
const { expect } = require('chai');//condições para chamar o chai
require('dotenv').config(); //puxa as variáveis de ambiente do .env
const { obterToken }= require ('../helpers/autenticacao')
const   postTransferencias = require ('../fixtures/postTransferencias.json')
 


describe('Transferências', () => {
  let token
    let tokenSemPermissao
    beforeEach(async() =>{
      token = await obterToken ('julio.lima','123456')
      tokenSemPermissao = await obterToken('junior.lima','123456')
    })
  describe ('POST/Traneferencias', () => {
    
    it('Teste 1-Deve retornar 201 quando for efetuada uma transferência maior ou igual a R$10,00', async () => {   
      const bodyTransferencias = {...postTransferencias}  //cópia superficial somente com campos simples, pora subobjetos   tem outro tipo de clone
      
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json')    
        .set('Authorization',`Bearer ${token}`)                
        .send(bodyTransferencias)                  
      expect(resposta.status).to.equal(201); 
                
    });
    it('Teste 2-Deve retornar 422 quando for efetuada uma transferência menor ou igual a R$10,00', async () => {    
      const bodyTransferencias = {...postTransferencias}
      bodyTransferencias.valor = 7
      
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json')   
        .set('Authorization',`Bearer ${token}`)                   
        .send(bodyTransferencias)                 
      expect(resposta.status).to.equal(422); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    it('Teste 3-Deve retornar 404 quando for efetuada uma transferência com conta origem inválida', async () => {
      const bodyTransferencias = {...postTransferencias}
      bodyTransferencias.contaOrigem = 4889
        const resposta = await request(process.env.BASE_URL)
          .post('/transferencias')
          .set('Content-Type','application/json')    
          .set('Authorization',`Bearer ${token}`)                  
          .send(bodyTransferencias)                 
      expect(resposta.status).to.equal(404); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    it('Teste 3-Deve retornar 404 quando for efetuada uma transferência com conta destino inválida', async () => {
      const bodyTransferencias = {...postTransferencias}
      bodyTransferencias.contaDestino = 5000
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json')    
        .set('Authorization',`Bearer ${token}`)                  
        .send(bodyTransferencias)              
      expect(resposta.status).to.equal(404); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    it('Teste 5-Deve retornar 403 quando for efetuada uma transferência com usuário sem permissão', async () => {
      const bodyTransferencias = {...postTransferencias}
      const resposta = await request(process.env.BASE_URL)
        .post('/transferencias')
        .set('Content-Type','application/json') 
        .set('Authorization',`Bearer ${tokenSemPermissao}`)                     
        .send(bodyTransferencias)         
      expect(resposta.status).to.equal(403); 
      console.log(resposta.status);
      console.log(resposta.body);  
    });
    // it('Teste 6-Deve retornar 500 quando for efetuada uma transferênciacom quando o servidor estiver com algum erro interno ', async () => {   
    // const bodyTransferencias = {...postTransferencias}   
    //   const resposta = await request('http://localhost:3000')
      //   .post('/transferencias')
      //   .set('Content-Type','application/json')  
      //   .set('Authorization',`Bearer ${token}`)                    
      //   .send(bodyTransferencias)           
      // expect(resposta.status).to.equal(500); 
      // console.log(resposta.status);
      // console.log(resposta.body);  
  describe ('GET/Traneferencias/{id}', () => {
    
    it('Teste 7- Deve retornar 200 e dados iguais ao registro de transferências contido no banco de dados, quando o id for válido',async () => {
      const resposta = await request (process.env.BASE_URL)
        .get('/transferencias/8')
        .set('Authorization',`Bearer ${token}`)  
        console.log(resposta.status)   
        console.log(resposta.body) 

        expect(resposta.status).to.equal(200)
        expect(resposta.body.id).to.equal(8)
        expect(resposta.body.id).to.be.a('number')
        expect(resposta.body.conta_origem_id).to.equal(6)
        expect(resposta.body.conta_origem_id).to.be.a('number')
        expect(resposta.body.conta_destino_id).to.equal(1)
        expect(resposta.body.conta_destino_id).to.be.a('number')
        expect(resposta.body.valor).to.equal('4999.99')
        expect(resposta.body.valor).to.be.a('string')
      })
    }),
  describe ('GET/Traneferencias/', () => {    
    it('Teste 8- Deve retornar 10 elementos na paginação quando o limite enviado for igual a 10', async () => {
      const resposta = await request (process.env.BASE_URL)
        .get('/transferencias?page=1&limit=10')
        .set('Authorization',`Bearer ${token}`)  
        console.log(resposta.status)   
        console.log(resposta.body) 

        expect(resposta.status).to.equal(200)
        expect(resposta.body.limit).to.equal(10)
        expect(resposta.body.transferencias).to.have.lengthOf(10)
        expect(resposta.body.transferencias[0].conta_origem_id).to.equal(1)
      })
    })     
  //});
 });
});