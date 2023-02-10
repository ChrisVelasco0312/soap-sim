const express = require("express");
const soap = require("soap");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const convert = require("xml-js");

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
        const xml = convert.json2xml(args, { compact: true, spaces: 4 });
        console.log("xml", xml);

        const result1 = convert.json2xml(
          {
            _cdata: xml,
          },
          { compact: true, spaces: 4 }
        );

        console.log("result1", result1);

        return {
          consultaroperacionResponse: result1,
        };
      },
    },
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
