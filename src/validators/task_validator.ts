import Joi from 'joi';

const list_tasks =  Joi.object({
      pagination : Joi.number().required().default(1)
})

const assign_task = Joi.object({
      name : Joi.string().required().description('eg : task_1'),
      assigned_by : Joi.string().required().description('eg : user_1'),
      assigned_to : Joi.string().required().description('eg : user_2'),
})

export {
      list_tasks,
      assign_task
}