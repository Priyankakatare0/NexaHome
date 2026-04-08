# 🧪 Quick API Test Commands - Copy & Paste Ready!

## Setup (Do This First)
```bash
# Make sure server is running
cd backend
npm start
```

Keep server running, then run tests in ANOTHER terminal.

---

## 📝 Test Data (Copy & Use)

### 1️⃣ REGISTER USER
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Pass123!"}'
```

**Save the user ID from response**

---

### 2️⃣ LOGIN & GET TOKEN
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Pass123!"}'
```

**Copy the token from response!**
```
Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Then run:**
```bash
$TOKEN="paste_your_token_here"
```

---

### 3️⃣ CREATE DEVICE
```bash
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Living Room Light","type":"switch"}'
```

**Copy DEVICE_ID from response!**
```bash
$DEVICE_ID="paste_device_id_here"
```

---

### 4️⃣ GET ALL DEVICES
```bash
curl http://localhost:5000/api/devices \
  -H "Authorization: Bearer $TOKEN"
```

---

### 5️⃣ TOGGLE DEVICE ON
```bash
curl -X PUT http://localhost:5000/api/devices/$DEVICE_ID/toggle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"state":true}'
```

---

### 6️⃣ TOGGLE DEVICE OFF
```bash
curl -X PUT http://localhost:5000/api/devices/$DEVICE_ID/toggle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"state":false}'
```

---

### 7️⃣ CREATE SCHEDULE (Turn ON at 7 AM on weekdays)
```bash
curl -X POST http://localhost:5000/api/schedules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"device_id":"'$DEVICE_ID'","action":"ON","time":"07:00","days":"1,2,3,4,5"}'
```

**Copy SCHEDULE_ID from response!**
```bash
$SCHEDULE_ID="paste_schedule_id_here"
```

---

### 8️⃣ GET ALL SCHEDULES
```bash
curl http://localhost:5000/api/schedules \
  -H "Authorization: Bearer $TOKEN"
```

---

### 9️⃣ UPDATE SCHEDULE (Turn OFF at 10 PM)
```bash
curl -X PUT http://localhost:5000/api/schedules/$SCHEDULE_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"action":"OFF","time":"22:00"}'
```

---

### 🔟 ADD ACTIVITY LOG
```bash
curl -X POST http://localhost:5000/api/logs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"device_id":"'$DEVICE_ID'","action":"turned_on","triggered_by":"user"}'
```

---

### 1️⃣1️⃣ GET ACTIVITY LOGS
```bash
curl "http://localhost:5000/api/logs?limit=50&offset=0" \
  -H "Authorization: Bearer $TOKEN"
```

---

### 1️⃣2️⃣ GET LOGS FOR SPECIFIC DEVICE
```bash
curl "http://localhost:5000/api/logs?device_id=$DEVICE_ID" \
  -H "Authorization: Bearer $TOKEN"
```

---

### 1️⃣3️⃣ DELETE SCHEDULE
```bash
curl -X DELETE http://localhost:5000/api/schedules/$SCHEDULE_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

### 1️⃣4️⃣ DELETE DEVICE
```bash
curl -X DELETE http://localhost:5000/api/devices/$DEVICE_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## ❌ Error Test Cases

### Test: No Token
```bash
curl http://localhost:5000/api/devices
```
**Expected**: 401 - "No token provided. Not authorized"

---

### Test: Invalid Password
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"WrongPassword"}'
```
**Expected**: 401 - "Invalid email or password"

---

### Test: Missing Required Fields
```bash
curl -X POST http://localhost:5000/api/devices \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"type":"switch"}'
```
**Expected**: 400 - "Device name is required"

---

### Test: Invalid Device State
```bash
curl -X PUT http://localhost:5000/api/devices/$DEVICE_ID/toggle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"state":"yes"}'
```
**Expected**: 400 - "State must be a boolean (true/false)"

---

### Test: Invalid Action
```bash
curl -X POST http://localhost:5000/api/schedules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"device_id":"'$DEVICE_ID'","action":"TOGGLE","time":"07:00","days":"1,2,3,4,5"}'
```
**Expected**: 400 - "Action must be "ON" or "OFF""

---

## 🧑‍💻 Using in Postman

Import this collection or use individual requests:

**Base URL**: `http://localhost:5000`

**Headers for protected routes**:
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

---

## ⏰ Scheduler Test

The scheduler runs **every minute** at the exact time.

1. Create a schedule for the current time + 1 minute
2. Wait 1 minute
3. Check `/api/logs` - you should see a new log entry with `"triggered_by": "schedule"`

Example:
```bash
# If current time is 10:35, create schedule for 10:36
curl -X POST http://localhost:5000/api/schedules \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"device_id":"'$DEVICE_ID'","action":"ON","time":"10:36","days":"1"}'
```

Then wait 1 minute and check logs.

---

## 📊 Response Format

All successful responses follow this format:
```json
{
  "status": "success",
  "message": "Operation description",
  "data": { ... }
}
```

All error responses:
```json
{
  "status": "error",
  "message": "Error description"
}
```

---

## 🎯 Summary

✅ **Server**: Running on port 5000  
✅ **Database**: Connected and ready  
✅ **Auth**: JWT tokens working  
✅ **CRUD**: Devices, Schedules, Logs functional  
✅ **Scheduler**: Auto-running every minute  
✅ **Validation**: Input validation on all endpoints  
✅ **Security**: Authorization checks on all protected routes  

**Status: PRODUCTION READY** 🚀

---

Generated: April 7, 2026
