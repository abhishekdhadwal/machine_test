
import { task_controller } from '../Controller/index';
import { success_msg, swagger_msgs } from '../Config/index';
import { universal_functions } from '../Utils/index';
import { task_validator } from '../validators/index';


const plugins = {
      "hapi-swagger": {
            payloadType : "form",
            responseMessages : swagger_msgs
      }
}


const list_tasks = {
      method : "GET",
      path : "/Tasks/list_tasks",
      options : {
            description : "List assigned tasks",
            auth : false,
            tags : ["api"],
            handler : (request, reply) => {
                  return task_controller.list_tasks(request.query)
                  .then(response => {
                        return universal_functions.send_success(success_msg.default_msg, response);
                  })    
                  .catch(error => {
                        return universal_functions.send_error(error, reply);
                  });
            },
            validate : {
                  query : task_validator.list_tasks,
                  failAction : 'error'
            },
            plugins : plugins
      }
}

const assign_task = {
      method : "POST",
      path : "/Tasks/assign_task",
      options : {
            description : "Assign task api",
            auth : false,
            tags : ["api"],
            handler : (request, reply) => {
                  return task_controller.assign_task(request.payload)
                  .then(response => {
                        return universal_functions.send_success(success_msg.default_msg, response);
                  })    
                  .catch(error => {
                        return universal_functions.send_error(error, reply);
                  });
            },
            validate : {
                  payload : task_validator.assign_task,
                  failAction : 'error'
            },
            plugins : plugins
      }
}


const task_routes = [
      list_tasks,
      assign_task
]

export default task_routes