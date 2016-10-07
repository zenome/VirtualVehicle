# VirtualVehicle
<img src="https://github.com/zenome/VirtualVehicle/blob/master/screenshot/frontend.png" alt="VirtualVehicle" width="800"/>

Virtual Vehicle Status is part of services provided by BundleBus(Telematics Service Framework), which allows the simulation of vehicle status information prior to vehicle production.
Automotive OEMs can simply use a mobile app or TCU to call vehicle functions and simulate different vehicle conditions.
Its protocols are easily extensible via Angular.JS and even after the vehicle test is completed, it can be modified to be used in customer web portal.

Virtual Vehicle Status can be downloaded from Github.

# Components
VirtualVehicle has 3 components including backend, frontend and mobile app.

# How to
- Download backend, frontend, mobile app.

Frontend
You need to modify google map key to the app/js/scripts/controllers/main.js
~~~~
> npm install grunt -g
> cd /path/to/frontend
> npm install
> grunt build --force
> cp -R dist /path/to/backend/virtualvehicle/public
~~~~

Then, backend already had the result of frontend.
~~~~
> mongod --dbpath={your db path}
> cd /path/to/backend/virtualvehicle
> npm install
> DEBUG=virtualvehicle:* IPADDRESS=0.0.0.0 ./bin/www
~~~~

Mobile app(for ios)
<br>
<img src="https://github.com/zenome/VirtualVehicle/blob/master/screenshot/mobile%20app.png" alt="Mobile App" width="400" />
~~~~
> cd VirtualVehicle
> npm install
> react-native run-ios
~~~~
