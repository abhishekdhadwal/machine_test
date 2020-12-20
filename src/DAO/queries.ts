
const save_data = (model : any, data : any) => {
    return new Promise((resolve, reject) => {
        try {
            let saveData = model.create(data);
            return resolve(saveData);
        } catch (err) {
            return reject(err);
        }
    });
}

const get_data = (model : any, query : any, projection : any, options : any) => {
      return new Promise((resolve, reject) => {
            try {

                let findData = model.find(query, projection, options);
                return resolve(findData);

            } catch (err) {
                  return reject(err);
            }
      });
}

const find_and_update = (model : any, conditions : any, update : any, options : any) => {
      return new Promise((resolve, reject) => {
          try {
              let data = model.findOneAndUpdate(conditions, update, options);
              return resolve(data);
          } catch (err) {
              return reject(err);
          }
      });
}

const update_many = (model : any, conditions : any, update : any) => {
    return new Promise((resolve, reject) => {
        try {
            let data = model.updateMany(conditions, update);
            return resolve(data);
        } catch (err) {
            return reject(err);
        }
    });
}



  export {
      save_data,
      get_data,
      find_and_update,
      update_many
  }