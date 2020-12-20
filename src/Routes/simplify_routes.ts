import { swagger_msgs } from '../Config/index';

const plugins = {
      "hapi-swagger": {
            payloadType : "form",
            responseMessages : swagger_msgs
      }
}

const simplify_route = (options : any) => {

      let route = {
            method : options.method,
            path : options.path,
            options : {
                  description : options.description,
                  auth : options.auth,
                  tags : options.tags,
                  handler : options.handler,
                  validate : options.validate,
                  plugins : plugins
            }
      }

      return route

}


export default simplify_route