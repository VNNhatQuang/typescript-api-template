import user from "../routes/user";
import { Express } from "express";


/**
 * Define routes
 * @param app 
 */
const Routes = (app: Express): void => {
    app.use('/api/user', user);
}



export default Routes;
