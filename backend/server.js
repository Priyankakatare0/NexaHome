import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import supabase from './config/supabase.js';
import authRoutes from './routes/authRoutes.js';
import deviceRoutes from './routes/deviceRoutes.js';
import scheduleRoutes from './routes/scheduleRoutes.js';
import logRoutes from './routes/logRoutes.js';
import credentialRoutes from './routes/credentialRoutes.js';
import { startScheduler } from './services/schedulerService.js';

dotenv.config();
startScheduler();

const app = express();
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

// CORS setup (allow frontend, credentials, preflight)
const allowedOrigins = [...new Set([
    frontendUrl,
    'http://localhost:5173',
    'http://localhost:3000',
])];

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
        methods: ['GET', 'POST']
    }
});
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
// Handle preflight OPTIONS requests for all routes
app.options(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


// --- Socket.IO logic for real-time device state sync ---
// In-memory device state (replace with DB in production)
const deviceStates = {};

io.on('connection', (socket) => {
    console.log('Socket.IO client connected:', socket.id);

    // Client requests all device states
    socket.on('getAllDeviceStates', () => {
        socket.emit('allDeviceStates', deviceStates);
    });

    // Device state change from client
    socket.on('deviceStateChange', ({ deviceId, newState }) => {
        deviceStates[deviceId] = newState;
        io.emit('deviceStateUpdate', { deviceId, newState });
    });

    // Log all deviceStateUpdate events sent to clients
    socket.on('deviceStateUpdate', ({ deviceId, newState }) => {
        console.log(`[SOCKET] deviceStateUpdate event received by socket ${socket.id}: deviceId=${deviceId}, newState=${JSON.stringify(newState)}`);
    });
});

server.listen(PORT, () => {
    console.log(`Server (API + Socket.IO) running on port ${PORT}`);
    console.log(`Health check endpoint: http://localhost:${PORT}/api/health`);
});
