import * as Mongoose from 'ts-mongoose';

const AdminSchema = Mongoose.createSchema({
      access_token : { type : String, default : null },
      email : { type : String, default : null },
      password : { type : String, default : null },
      token_gen_at : { type : String, default : null },
      created_at : { type : String, default : +new Date() },
})

const Admin = Mongoose.typedModel('admins', AdminSchema);

export default Admin