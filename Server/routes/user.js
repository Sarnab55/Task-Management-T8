import express from 'express'
import {changepassword, checkemail, login} from '../controllers/login.js'
import { signUp } from '../controllers/signup.js'
const routes=express.Router()

routes.post('/login',login)
routes.post('/signup',signUp)
routes.post('/checkemail', checkemail);
routes.post ('/changepassword', changepassword);
export default routes
// The above code snippet is a route that defines the login route. 
// The route uses the express.Router() method to create a new router. 
// The router is then used to define a POST route for the /login endpoint.
//  The route uses the login controller function to handle the login logic. 
// The route is exported so that it can be used in other files.