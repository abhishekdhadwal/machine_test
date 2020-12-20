import Joi from 'joi';
import { admin_controller } from '../../Controller/index';
import { success_msg, app_constansts } from '../../Config/index';
import { universal_functions } from '../../Utils/index';
const scope = app_constansts.scope;


const login_options = {
      method : "POST",
      path : "/Admin/Login",
      description : "Admin login api",
      auth : false,
      tags : ["api"],
      handler : (request, reply) => {
            return admin_controller.login(request.payload)
            .then(response => {
                  return universal_functions.send_success(success_msg.default_msg, response);
            })    
            .catch(error => {
                  return universal_functions.send_error(error, reply);
            });
      },
      validate : {
            payload : Joi.object({
                    email : Joi.string().email().required().description("Enter your Email Address"),
                    password : Joi.string().required().description("Enter your Password")
              }),
            failAction : 'error'
      }
}

const access_token_login_options = {
      method : "GET",
      path : "/Admin/access_token_login",
      description : "Access Token Login Api",
      auth : { strategies : [ scope.admin ] },
      tags : ["api"],
      handler : (request, reply) => {
            return admin_controller.access_token_login(request.auth.credentials)
            .then(response => {
                  return universal_functions.send_success(success_msg.default_msg, response);
            })    
            .catch(error => {
                  return universal_functions.send_error(error, reply);
            });
      },
      validate : {
            headers : Joi.object({ authorization : Joi.string().required() }).options({ allowUnknown: true }),
            failAction : 'error'
      }
}


export {
      login_options,
      access_token_login_options
}