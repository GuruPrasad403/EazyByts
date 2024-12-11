import express from 'express';
import cors from 'cors';
import { authRoutes } from './routes/authRoutes.js';
import Main from './config/Database.js';
import { PORT } from './config/env.js';
import blogRouter from './routes/blogRoute.js';
import projectRoute from './routes/projectRoutes.js';
import skillRoute from './routes/skillRoutes.js'
import userRoute from './routes/userRoute.js'
const app = express();
const Port = PORT || '2500';

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/", userRoute)
app.use("/api/blog", blogRouter);
app.use("/api/project", projectRoute); // Corrected route
app.use("/api/skills", skillRoute)
app.get("/", (req, res) => {
    res.json({ msg: "This is the Backend" });
});

// Error handler middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: status
        }
    });
    next();
});

try {
    Main();
    app.listen(Port, () => {
        console.log("server is running at  http://localhost:" + Port);
    });
} catch (e) {
    console.log(e);
}
