
import * as DAO from '../DAO/index';
import * as Models from '../Models/index';
import { error_msg, app_constansts } from '../Config/index';
const default_limit = app_constansts.default_limit


const list_tasks = async(payload_data : any) => {
    try {

        let { pagination } = payload_data

        // if pagination = 0 then skip all data
        let total_tasks = await fetch_total_tasks()

        let skip_data = total_tasks, limit_data = 0;

        if(pagination > 0) {
            skip_data = default_limit * (pagination - 1)
            limit_data = default_limit
        }

        let query = {}
        let projection = { __v : 0 }
        let options = { 
            lean : true, 
            sort : { _id : -1, task_no : -1 },
            skip : skip_data, 
            limit : limit_data
        }
        let fetch_data : any = await DAO.get_data(Models.Tasks, query, projection, options)

        return {
            count : fetch_data.length,
            data : fetch_data
        }

    }
    catch(err) {
        throw err;
    }
}


const fetch_total_tasks = async() => {
    try {

        let fetch_count = await DAO.count_data(Models.Tasks, {})
        return fetch_count

    }
    catch(err) {
        throw err;
    }
}


const assign_task = async(payload_data : any) => {
    try {

        let { name, assigned_by, assigned_to } = payload_data

        // fetch task no
        let total_tasks = await fetch_total_tasks()
        let task_no : number = Number(total_tasks) + 1

        let data_to_save = {
            name : name,
            assigned_by : assigned_by,
            assigned_to : assigned_to,
            task_no : task_no,
            created_at : +new Date()
        }

        let response = await DAO.save_data(Models.Tasks, data_to_save)
        return response


    }
    catch(err) {
        throw err;
    }
}


export  { 
    list_tasks,
    assign_task
}