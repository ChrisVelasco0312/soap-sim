const express = require("express");
const soap = require("soap");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const xml = fs.readFileSync("./simple-test.wsdl", "utf8");

app.use(
  bodyParser.raw({
    type: function () {
      return true;
    },
    limit: "5mb",
  })
);

app.use(bodyParser.json());

const service = {
  Hello_Service: {
    Hello_Port: {
      sayHello: function (args) {
        console.log("sayHello called");
        return {
          greeting: "Hello " + args.firstName,
        };
      },
    },
  },
};

app.listen(8001, function () {
  console.log("server started on port 8001");
  const soapServer = soap.listen(app, "/sayHello", service, xml, function () {
    console.log("server initialized");
  });

  // soapServer.log = function (type, data) {
  //   console.log(type);
  //   console.log(data);
  // };
});
