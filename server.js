import express from 'express';
import { join } from 'path';
import proxy from 'express-http-proxy';

import compression from 'compression';
import helmet from "helmet"
import cors from "cors"


const backendUrl = "http://young-tundra-77987.herokuapp.com/";


const app = express();

app.use(helmet())
app.use(compression())


// Serve static files....
app.use(express.static(__dirname + '/build'));

app.set("x-powered-by", true)

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json())

app.get('/api/*',proxy(backendUrl));
app.post('/api/*',proxy(backendUrl));

app.get("/*", (req, res)=> {
  res.sendFile('index.html', { root: join(__dirname, "/build") });     
});

// default Heroku PORT
app.listen(process.env.PORT || 5000);