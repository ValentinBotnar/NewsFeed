"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var signalR = require("@aspnet/signalr");
//@Injectable({
//  providedIn: 'root'
//})
var SignalRService = /** @class */ (function () {
    function SignalRService() {
        var _this = this;
        this.startConnection = function () {
            _this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl('/ConsumeScopedService')
                .build();
            _this.hubConnection
                .start()
                .then(function () { return console.log('Connection started'); })
                .catch(function (err) { return console.log('Error while starting connection: ' + err); });
        };
        this.addTransferChartDataListener = function () {
            _this.hubConnection.on('ReceiveMessage', function (data, e) {
                _this.data = data;
                console.log(data);
            });
        };
    }
    return SignalRService;
}());
exports.SignalRService = SignalRService;
//# sourceMappingURL=SignalRService.js.map