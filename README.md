### Some demos showing post cross domain request.

### Get Start

Before you get start , make sure you have install nodejs in your local machine .

Download the project , and run

```
npm install
npm run start
```

Need run in 80 port , so may be need root privileges.

You need add some local domain mappings to _127.0.01_ in you hosts file , and open the browser in the main
domain.

+ `www.server.com`
+ `sub.server.com`

### Introduction

Some cross domain method includes:

+ `document.domain`
+ `window.name`
+ `window.postMessage()`
+ hash fragment change event
+ JSONP
+ CORS
