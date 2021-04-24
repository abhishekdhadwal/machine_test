
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { generate_token } from '../Libs/index';
const scope = app_constansts.scope;



const fetch_token = async(function_data : any) => {
      try {

            let fetch_token = await generate_token(function_data)

            // save token in database
            let query = { _id : function_data._id }
            let update_data = { 
                  access_token : <string>fetch_token, 
                  token_gen_at : function_data.token_gen_at 
            }
            let options = { new : true }
            let token_info = await DAO.find_and_update(function_data.collection, query, update_data, options)
            return token_info

      }
      catch(err) {
            throw err;
      }
}

const admin_token_data = async(data : any) => {
      try {

            let token_data = { 
                  _id : data[0]._id,
                  scope : scope.admin,
                  collection : Models.Admin,
                  token_gen_at : +new Date()
            }

            return token_data

      }
      catch(err) {
            throw err;
      }
}


export {
      fetch_token,
      admin_token_data
}