import proxy from "http-proxy-middleware";


  export default function(app) {  
    app.use(proxy("/api/v1/**", 
    { target: "http://young-tundra-77987.herokuapp.com/", changeOrigin: true, "secure": false, "logLevel": "debug"}));
  };

