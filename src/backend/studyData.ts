import axios from 'axios'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let APP_ID=process.env.REACT_APP_APP_ID

export class studyDataFunctions {
  public email?:string
  public password?: string

  constructor(
    email?: string,
    password?: string
  ){
    this.email = email
    this.password = password
  }

  //authenticate
 async authenticate(){

    let config = {
      headers: {
        'Content-Type': 'application/json' 
      }
    }
  
    let data = {
      username: this.email ? this.email : process.env.REACT_APP_USERNAME,
      password: this.password? this.password : process.env.REACT_APP_PASSWORD
    }
    
    let auth = await axios.post(
      `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/auth/providers/local-userpass/login`,
      JSON.stringify(data),
      config
      
      )
    return auth.data
  
  }

    // try appolo
    private httpLink = createHttpLink({
      uri: `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`,
    });

    private authLink = setContext(async (_, { headers }) => {
      const token = (await new studyDataFunctions().authenticate()).access_token
      // return the headers to the context so httpLink can read them
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    });

    public client = new ApolloClient({
      link: this.authLink.concat(this.httpLink),
      cache: new InMemoryCache()
    });
}



