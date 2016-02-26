# SMSes

Exchange sms messages between twilio API and a mobile phone.

## Clone project

```sh
$ git clone https://github.com/fcaravana/smses
```

### Install node modules

```sh
$ cd smses
$ npm install
```

### Install bower packages

```sh
$ cd smses/client/assets/js/
$ bower install
```

### Run gulp to copy js libs and css libs
```sh
$ cd smses
$ ./node_modules/.bin/gulp default
```

### Configure ini settings file

* Edit server/shared/config/config.ini and add:

```
[twilio]
account_sid = xyzba507a1b3fcd45a3de98dd5408d3xyz
auth_token = xyz28ced29a4e0a65eb08c32d2c24xyz
number = +1x103x59x0x
mobile = +3x191x253x4x
```

### Start http server on port 8080
```sh
$ cd smses
$ node server.js
```

* Or run with nodemon
```sh
$ cd smses
$ nodemon server.js
```

### Open browser and type

* http://localhost:8080/