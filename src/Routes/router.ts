
import simplify_route from './simplify_routes';
import * as admin_routes  from './admin_routes';


const router : any = [
      simplify_route(admin_routes.login_options),
      simplify_route(admin_routes.access_token_login_options),
]

export default router