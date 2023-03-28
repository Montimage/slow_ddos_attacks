
module.exports = workerData => {
  console.log(`This is worker thread ${Worker.threadId}.`);
  console.log(`Worker data: ${workerData}.`);
};