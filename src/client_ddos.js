const http2 = require('http2');

async function makeRequest(id,ip,port,numberOfRequests) {
    let address= 'http://'.concat(ip).concat(':').concat(port).concat('/');
    console.log(ip," ",port);
    for (let i = 0; i < numberOfRequests ; i++) {
        console.log(`Thread ${id}: Making request ${i + 1}...`);
        const client = http2.connect(address,{
          requestCert: false, // put true if you want a client certificate, tested and it works
          rejectUnauthorized: false
          });
        const req = client.request({
            ':method': 'POST',

            ':path': '/nudm-sdm/v2/imsi-460020301001001/sdm-subscriptions'
          
        });
        req.end();
        await new Promise(resolve => {
          req.on('response', () => {
            resolve();
          });
        });
        await new Promise(resolve => setTimeout(resolve, 100));
        client.close();
      }
  }
  
  async function main() {


    if(process.argv.length!=6){
      console.log("Insert ip - port - number of requests - number of threads ");
      process.exit(1);
    }
    const [ip, port, numberOfRequests,numberOfThreads] = process.argv.slice(2);
    console.log("   \n",ip,port,numberOfRequests," ",numberOfThreads);

    const promises = [];
    for (let i = 0; i < numberOfThreads; i++) {
      setTimeout( ()=>promises.push(makeRequest(i + 1,ip,port,numberOfRequests)),1000);
    }
    await Promise.all(promises);
  }
  
  main();