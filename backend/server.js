import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import supabase from './config/supabase.js'
import authRoutes from './routes/authRoutes.js'
import deviceRoutes from './routes/deviceRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'
import logRoutes from './routes/logRoutes.js'
import credentialRoutes from './routes/credentialRoutes.js'
import { startScheduler } from './services/schedulerService.js'

dotenv.config()
startScheduler()

const app = express()
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Test Supabase connection
app.get('/api/health', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .limit(1);

        if (error) {
            return res.status(500).json({
                status: 'error',
                message: 'Database connection failed',
                error: error.message
            });
        }

        return res.status(200).json({
            status: 'ok',
            message: 'Server and Supabase are working',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/credentials', credentialRoutes);

app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
   });
});

app.use((err, req, res) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({ 
        status: 'error',
        message: err.message || 'Internal server error',
        ...process.env.NODE_ENV === 'development' && { stack: err.stack }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check endpoint: http://localhost:${PORT}/api/health`);
});
