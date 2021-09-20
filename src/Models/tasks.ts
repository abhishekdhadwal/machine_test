
import { createSchema, Type, typedModel } from 'ts-mongoose';

const TasksSchema = createSchema({

      name : Type.string({ default : null }), 
      task_no : Type.number(), 
      created_at : Type.number({ default : +new Date() })

})

const Tasks = typedModel('tasks', TasksSchema);

export default Tasks