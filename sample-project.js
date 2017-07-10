var a = require('awareness');
var fs = require("fs");

a.Neuron.setDB({host:'192.168.0.134'});

a.Neuron.projectPath = __dirname;

var users = JSON.parse(fs.readFileSync(a.Neuron.projectPath + '/users.json', "utf8"));


var node = new a.Neuron({
    name: "Узел редуцирования газа", children: {
        valve1: new a.Valve({name: "Кран №1"}),
        valve2: new a.Valve({name: "Кран №2"}),
        valve3x: new a.Valve3x({name: "Кран №13", pos: 'pos'}),
        zad: new a.Neuron({name: "sP", rw: true}),
        pos: new a.Neuron({name: "pos", rw: true}),


        csd: new a.CSD({name: "Сигнализация"})
    }
});


a.Neuron.afterInit = function() {
    var web = new a.Web({secure: false, port: 3000, grafana: 'http://192.168.0.125:3001', users: users}, node);
};
