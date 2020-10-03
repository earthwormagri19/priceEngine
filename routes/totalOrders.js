const express = require('express');
const router = express.Router();
var request = require('request');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: '../test.csv',
    header: [
        {id: 'name', title: 'NAME'},
        {id: 'lang', title: 'LANGUAGE'}
    ]
});
 
const records = [
    {name: 'Bob',  lang: 'French, English'},
    {name: 'Mary', lang: 'English'}
];
 
csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
 
router.get('/', function(req, res, next) {
  request({
    uri: 'https://zoomfresh.in/zoomfresh/process/API_link/order_list.php?order_id=ZFO0176',
  },
  function (error, response, body) {
    var orders = JSON.parse(body);

    orders.forEach(function(value , i){
      if(i<=65 && value.status === 'Confirmed'){

      }
    });
  }).pipe(res);
});

module.exports = router;