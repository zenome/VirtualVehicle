/**
 * Copyright (c) 2016-present ZENOME, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */

angular.module('sbAdminApp', ['uiGmapgoogle-maps']).config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            key: 'YOUR_GOOGLE_MAP_KEY',
            libraries: 'weather,geometry,visualization'
        });
    }])
  .controller('MainCtrl', ['$scope', '$http', function($scope,$http) {
      $http({
                  method : "GET",
                  url : "http://localhost:3000/vehicle",
                  headers: { 'Content-Type': 'applicatin/json' },
                  data:''
              }).then(function mySucces(response) {
                  console.log(response.data);
                  $scope.CarInformation = response.data[0];
                  
                  $scope.map = { center: { latitude: $scope.CarInformation.Location.Latitude, longitude: $scope.CarInformation.Location.Longitude }, zoom: 9 };
      
                  $scope.options = {scrollwheel: false};
                  $scope.coordsUpdates = 0;
                  $scope.dynamicMoveCtr = 0;
          
                  $scope.marker = {
                        id: 0,
                        coords: {
                          latitude: $scope.CarInformation.Location.Latitude,
                          longitude: $scope.CarInformation.Location.Longitude
                        },
                        options: { draggable: true },
                        events: {
                          dragend: function (marker, eventName, args) {
                            var lat = marker.getPosition().lat();
                            var lon = marker.getPosition().lng();

                            $scope.marker.options = {
                              draggable: true,
                              labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                              labelAnchor: "100 0",
                              labelClass: "marker-labels"
                            };
                          }
                        }
                      };
                      
                      
              }, function myError(error) {
                  console.log(error);
              });
  }]);
