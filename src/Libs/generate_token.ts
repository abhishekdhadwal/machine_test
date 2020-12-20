import * as jwt from 'jsonwebtoken';
import * as DAO from "../DAO";
import * as Models from '../Models';
import { error_msg, app_constansts } from '../Config/index';

const sk = app_constansts.seckret_keys;
const scope = app_constansts.scope;
const options = { algorithm : "HS256" };


// STEP 1 : GENERATE TOKEN
const generate_token = (token_data : any) => {

      return new Promise((resolve, reject) => {
            try {

                  let seckret_key = "my_secret_key";
                  if(token_data.scope == scope.admin) { seckret_key = sk.admin_seckret_key }

                  const token = jwt.sign(token_data, seckret_key, options)
                  return resolve(token);

            }
            catch(err) {
                  throw reject(err);
            }
      })

}

// STEP 2 : VERIFY TOKEN
const verify_token = async (token : any) => {
      try {

            let decoded = token;
            // if(token.scope == scope.admin) { decoded = jwt.verify(token, sk.admin_seckret_key) }
            // else if(token.scope == scope.work_provider) { decoded = jwt.verify(token, sk.wp_seckret_key) }
            // else if(token.scope == scope.data_expert) { decoded = jwt.verify(token, sk.de_seckret_key) }

            // console.log("----------------------decoded---",decoded)

            let query : any = { 
                  _id : decoded._id, 
                  access_token : { $ne : null },
                  token_gen_at : decoded.token_gen_at
            }
            let projection = { __v : 0 }
            let options = { lean : true }
            let fetch_data : any = {}
      
            if(decoded.scope == scope.admin) {
                  fetch_data = await DAO.get_data(Models.Admin, query, projection, options)
            }
            
            if(fetch_data.length == 0) { throw error_msg.unauthorized }
            else { 
                  return { 
                        isValid : true,
                        credentials : fetch_data[0]
                  }
            }

      }
      catch(err) {
            throw err;
      }

}


export {
      generate_token,
      verify_token
}