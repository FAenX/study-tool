import proxy from "http-proxy-middleware";


  export default function(app) {  
    app.use(proxy("/api/v1/**", 
    // { target: "http://young-tundra-77987.herokuapp.com/", changeOrigin: true, "secure": false, "logLevel": "debug"}));
    { target: "http://127.0.0.1:3002/", changeOrigin: true, "secure": false, "logLevel": "debug"}));
  };

