/**
*     File Name           :     main.js
*     Created By          :     Anton Kundenko anton@algotradinghub.com
*     Creation Date       :     06-04-2015 20:02
*     Description         :      
***/
var host = location.origin;
var socket = io.connect(host, {transports: ["websocket"]});
var socket = io.connect();
socket.on('news', function (data) {
   console.log(data);
   socket.emit('event', { my: 'data' });
});

