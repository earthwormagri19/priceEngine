const express = require('express');
const router = express.Router();
const Razorpay =  require('razorpay');



// READ (ALL)
router.get('/', (req, res) => {
    var instance = new Razorpay({
        key_id: 'rzp_live_ezeJlOA04CmoWR',
        key_secret: 'XOGecDTCGrVkZ4bDni9CaKHs'
    });
    instance.payments
    .all()
    .then(result => {
        var payments = result.items;
        payments.forEach(element => {
            element.amount = Number(element.amount)/100;
        });
        res.json(payments);
    })
    .catch(error => {
        res.status(500).json({ success: false, msg: `Something went wrong`+error });
    });
});

module.exports = router;