## Student service

There are modules under this repository
* `student-web-service`  
  The RESTFUL web service.
* `student-web-client`  
  The web client.

---

### student-web-service
To build and execute
``` bash
$ ./gradlew build
$ ./gradlew bootRun
```

By default the web service is running on port 8443, please customize at `application.properties`.

---

### student-web-client
To build and execute
```bash
$ npm i -g @angular/cli
$ npm i
$ ng serve
```