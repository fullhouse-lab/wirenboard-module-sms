var sms = require("sms");

sms.start({
  id: "sms",
  title: "SMS Manager",

  clients_title: "Smart house",
  clients: [
    "+79993330001", //husband
    "+79993330002", //wife
  ],

  support_title: "Smart house: Savitsky",
  support: [
    "+79993330003", //integrator
  ],
});
