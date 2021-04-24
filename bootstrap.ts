
import * as DAO from './src/DAO/index';
import * as Models from './src/Models/index';

const create_admin = async() => {
      try {

        // check admin exist or not
        let query = { email :"admin@gmail.com" }
        let projection = { __v : 0 }
        let options = { lean : true }
        let fetch_data : any = await DAO.get_data(Models.Admin, query, projection, options);
        
        if(fetch_data.length == 0) {

            // create admin  
            let save_data = [
                  {
                        email : "admin@gmail.com",
                        password : "qwerty"
                  },
                  {
                        email : "admin_1@gmail.com",
                        password : "qwerty"
                  },
                  {
                        email : "admin_2@gmail.com",
                        password : "qwerty"
                  },
                  {
                        email : "abd@yopmail.com",
                        password : "qwerty"
                  }
            ]

            let options = { multi : true }
            await DAO.insert_many(Models.Admin, save_data, options);

        }

      }
      catch(err) {
            throw err;
      }
}

export default create_admin;