const express = require('express');
// const cron = require('node-cron');
const CronJob = require('cron').CronJob;
const Axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// cron.schedule('* * * * * *', () => {
//     console.log("Task is running every minute " + new Date());
// });
function getJobData() {
    Axios.get('https://jsonplaceholder.typicode.com/posts').then(resp => {
        // console.log(resp.data);
        return resp.data;
    });
}
var job = new CronJob('0 25 22 * * *', function() {
  console.log('You will see this message every second', new Date().toLocaleTimeString());
  getJobData();
  this.onComplete();
}, onComplete, true, 'Asia/Kolkata');
job.start();

function onComplete() {
    console.log("Task completed");
}

app.get('/', (req, res) => {
    res.send('called this page');
});

app.listen(PORT, () => console.log('running...'));