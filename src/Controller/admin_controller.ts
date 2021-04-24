
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
import { common_controller }  from './index';
const scope = app_constansts.scope;


const login = async(payloadData : any) => {
      try {

            let query = { email : payloadData.email }
            let projection = { __v : 0 }
            let options = { lean : true }
            let fetch_data : any = await DAO.get_data(Models.Admin, query, projection, options)
            
            if(fetch_data.length) {

                  let password_1 = fetch_data[0].password
                  let password_2 = payloadData.password

                  if(password_1 != password_2) {
                        throw error_msg.invalid_password;
                  }else {

                        // generate token 
                        let token_data = await common_controller.admin_token_data(fetch_data)
                        let get_token = await common_controller.fetch_token(token_data)
                        return get_token

                  }

            }else {
                  throw error_msg.no_data_found;
            }

      }
      catch(err) {
            throw err;
      }
}

const access_token_login = async(userData : any) => {
      try {
            
            return userData;

      }
      catch(err) {
            throw err;
      }
}

export  { 
      login,
      access_token_login
}