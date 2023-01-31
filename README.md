# DevServer Proxy

Start the local service and start the domain name proxy

## Requirements

You need to add the `.proxyrc.js` configuration file to the project root directory and write the required configuration information.

example

```javascript
module.exports = {
  port: 8080,
  open:true
  proxy: {
    '/example/': {
      target: 'http://www.example.com',
      changeOrigin: true,
    }
  }
};
```