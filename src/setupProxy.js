

import proxy from "http-proxy-middleware";


export default function(app) {  
    app.use(proxy("/api", 
      { target: "https://young-tundra-77987.herokuapp.com/", 
        changeOrigin: true, 
      }
    ));
  };

