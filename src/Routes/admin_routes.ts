
import { admin_controller } from '../Controller/index';
import { success_msg, app_constansts, swagger_msgs } from '../Config/index';
import { universal_functions } from '../Utils/index';
import { admin_validator, header } from '../validators/index';
const scope = app_constansts.scope;


const plugins = {
      "hapi-swagger": {
            payloadType : "form",
            responseMessages : swagger_msgs
      }
}


const admin_login = {
      method : "POST",
      path : "/Admin/Login",
      options : {
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
                  payload : admin_validator.admin_login,
                  failAction : universal_functions.fail_action
            },
            plugins : plugins
      }
}

const access_token_login = {
      method : "GET",
      path : "/Admin/access_token_login",
      options : {
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
                  headers : header,
                  failAction : 'error'
            },
            plugins : plugins
      }
}

const admin_routes = [
      admin_login,
      access_token_login
]

export default admin_routes