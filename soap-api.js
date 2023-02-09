const express = require("express");
const soap = require("soap");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const xml = fs.readFileSync(
  "./Artefactos/WSDLs/LSC_TARWebServices.wsdl",
  "utf8"
);

app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);

// In order to this structure to work, 
// the WSDL must be modified to match the
// structure of the service object.
// if not the server will return -> 
// (cannot find "description" of undefined)
const service = {
  TARWeb: {
    TARWebService_Port: {
      consultaroperacion: function (args) {
        return {
          name: args.name,
        };
      },
    }
  },
};

app.listen(8001, function () {
  console.log("server started on port 8001");
  const soapServer = soap.listen(app, "/LSC_TARWebServices", service, xml);
  soapServer.log = function (type, data) {
    console.log("TYPE", type);
    console.log("DATA", data);
  };
});
