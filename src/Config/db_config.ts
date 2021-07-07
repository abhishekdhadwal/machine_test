
import { config } from 'dotenv';
config();

let db_config : any = {}

if(process.env.NODE_ENV == 'local') {
      
      db_config = {
            PORT : process.env.SERVER_PORT_DEV,
            URI : 'mongodb://localhost:27017/base_project_hapi_ts'    
      }

} 
else if(process.env.NODE_ENV == 'server') {

      db_config = {
            PORT : process.env.SERVER_PORT_PROD,
            URI : 'mongodb://localhost:27017/base_project_hapi_ts'    
      }

}


export default db_config