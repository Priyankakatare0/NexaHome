# 🚀 Nexa Home - Backend API Testing Guide

## Backend Status ✅

✅ **Server**: Configured and running on port 5000  
✅ **Database**: All 4 tables created (users, devices, schedules, device_logs)  
✅ **Auth**: JWT authentication with middleware  
✅ **Routes**: All 4 routes connected (auth, devices, schedules, logs)  
✅ **Scheduler**: Cron job set up to run every minute  

---

## 📋 API Endpoints Summary

### Authentication Routes: `/api/auth`
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token

### Device Routes: `/api/devices` (Protected)
- `GET /api/devices` - Get all devices
- `POST /api/devices` - Create new device
- `PUT /api/devices/:id/toggle` - Toggle device state
- `DELETE /api/devices/:id` - Delete device

### Schedule Routes: `/api/schedules` (Protected)
- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Create new schedule
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

### Log Routes: `/api/logs` (Protected)
- `GET /api/logs` - Get all logs
- `POST /api/logs` - Add new log

### Health Check
- `GET /api/health` - Check server and database status

---

## 🧪 Step-by-Step Testing Guide

### Step 1: Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Server and Supabase are working",
  "timeStamp": "2026-04-07T10:30:00.000Z"
}
```

---

### Step 2: Register User (REQUIRED FIRST)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Account created successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Step 3: Login (GET JWT TOKEN)

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**⚠️ SAVE THIS TOKEN - YOU'LL NEED IT FOR ALL PROTECTED ROUTES!**

---

### Step 4: Create Device

Use the token from login step:

```bash
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "Living Room Light",
    "type": "switch"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Device created successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Living Room Light",
    "type": "switch",
    "device_key": "nx_a1b2c3d4e5f6g7h8",
    "state": false,
    "last_seen": null,
    "created_at": "2026-04-07T10:35:00.000Z"
  }
}
```

**⚠️ SAVE THIS DEVICE ID - NEEDED FOR SCHEDULES & LOGS!**

---

### Step 5: Get All Devices

```bash
curl http://localhost:5000/api/devices \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Living Room Light",
      "type": "switch",
      "device_key": "nx_a1b2c3d4e5f6g7h8",
      "state": false,
      "last_seen": null,
      "created_at": "2026-04-07T10:35:00.000Z"
    }
  ]
}
```

---

### Step 6: Toggle Device State

```bash
curl -X PUT http://localhost:5000/api/devices/660e8400-e29b-41d4-a716-446655440001/toggle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "state": true
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Device toggled successfully",
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "state": true,
    "last_seen": "2026-04-07T10:40:00.000Z"
  }
}
```

---

### Step 7: Create Schedule

```bash
curl -X POST http://localhost:5000/api/schedules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "device_id": "660e8400-e29b-41d4-a716-446655440001",
    "action": "ON",
    "time": "07:00",
    "days": "1,2,3,4,5"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Schedule created successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "device_id": "660e8400-e29b-41d4-a716-446655440001",
    "action": "ON",
    "time": "07:00",
    "days": "1,2,3,4,5",
    "is_active": true,
    "created_at": "2026-04-07T10:45:00.000Z"
  }
}
```

**Days mapping:**
- 0 = Sunday
- 1 = Monday
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday

---

### Step 8: Get All Schedules

```bash
curl http://localhost:5000/api/schedules \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440002",
      "device_id": "660e8400-e29b-41d4-a716-446655440001",
      "action": "ON",
      "time": "07:00",
      "days": "1,2,3,4,5",
      "is_active": true,
      "created_at": "2026-04-07T10:45:00.000Z",
      "devices": {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "name": "Living Room Light",
        "type": "switch"
      }
    }
  ]
}
```

---

### Step 9: Update Schedule

```bash
curl -X PUT http://localhost:5000/api/schedules/770e8400-e29b-41d4-a716-446655440002 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "action": "OFF",
    "time": "22:00",
    "is_active": true
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Schedule updated successfully",
  "data": {
    "id": "770e8400-e29b-41d4-a716-446655440002",
    "action": "OFF",
    "time": "22:00",
    "is_active": true
  }
}
```

---

### Step 10: Add Activity Log

```bash
curl -X POST http://localhost:5000/api/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "device_id": "660e8400-e29b-41d4-a716-446655440001",
    "action": "turned_on",
    "triggered_by": "user"
  }'
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Log created successfully",
  "data": {
    "id": "880e8400-e29b-41d4-a716-446655440003",
    "device_id": "660e8400-e29b-41d4-a716-446655440001",
    "action": "turned_on",
    "triggered_by": "user",
    "created_at": "2026-04-07T10:50:00.000Z"
  }
}
```

---

### Step 11: Get Activity Logs

```bash
curl "http://localhost:5000/api/logs?limit=50&offset=0" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "880e8400-e29b-41d4-a716-446655440003",
      "device_id": "660e8400-e29b-41d4-a716-446655440001",
      "action": "turned_on",
      "triggered_by": "user",
      "created_at": "2026-04-07T10:50:00.000Z",
      "devices": {
        "id": "660e8400-e29b-41d4-a716-446655440001",
        "name": "Living Room Light",
        "type": "switch"
      }
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

---

### Step 12: Delete Schedule

```bash
curl -X DELETE http://localhost:5000/api/schedules/770e8400-e29b-41d4-a716-446655440002 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Schedule deleted successfully"
}
```

---

### Step 13: Delete Device

```bash
curl -X DELETE http://localhost:5000/api/devices/660e8400-e29b-41d4-a716-446655440001 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Device deleted successfully"
}
```

---

## ⚡ Quick Test Script (Save as test.sh)

```bash
#!/bin/bash

BASE_URL="http://localhost:5000"

# Register
echo "📝 Registering user..."
REGISTER=$(curl -s -X POST $BASE_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpass123"
  }')
echo $REGISTER | jq .

# Login
echo -e "\n🔐 Logging in..."
LOGIN=$(curl -s -X POST $BASE_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }')
echo $LOGIN | jq .

TOKEN=$(echo $LOGIN | jq -r '.token')
echo -e "\n✅ TOKEN: $TOKEN"

# Create Device
echo -e "\n📱 Creating device..."
DEVICE=$(curl -s -X POST $BASE_URL/api/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Device",
    "type": "switch"
  }')
echo $DEVICE | jq .

DEVICE_ID=$(echo $DEVICE | jq -r '.data.id')
echo -e "\n✅ DEVICE_ID: $DEVICE_ID"

# Get Devices
echo -e "\n📋 Getting devices..."
curl -s $BASE_URL/api/devices \
  -H "Authorization: Bearer $TOKEN" | jq .

# Toggle Device
echo -e "\n🔄 Toggling device..."
curl -s -X PUT $BASE_URL/api/devices/$DEVICE_ID/toggle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"state": true}' | jq .

# Create Schedule
echo -e "\n⏰ Creating schedule..."
SCHEDULE=$(curl -s -X POST $BASE_URL/api/schedules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"device_id\": \"$DEVICE_ID\",
    \"action\": \"ON\",
    \"time\": \"07:00\",
    \"days\": \"1,2,3,4,5\"
  }")
echo $SCHEDULE | jq .

# Get Schedules
echo -e "\n📋 Getting schedules..."
curl -s $BASE_URL/api/schedules \
  -H "Authorization: Bearer $TOKEN" | jq .

# Add Log
echo -e "\n📝 Adding log..."
curl -s -X POST $BASE_URL/api/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"device_id\": \"$DEVICE_ID\",
    \"action\": \"switched_on\",
    \"triggered_by\": \"user\"
  }" | jq .

# Get Logs
echo -e "\n📋 Getting logs..."
curl -s "$BASE_URL/api/logs?limit=10&offset=0" \
  -H "Authorization: Bearer $TOKEN" | jq .

echo -e "\n✅ API Testing Complete!"
```

---

## 🐛 Error Scenarios & Responses

### Missing Required Fields
```json
{
  "status": "error",
  "message": "Name, email, and password are required"
}
```

### Invalid Credentials
```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

### Unauthorized (Missing Token)
```json
{
  "status": "error",
  "message": "No token provided. Not authorized"
}
```

### Device Not Found
```json
{
  "status": "error",
  "message": "Device not found or does not belong to you"
}
```

### Unauthorized Access
```json
{
  "status": "error",
  "message": "Unauthorized to toggle this device"
}
```

---

## 📊 Database Structure

**users**: id, name, email, password, created_at  
**devices**: id, user_id, name, type, device_key, state, last_seen, created_at  
**schedules**: id, device_id, action (ON/OFF), time (HH:MM), days (1,2,3...), is_active, created_at  
**device_logs**: id, device_id, action, triggered_by (user/schedule/device), created_at  

---

## ✅ Manual Testing Checklist

- [ ] Health check passes
- [ ] Register new user
- [ ] Login returns JWT token
- [ ] Create device
- [ ] Get all devices
- [ ] Toggle device state
- [ ] Create schedule
- [ ] Get all schedules
- [ ] Update schedule
- [ ] Add activity log
- [ ] Get activity logs
- [ ] Delete schedule
- [ ] Delete device
- [ ] Try accessing another user's device (should fail)
- [ ] Test invalid token (should fail)

---

**Ready to test! Start the server with `npm start` in backend folder.** 🚀
