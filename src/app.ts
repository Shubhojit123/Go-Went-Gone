import * as express from 'express';
import * as dotenv from "dotenv";
import initializeModules from './modules/initializeModules';
import { connectDB } from './cofig/mongoConfig';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
initializeModules(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectDB()