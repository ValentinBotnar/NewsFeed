
"use strict";
var connection = new signalR.HubConnectionBuilder().withUrl("/ConsumeScopedService").build();

//Disable send button until connection is established


connection.on("ReceiveMessage", function (header, text) {

    var encodedMsg = header + " says " + text;
    var li = document.createElement("a");
    li.textContent = encodedMsg;
    li.setAttribute('title', header);
    //li.setAttribute('href', "one_news.html");
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {

}).catch(function (err) {
    return console.error(err.toString());
});

