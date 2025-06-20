import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
origin: '*',  // or specify specific origins like ['http://localhost:3000']
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: false, // must be false if origin is '*'

})) 

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}));
app.use(express.static('public'));

app.use(cookieParser());


// routes import
 import userRouter from './routes/user.routes.js';
//  import appointmentRouter from './routes/appointment.routes.js';
import appointmentRouter from "./routes/appointment.routes.js"


// routes decleration
 app.use('/api/v1/users',userRouter);
 app.use('/api/v1/appointments', appointmentRouter);


export { app } 