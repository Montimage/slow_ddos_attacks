const http2 = require('http2');

class Http2Request {
    ip;
    port;
    numberOfRequests;

    constructor(ip, port,numberOfRequests) {
      this.ip = ip;
      this.port = port;
      this.numberOfRequests=numberOfRequests
    }
    connectToServer(){
      let address= 'https://'.concat(this.ip).concat(':').concat(this.port).concat('/');
      const client = http2.connect(address,{
        requestCert: false, // put true if you want a client certificate, tested and it works
        rejectUnauthorized: false
        });
        return client;
    }

    async  makeRequestGet(){
      const client=this.connectToServer();
    
      for (let i = 0; i <  this.numberOfRequests ; i++) {
          console.log(`Thread ${i}: Making request ${i + 1}...`);
          const req = client.request({
              ':method': 'GET',
  
              ':path': '/nudm-sdm/v2/imsi-460020301001001/sdm-subscriptions'
            
          });
          req.end();
          await new Promise( (resolve) => {
            req.on('response', () => {
              resolve();
            });
          });
          await new Promise(resolve => setTimeout(resolve, 100));
          client.close();
        }


    }
    async  makeRequestPut(id){
      const client=this.connectToServer();
    
      for (let i = 0; i <  this.numberOfRequests ; i++) {
          console.log(`Thread ${i}: Making request ${i + 1}...`);
          const req = client.request({
              ':method': 'PUT',
  
              ':path': '/nausf-auth/v1/ue-authentications/imsi-460020301001001/5g-aka-confirmation'
            
          });
          req.end();
          await new Promise( (resolve) => {
            req.on('response', () => {
              resolve();
            });
          });
          await new Promise(resolve => setTimeout(resolve, 100));
          client.close();
        }
    
    
    }
    async  makeRequestDelete(id){
      const client=this.connectToServer();
    
      for (let i = 0; i <  this.numberOfRequests ; i++) {
          console.log(`Thread ${id}: Making request ${i + 1}...`);
          const req = client.request({
              ':method': 'DELETE',
  
              ':path': '/npcf-am-policy-control/v1/policies/PolAssoId31'
            
          });
          req.end();
          await new Promise( (resolve) => {
            req.on('response', () => {
              resolve();
            });
          });
          await new Promise(resolve => setTimeout(resolve, 100));
          client.close();
        }
    
    
    }

    
   async  makeRequestPost(id) {
    const client=this.connectToServer();
    
        for (let i = 0; i < this.numberOfRequests ; i++) {
            console.log(`Thread ${id}: Making request ${i + 1}...`);
            const req = client.request({
                ':method': 'POST',
    
                ':path': '/nudm-sdm/v2/imsi-460020301001001/sdm-subscriptions'
              
            });
            req.end();
            await new Promise( (resolve) => {
              req.on('response', () => {
                resolve();
              });
            });
            await new Promise(resolve => setTimeout(resolve, 300));
          }
          client.close();

      }
      
  }
  module.exports = Http2Request;
