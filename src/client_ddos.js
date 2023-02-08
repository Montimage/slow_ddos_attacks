const http2 = require('http2');
const Http2Request = require('./http2request');


  async function main() {
    try{
      if(process.argv.length!=7){
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
              await new Promise(resolve => setTimeout(resolve, 2000));

            }
            await Promise.all(promises);

            break;

        case("GET"):
            for (let i = 0; i < numberOfThreads; i++) {
             promises.push(http2Request.makeRequestGet(i));
             await new Promise(resolve => setTimeout(resolve, 2000));

            }
            await Promise.all(promises);

            break;

        case("PUT"):
            for (let i = 0; i < numberOfThreads; i++) {
              promises.push(http2Request.makeRequestPut(i));
              await new Promise(resolve => setTimeout(resolve, 2000));

            }
            await Promise.all(promises);

            break;


        case("DELETE"):
            for (let i = 0; i < numberOfThreads; i++) {
              promises.push(http2Request.makeRequestDelete(i));
              await new Promise(resolve => setTimeout(resolve, 2000));

            }
            await Promise.all(promises);

            break;

            default:
              console.log("Insert a valid http2 method");
              break;



      }
   }
   catch(error){
      console.error(error.message);

     }
  }

  
  main();