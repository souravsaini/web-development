var braintree = require("braintree");

var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'dcj56k3zw4nqgtws',
    publicKey:    'sfrcdxc3f7fcbzn3',
    privateKey:   '31e3b38df57c5018516226738fbc9c4b'
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(response)
    }
  });
}

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amount = req.body.amount
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if(err) {
      res.status(500).send(err)
    } else {
      res.json(result)
    }
  });
}
