const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const router = require("express").Router();
const xmlParser = require("express-xml-bodyparser");
const xml2js = require("xml2js");

app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);

const api = router;

app.use(bodyParser.json());
app.use(xmlParser());
app.use(express.text({ type: "text/xml" }));

api.post("/confirmaroperacion", (req, res) => {
  res.setHeader("Content-Type", "text/xml; charset=utf-8");

  xml2js.parseString(req.body, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

  const xmlResponse = `
  <SOAP-ENV:Envelope xmlns:apachesoap="http://xml.apache.org/xml-soap" xmlns:tns="http://commerce" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:wsdlsoap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
   <SOAP-ENV:Body>
      <ns1:consultaroperacionResponse xmlns:ns1="http://commerce">
         <consultaroperacion><![CDATA[<string><VPOSTransaction1.2> <acquirerId>1</acquirerId><commerceId>1612</commerceId><purchaseOperationNumber>22230108000</purchaseOperationNumber><purchaseAmount>1000000000</purchaseAmount><purchaseCurrencyCode>170</purchaseCurrencyCode><purchaseTerminalCode>00063013</purchaseTerminalCode><purchasePlanId></purchasePlanId><purchaseQuotaId></purchaseQuotaId><purchaseIva>0</purchaseIva><purchaseLanguage>SP</purchaseLanguage><billingFirstName>Oscar</billingFirstName><billingLastName>Testing Pruebas</billingLastName><billingCountry>CO</billingCountry><billingCity>VALLE DEL CAUCA</billingCity><billingState>VALLE DEL CAUCA</billingState><billingPostalCode>12345</billingPostalCode><billingPhoneNumber>9999999</billingPhoneNumber><billingCelPhoneNumber>3999999999</billingCelPhoneNumber><billingGender>M</billingGender><billingEmail>oscar.testing@tucorreo.com</billingEmail><billingAddress>Carrera 1000</billingAddress><billingNationality>CO</billingNationality><shippingReceptionMethod>BA</shippingReceptionMethod><shippingReceiverName>Oscar</shippingReceiverName><shippingReceiverLastName>Testing Pruebas</shippingReceiverLastName><shippingReceiverIdentifier>1234567890</shippingReceiverIdentifier><shippingCountry>CO</shippingCountry><shippingCity>VALLE DEL CAUCA</shippingCity><shippingAddress>Carrera 1000</shippingAddress><shippingState>VALLE DEL CAUCA</shippingState><shippingPostalCode>12345</shippingPostalCode><transactionTrace></transactionTrace><fingerPrint>200</fingerPrint><products></products><administrativeRate></administrativeRate><additionalObservations>200</additionalObservations><reserved2>22230108000</reserved2><reserved3>10000000</reserved3><reserved4>1612</reserved4><authorizationCode></authorizationCode><errorCode>-10</errorCode><errorMessage>Rechazada</errorMessage><authorizationResult>-10</authorizationResult><authorizationCodeAR></authorizationCodeAR><errorCodeAR></errorCodeAR><errorMessageAR></errorMessageAR><authorizationResultAR></authorizationResultAR><xmlResponse></xmlResponse><cardNumber></cardNumber><cardType></cardType><planCode>1612</planCode><quotaCode>1</quotaCode></VPOSTransaction1.2></string>]]></consultaroperacion>
      </ns1:consultaroperacionResponse>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
  `;
  res.send(xmlResponse);
});

app.use("/api", api);

app.listen(8000, function () {
  console.log("server started on port 8000");
});
