(function() {
    var express = require('express');
    var router = express.Router();
    var libvehicle = require('./libvehicle');
    var uuid = require('uuid');

    router.get('/', function(req, res, next) {
        console.log('get to /vehicle called');
        try {
            libvehicle.get(function(results) {
                res.send(results);
            });
        }
        catch (e) {
            console.log(e);
            throw(e);
        }
    });

    router.put('/', function(req, res) {
        console.log('put to /vehicle called');
        console.log('req.body: ' + JSON.stringify(req.body));
        var item = req.body;
        try {
            libvehicle.update(item, function(results) {
                res.send(results);
            });
        }
        catch (e) {
            console.log(e);
            throw(e);
        }

    });

    router.post('/', function(req, res) {
        console.log('post to /vehicle called');
        console.log('req.body: ' + JSON.stringify(req.body));
        var item = req.body;
        item.uuid = uuid.v4();

        try {
            libvehicle.add(item, function(results) {
                res.send(results);
            });
        } catch (e) {
            console.log(e);
            throw(e);
        }
    });

    router.delete('/:lid', function(req, res, next) {
        console.log('delete to /vehicle called');
        console.log("parameter: " +req.params.lid);

        try {
            var lid = req.params.lid;
          	console.log("ID parameter: " + req.params.lid);
            libvehicle.delete(lid, function(results) {
              res.send(results);
            });
        }
        catch (e) {
            console.log(e);
            throw(e);
        }
    });

    router.post('/engineon', function(req, res) {
        console.log('post to /vehicle called');
        console.log('req.body: ' + JSON.stringify(req.body));
        var item = req.body;
        
        item.status = 'Engine On';

        try {
            libvehicle.update(item, function(results) {
                res.send(results);
            });
        }
        catch (e) {
            console.log(e);
            throw(e);
        }
    });

    router.post('/engineoff', function(req, res) {
        console.log('post to /vehicle called');
        console.log('req.body: ' + JSON.stringify(req.body));
        var item = req.body;
        
        item.status = 'Engine Off';

        try {
            libvehicle.update(item, function(results) {
                res.send(results);
            });
        }
        catch (e) {
            console.log(e);
            throw(e);
        }
    });



    module.exports = router;
})();
