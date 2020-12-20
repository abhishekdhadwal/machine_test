
import simplify_route from './simplify_routes';
import { admin_options } from './options/index';


const router : any = [
      simplify_route(admin_options.login_options),
      simplify_route(admin_options.access_token_login_options),
]

export default router