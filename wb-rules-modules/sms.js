var MODULE_VERSION  = "1.1.0";
var MODULE_NAME     = "sms";

//
//  Start  //
//

exports.start = function(config) {
  if (!validateConfig(config)) return;

  //  device  //
	createDevice(config);

  //  rules  //
  createRule_BTN_test(config.id);
  createRule_TEXT_send(config);

  log(config.id + ": Started (" + MODULE_NAME + " ver. " + MODULE_VERSION + ")");
};

//
//  Validate config  //
//

var validateConfig = function(_config) {
  if (!_config) {
    log("Error: " + MODULE_NAME + ": No config");
    return false;
  }

  if (!_config.id || !_config.id.length) {
    log("Error: " + MODULE_NAME + ": Config: Bad id");
    return false;
  }

  if (!_config.title || !_config.title.length) {
    log("Error: " + MODULE_NAME + ": Config: Bad title");
    return false;
  }

  if (!_config.clients_title) _config.clients_title = "Smart house";

  if (!_config.support_title) _config.support_title = "Smart house";

  return true;
}

//
//  Device  //
//

function createDevice(config) {
	var cells = {
		enabled:  { type: "switch", value: true, readonly: false },
    test:     { type: "pushbutton", readonly: false },
    send:     { type: "text", value: "", readonly: false },
	}

  config.clients.forEach(function (item, i) {
    cells["client_" + (i + 1)] = { type: "text", value: item, readonly: false, forceDefault: true };
  });

  config.support.forEach(function (item, i) {
    cells["support_" + (i + 1)] = { type: "text", value: item, readonly: false, forceDefault: true };
  });

	defineVirtualDevice(config.id, {
	  title: config.title,
	  cells: cells
	});
}

//
//  Btn: test  //
//

function createRule_BTN_test(device_id) {
  defineRule({
    whenChanged: device_id + "/test",
    then: function (newValue, devName, cellName)  {
      dev[device_id]["send"] = "TEST message. Have a nice day =)";
    }
  });
}

//
//  Text: send  //
//

function createRule_TEXT_send(config) {
  defineRule({
    whenChanged: config.id + "/send",
    then: function (newValue, devName, cellName)  {

      if (!newValue) return;

      if (dev[config.id]["enabled"]) {
        var textstr = newValue;

        config.clients.forEach(function (item, i) {
          Notify.sendSMS(item, config.clients_title + ": " + textstr);
        });

        config.support.forEach(function (item, i) {
          Notify.sendSMS(item, config.support_title + ": " + textstr);
        });
      }

      dev[config.id]["send"] = "";
    }
  });
}
