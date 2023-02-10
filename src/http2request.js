const http2 = require('http2');
/**
 * @class Http2Request
 * @param ip: it represents the ip address of the server
 * @param port: it represents the port of the server
 * @param numberOfRequests: it represents the number of requests for each thread
 * 
 * 
 * 
 */
class Http2Request {
     /**
     *
     * @param {string} ip
     * @param {number} port
     * @param  {number} numberOfRequests
     */
    ip;
    port;
    numberOfRequests;

    constructor(ip, port,numberOfRequests) {
      
      this.ip = ip;  
      this.port = port;
      this.numberOfRequests=numberOfRequests
    }
/**
 * It establishes a secure connection with http2 server
 * Note that in this case there is no mutual authentication, but only one way authentication
 * @returns  a ClientHttp2Session instance through the object client
 * 
 */
    connectToServer(){
      let address= 'https://'.concat(this.ip).concat(':').concat(this.port).concat('/');
      const client = http2.connect(address,{
        requestCert: false, // put true if you want a client certificate, tested and it works
        rejectUnauthorized: false
        });
        return client;
    }
/**
 * This functions establishes a connection to the server, then it make n GET requests with the path specified.
 * The path is indicated in the Nokia.pkap file.
 * Between one request and another it waits for 600 ms. It uses the mechanism of promises. In JavaScript, 
 * a Promise is an object that represents a value that may not be available yet but will be at some point 
 * in the future. Promises are used to handle asynchronous operations and provide a way to register callbacks 
 * to be executed when the promise is resolved or rejected.Async/await
 *  is a way of handling asynchronous operations in JavaScript using 
 * syntax that is similar to synchronous code. The async keyword is used to declare a function as asynchronous, 
 * and the await keyword is used to wait for a promise to be resolved before continuing with the next line of code.
 * After sending the request, it closes the http2 session
 * @param {number} id: it indicates the id of the current thread
 */
    async  makeRequestGet(id){
      const client=this.connectToServer();
    
      for (let i = 0; i <  this.numberOfRequests ; i++) {
          console.log(`Thread ${i}: Making request ${i + 1}...`);
          const req = client.request({
              ':method': 'GET',
  
              ':path': '/nudm-sdm/v2/imsi-460020301001001?dataset-names=AM,SMF_SEL'
            
          });
          req.end();
          await new Promise( (resolve) => {
            req.on('response', () => {
              resolve();
            });
          });
          await new Promise(resolve => setTimeout(resolve, 600));
        }
        client.close();

    }
/**
 * This functions establishes a connection to the server, then it make n Put requests with the path specified.
 * The path is indicated in the Nokia.pkap file.
 * Between one request and another it waits for 600 ms. It uses the mechanism of promises explained previously.
 * After sending the request, it closes the http2 session
 * @param {number} id: it indicates the id of the current thread
 */
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
          await new Promise(resolve => setTimeout(resolve, 600));
        }
        client.close();

    }
/**
 * This functions establishes a connection to the server, then it make n Put requests with the path specified.
 * The path is indicated in the Nokia.pkap file.
 * Between one request and another it waits for 600 ms. It uses the mechanism of promises explained previously.
 * After sending the request, it closes the http2 session
 * @param {number} id: it indicates the id of the current thread
 */
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
          await new Promise(resolve => setTimeout(resolve, 600));
        }  
        client.close();

    }

/**
 * This functions establishes a connection to the server, then it make n Put requests with the path specified.
 * The path is indicated in the Nokia.pkap file.
 * Between one request and another it waits for 600 ms. It uses the mechanism of promises explained previously.
 * After sending the request, it closes the http2 session
 * @param {number} id: it indicates the id of the current thread
 */
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
            await new Promise(resolve => setTimeout(resolve, 600));
          }
          client.close();

      }
      
  }

  //it exports the class as a library to be used by other files
  module.exports = Http2Request;
