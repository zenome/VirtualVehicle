#!/bin/sh
curl "http://localhost:3000/vehicle"  -H "Content-Type: application/json;charset=utf-8" -H "Accept: application/json" -X POST -d @sample_add_vehicle.json
