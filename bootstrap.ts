
import * as DAO from './src/DAO/index';
import * as Models from './src/Models/index';


const add_tasks = async() => {
      try {

            // check task already exists or not           
            let task_count = await check_tasks()

            if(task_count < 40) {
                  
                  // remove old tasks
                  await DAO.remove_many(Models.Tasks, {})

                  // add new tasks
                  await genertate_random_tasks()

            }

      }
      catch(err) {
            throw err;
      }
}


const check_tasks = async() => {
      try {

            let fetch_count = await DAO.count_data(Models.Tasks, {})
            return fetch_count

      }
      catch(err) {
            throw err;
      }
}


const genertate_random_tasks = async() => {
      try {

            let data_to_insert = [], assigned_by = 'user_1';

            for(let i = 0; i<40; i++) {

                  let index = i+1

                  data_to_insert.push({
                        name : `task_${index}`, 
                        assigned_by : assigned_by,
                        assigned_to : `user_${index + 1}`,
                        task_no : index, 
                        created_at : +new Date()
                  })
            }

            let options = { multi : true }
            await DAO.insert_many(Models.Tasks, data_to_insert, options)

      }
      catch(err) {
            throw err;
      }
}



export default add_tasks;