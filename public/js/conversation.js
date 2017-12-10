'use strict';

var Conversation = (function() {
  var context;
  return {
    callWatson: callWatson
  };



function callWatson (Question) {
  console.log(context);
    var This = this;
    var messageEndpoint = '/api/message';
    var Currentdata = Question;
    var data = {
      'input' : {
        'text' : Currentdata
      }
    };
    if (context) {
      data.context = context;
    }

    var http = new XMLHttpRequest();
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    http.onload = function() {
      if (http.status === 200 && http.responseText) {
        var response = JSON.parse(http.responseText);
        context = response.context;
        var responseOutput = response.output.text[0];
        TTS.talk(responseOutput);
        if (context.intent ==  "order_status")
        //  $("#watsonOutput").html(responseOutput+"<br> Order number is : "+ response.context.order_number);
          $("#watsonOutput").html(responseOutput);
        else if (context.intent ==  "shipment_status")
          $("#watsonOutput").html(responseOutput);
          //$("#watsonOutput").html(responseOutput+"<br> Shipment number is : "+ response.context.shipment_number);
        else
          $("#watsonOutput").html(responseOutput);
        console.log(JSON.stringify(response));

      } else {

        console.error('Server error when trying to reply!');
      }
    };
    http.onerror = function() {
      console.error('Network error trying to send message!');
    };

    http.send(JSON.stringify(data));
  }
}());
