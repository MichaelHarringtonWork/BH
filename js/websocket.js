/* global viewModel */

function getWSUri() {
  return "ws://127.0.0.1:7101/WebSocket/service";
}

function connectSocket() {
  if ('WebSocket' in window){
    websocket = new WebSocket(getWSUri());
    websocket.onmessage = onMessage;
    websocket.onerror = onError;
    websocket.onclose = onClose;
    console.log('socket opened !');
  } else {
    console.log('websocket not supported...!');
  }
}

//on error event
function onError(evt) {
  console.log('error :' + evt);
}

//on close event
function onClose(evt) {
  console.log('websocket closed :' + evt.code + ":" + evt.reason);
}

function onMessage(evt) {
  var data = JSON.parse(evt.data);
  viewModel.updateChart(data);
}
