(function() {

  var mongo = require('mongodb');
  var ObjectID = require('mongodb').ObjectID;

  var Server = mongo.Server,
      Db = mongo.Db,
      BSON = mongo.BSONPure;

  var server = new Server('localhost', 27017, {auto_reconnect: true});
  var vehicledb = new Db('vehicledb', server);


  vehicledb.open(function(err, db) {
      if(!err) {
          console.log("Connected to 'vehicledb' database from libvehicle");
          db.collection('vehicle', {safe:true}, function(err, collection) {
              if (err) {
                  console.log("The 'apidb' collection doesn't exist. Creating it with sample data...");
              }
          });
      }
  });

  var vehicle = new Object();
  /*
  vehicle.insert = function(api, url, method, headers, body, returncode, returnvalue) {
    var document = {timestamp: Date.now(),
                    api:api,
                    url:url,
                    method:method,
                    headers:headers,
                    body:body,
                    returncode:returncode,
                    returnvalue:returnvalue
    };

    vehicledb.collection('vehicle', function(err, collection) {
      collection.insert(document, {safe:true}, function(err, result) {
        if (err) {
            console.log("'error':'An error has occurred'");
        } else {
        }
      });
    });
  };
  */

  vehicle.get= function(cb) {
    vehicledb.collection('vehicle', function(err, collection) {
      collection.find().toArray(function(err, items) {
        cb(items);
      });
    });
  };

  vehicle.update= function(item, cb) {
    vehicledb.collection('vehicle', function(err, collection) {
      var itemToUpdate = {_id : ObjectID(item._id)};
      console.log("item: " + JSON.stringify(itemToUpdate));
      delete item._id;
      collection.update(itemToUpdate, {$set:item}, function(err, results) {
        console.log("udpated:");
        console.log("  err: " + err);
        console.log("  results: " + results);
        vehicle.get(cb);
      });
    });
  };

  vehicle.add= function(item, cb) {
    vehicledb.collection('vehicle', function(err, collection) {
      collection.insert(item, function(err, results) {
        vehicle.get(cb);
      });
    });
  };


  vehicle.delete= function(lid, cb) {
    vehicledb.collection('vehicle', function(err, collection) {
      var deleteObject = {_id : ObjectID(lid)};
      collection.deleteMany(deleteObject, function(err, results) {
        vehicle.get(cb);
      });
    });
  };

  vehicle.getByQuery = function(query, cb) {
    console.log('query: ' + query);
    vehicledb.collection('vehicle', function(err, collection) {
      collection.find(query).toArray(function(err, items) {
        cb(err, items);
      });
    });
  };




  module.exports = vehicle;
})();
