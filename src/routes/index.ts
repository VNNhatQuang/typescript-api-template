import user from "../routes/user";
import auth from "../routes/auth";
import { Express } from "express";


/**
 * Define routes
 * @param app 
 */
const Routes = (app: Express): void => {

    app.use('/api/auth', auth);
    app.use('/api/user', user);
    
}



export default Routes;
