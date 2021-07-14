

import * as admin_routes  from './admin_routes';
import * as user_routes from './user_routes'

const router : any = [

      // admin routes
      admin_routes.admin_login,

      // user routes
      user_routes.signup,
      user_routes.login

]

export default router