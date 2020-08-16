import axios from 'axios'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


let APP_ID='application-0-gcawx'

export class studyDataFunctions {

  constructor(){}

  //authenticate
 async authenticate(){

    let config = {
      headers: {
        'Content-Type': 'application/json' 
      }
    }
  
    let data = {
      username: 'kipronofb@gmail.com',
      password: 'p8L8qu5sgmS$9VH'
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



