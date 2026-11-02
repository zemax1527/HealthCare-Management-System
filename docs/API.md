# API Documentation

## Healthcare Management System

---

# 1. API Overview

The Healthcare Management System provides RESTful APIs
for authentication, users, patients, doctors, appointments,
medical records, prescriptions, notifications, and files.

## Base URL

Development:

http://localhost:5000/api

Production:

https://your-domain.com/api

---

# 2. HTTP Methods

| Method | Purpose |
|--------|---------|
| GET | Retrieve data |
| POST | Create data |
| PUT | Replace existing data |
| PATCH | Update existing data |
| DELETE | Delete data |

---

# 3. HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# 4. Authentication APIs

## POST /auth/register

Create a new user account.

### Request

```json
{
  "name": "Bhavesh",
  "email": "bhavesh@example.com",
  "password": "password",
  "role": "patient"
}
Response
{
  "success": true,
  "message": "Registration successful",
  "data": {}
}
POST /auth/login

Authenticate a user.

Request
{
  "email": "bhavesh@example.com",
  "password": "password"
}
Response
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "JWT_TOKEN"
  }
}
POST /auth/logout

Logout the authenticated user.

Authentication

Required.

POST /auth/refresh-token

Generate a new access token.

Authentication

Refresh token required.

5. User APIs
GET /users/me

Get the currently authenticated user's profile.

Authentication

Required.

PATCH /users/me

Update the current user's profile.

Authentication

Required.

PATCH /users/change-password

Change the current user's password.

Authentication

Required.

6. Patient APIs
GET /patients

Get patients.

Authentication

Required.

Authorization

Admin / authorized healthcare users.

GET /patients/:id

Get a specific patient.

Authentication

Required.

Authorization

Based on role and permission.

PATCH /patients/:id

Update patient information.

Authentication

Required.

DELETE /patients/:id

Delete/deactivate a patient.

Authentication

Required.

Authorization

Admin.

7. Doctor APIs
GET /doctors

Get list of doctors.

Query Parameters
?page=1&limit=10

Optional filters:

?specialization=cardiology
GET /doctors/:id

Get doctor details.

PATCH /doctors/:id

Update doctor profile.

Authentication

Required.

8. Appointment APIs
POST /appointments

Book an appointment.

Request
{
  "doctorId": "doctor_id",
  "appointmentDate": "2026-10-20",
  "appointmentTime": "10:30"
}
GET /appointments

Get appointments.

Query Parameters
?page=1&limit=10
GET /appointments/:id

Get appointment details.

PATCH /appointments/:id

Update appointment status.

Request
{
  "status": "confirmed"
}

Possible statuses:

pending
confirmed
rejected
cancelled
completed
DELETE /appointments/:id

Cancel an appointment.

9. Medical Record APIs
POST /medical-records

Create a medical record.

Authorization

Doctor / authorized healthcare user.

GET /medical-records/:id

Get medical record.

GET /patients/:patientId/medical-records

Get medical records of a patient.

Authorization

Authorized users only.

PATCH /medical-records/:id

Update a medical record.

10. Prescription APIs
POST /prescriptions

Create a prescription.

Request
{
  "patientId": "patient_id",
  "medicines": [
    {
      "name": "Medicine Name",
      "dosage": "500mg",
      "frequency": "Twice a day",
      "duration": "5 days"
    }
  ],
  "instructions": "Take after food"
}
GET /prescriptions/:id

Get prescription details.

GET /patients/:patientId/prescriptions

Get patient prescriptions.

11. Notification APIs
GET /notifications

Get user notifications.

Query
?page=1&limit=20
PATCH /notifications/:id/read

Mark notification as read.

12. File APIs
POST /files/upload

Upload a file.

Authentication

Required.

Validation

The server shall validate:

File type
File size
User permission
GET /files/:id

Get/download an authorized file.

DELETE /files/:id

Delete a file.

Authorization

Owner or authorized admin.

13. API Authentication

Protected APIs shall use authentication.

Example:

Authorization: Bearer JWT_TOKEN

The authentication middleware will:

Extract token.
Verify token.
Identify user.
Attach user information to request.
Continue to the next middleware/controller.
14. Pagination

List APIs shall support pagination.

Example:

GET /doctors?page=2&limit=10

Response:

{
  "success": true,
  "data": [],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
15. API Response Format
Success Response
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
Error Response
{
  "success": false,
  "message": "Something went wrong"
}
16. Security

APIs shall implement:

Authentication
Authorization
Input validation
Rate limiting
CORS
Secure HTTP headers
File validation
Error handling

Sensitive information must not be returned in API responses.


---

# 2. `docs/DATABASE.md`

```md
# Database Documentation

## Healthcare Management System

---

# 1. Database Overview

The Healthcare Management System uses MongoDB as the
primary database.

Mongoose is used as the ODM (Object Data Modeling) library.

Database:

MongoDB

ODM:

Mongoose

---

# 2. Database Collections

The system may contain the following collections:

- users
- patients
- doctors
- healthcare_workers
- appointments
- medical_records
- prescriptions
- notifications
- files

---

# 3. Users Collection

The users collection stores authentication and common
user information.

Example:

```json
{
  "_id": "ObjectId",
  "name": "Bhavesh",
  "email": "bhavesh@example.com",
  "password": "HASHED_PASSWORD",
  "role": "patient",
  "isActive": true,
  "createdAt": "Date",
  "updatedAt": "Date"
}

Possible roles:

patient
doctor
healthcare_worker
admin
4. Patients Collection

Stores patient-specific information.

Example:

{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "dateOfBirth": "Date",
  "gender": "male",
  "phone": "XXXXXXXXXX",
  "address": {},
  "createdAt": "Date",
  "updatedAt": "Date"
}

Relationship:

User
  |
  └── Patient
5. Doctors Collection

Stores doctor-specific information.

Example:

{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "specialization": "Cardiology",
  "licenseNumber": "LICENSE_ID",
  "experience": 5,
  "availability": [],
  "createdAt": "Date",
  "updatedAt": "Date"
}

Relationship:

User
  |
  └── Doctor
6. Healthcare Workers Collection

Stores healthcare worker information.

Example:

{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "department": "Emergency",
  "employeeId": "HCW001",
  "createdAt": "Date",
  "updatedAt": "Date"
}
7. Appointments Collection

Stores appointment information.

Example:

{
  "_id": "ObjectId",
  "patientId": "ObjectId",
  "doctorId": "ObjectId",
  "appointmentDate": "Date",
  "status": "pending",
  "reason": "Regular checkup",
  "createdAt": "Date",
  "updatedAt": "Date"
}

Possible statuses:

pending
confirmed
rejected
cancelled
completed

Relationships:

Patient
   |
   └── Appointment
           |
           └── Doctor
8. Medical Records Collection

Stores patient medical information.

Example:

{
  "_id": "ObjectId",
  "patientId": "ObjectId",
  "doctorId": "ObjectId",
  "diagnosis": "Example diagnosis",
  "symptoms": [],
  "treatment": "Example treatment",
  "notes": "Doctor notes",
  "createdAt": "Date",
  "updatedAt": "Date"
}
9. Prescriptions Collection

Stores prescriptions created by doctors.

Example:

{
  "_id": "ObjectId",
  "patientId": "ObjectId",
  "doctorId": "ObjectId",
  "medicines": [
    {
      "name": "Medicine",
      "dosage": "500mg",
      "frequency": "Twice a day",
      "duration": "5 days"
    }
  ],
  "instructions": "Take after food",
  "createdAt": "Date"
}
10. Notifications Collection

Stores user notifications.

Example:

{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "title": "Appointment Confirmed",
  "message": "Your appointment has been confirmed.",
  "type": "appointment",
  "isRead": false,
  "createdAt": "Date"
}
11. Files Collection

Stores metadata about uploaded files.

Example:

{
  "_id": "ObjectId",
  "ownerId": "ObjectId",
  "fileName": "medical-report.pdf",
  "fileType": "application/pdf",
  "fileSize": 102400,
  "storageUrl": "FILE_STORAGE_URL",
  "createdAt": "Date"
}

The actual file may be stored in external/cloud storage,
while MongoDB stores the file metadata.

12. Relationships

Main relationships:

User
 ├── Patient
 ├── Doctor
 └── Healthcare Worker

Patient
 ├── Appointments
 ├── Medical Records
 ├── Prescriptions
 └── Files

Doctor
 ├── Appointments
 ├── Medical Records
 └── Prescriptions

User
 └── Notifications
13. Indexes

Indexes shall be created for frequently searched fields.

Examples:

Users
email

Email should be unique.

Appointments

Possible compound index:

doctorId + appointmentDate
Medical Records
patientId + createdAt
Notifications
userId + isRead

Indexes should be added based on actual query patterns.

14. Data Validation

Mongoose schemas shall validate:

Required fields
Data types
Enum values
String length
Email format
Unique fields where required
15. Database Security

The database must:

Require authentication.
Use secure credentials.
Never expose database credentials in source code.
Use environment variables.
Restrict database network access.
Avoid storing plain-text passwords.
16. Database Transactions

Transactions shall be used when multiple database operations
must succeed or fail together.

Example:

Create appointment
       +
Create notification
       ↓
Transaction
       ↓
Both successful
       OR
Both rolled back

Transactions should be used only where required.

17. Database Scaling

Future scaling strategies may include:

Index optimization
Query optimization
Read replicas
Sharding
Database monitoring
Archiving old data

---

# 3. `docs/ARCHITECTURE.md`

```md
# System Architecture

## Healthcare Management System

---

# 1. Architecture Overview

The Healthcare Management System follows a modular
client-server architecture.

The system consists of:

- Frontend
- Backend API
- Database
- Cache
- File Storage
- Notification services

High-level architecture:

```text
                    Client
                      |
                      ↓
                React Frontend
                      |
                      ↓
                  REST API
                      |
              ┌───────┴───────┐
              ↓               ↓
          Middleware       Validation
              |
              ↓
          Controller
              |
              ↓
           Service
              |
        ┌─────┴─────┐
        ↓           ↓
     Mongoose     Redis
        |
        ↓
    MongoDB
2. Frontend

The frontend will be developed using React.js.

Responsibilities:

User interface
Form handling
Client-side validation
API communication
Authentication state
Role-based UI
Error display
Loading states

Flow:

User
 ↓
React UI
 ↓
API Request
 ↓
Backend
 ↓
API Response
 ↓
React UI
3. Backend

The backend will use:

Node.js
Express.js

The backend will provide REST APIs.

Responsibilities:

Authentication
Authorization
Business logic
Validation
Database operations
Error handling
Logging
File handling
Notifications
4. Backend Request Flow

Every request should follow a controlled flow.

Client
  ↓
HTTP Request
  ↓
Express
  ↓
Security Middleware
  ↓
Authentication Middleware
  ↓
Authorization Middleware
  ↓
Validation Middleware
  ↓
Route
  ↓
Controller
  ↓
Service
  ↓
Model / Repository
  ↓
MongoDB
  ↓
Service
  ↓
Controller
  ↓
Response
  ↓
Client
5. Middleware Layer

Middleware is responsible for cross-cutting operations.

Examples:

Authentication
Authorization
Validation
Logging
Rate limiting
CORS
Security headers

Example:

Request
   ↓
Logger
   ↓
Rate Limiter
   ↓
Authentication
   ↓
Authorization
   ↓
Validation
   ↓
Controller
6. Controller Layer

Controllers handle HTTP requests and responses.

Responsibilities:

Read request data
Call service layer
Return response
Pass errors to error middleware

Controllers should not contain large business logic.

Example:

Request
  ↓
Controller
  ↓
Service
  ↓
Response
7. Service Layer

The service layer contains business logic.

Example:

Appointment Controller
        ↓
Appointment Service
        ↓
Check Doctor Availability
        ↓
Create Appointment
        ↓
Create Notification

Services help keep controllers clean and maintainable.

8. Database Layer

Mongoose models will communicate with MongoDB.

Example:

Service
   ↓
Mongoose Model
   ↓
MongoDB

The database layer is responsible for:

CRUD operations
Queries
Aggregations
Indexes
Schema validation
9. Authentication Architecture

Authentication will use JWT.

Flow:

Login
  ↓
Validate Credentials
  ↓
Compare Password Hash
  ↓
Generate JWT
  ↓
Return Token
  ↓
Client

For protected requests:

Client
  ↓
Authorization: Bearer Token
  ↓
Auth Middleware
  ↓
Verify JWT
  ↓
Identify User
  ↓
Authorization
  ↓
Controller
10. Authorization Architecture

The system uses Role-Based Access Control (RBAC).

Example:

User
 |
 ├── Patient
 |
 ├── Doctor
 |
 ├── Healthcare Worker
 |
 └── Admin

Authorization middleware checks whether the user's role
has permission to access a resource.

11. Caching Architecture

Redis may be used as a caching layer.

Example:

Client
  ↓
API
  ↓
Service
  ↓
Redis
  |
  ├── Cache HIT → Return Data
  |
  └── Cache MISS
          ↓
       MongoDB
          ↓
       Redis Cache
          ↓
       Response

Caching should be used for frequently accessed data
where appropriate.

12. Error Handling Architecture

Errors will be handled centrally.

Flow:

Controller
    ↓
Error
    ↓
next(error)
    ↓
Central Error Middleware
    ↓
Format Error Response
    ↓
Client

The system should use custom application errors where
appropriate.

Example:

AppError
   ↓
Central Error Middleware
13. Logging Architecture

The system will maintain application logs.

Example:

Request
  ↓
Logger Middleware
  ↓
Application
  ↓
Error / Important Event
  ↓
Logger
  ↓
Log Storage / Console

Sensitive information must not be logged.

14. File Upload Architecture

File upload flow:

Client
  ↓
Multipart Request
  ↓
Upload Middleware
  ↓
File Validation
  ↓
Storage
  ↓
File Metadata
  ↓
MongoDB

MongoDB stores metadata while actual files may be stored
in cloud/external storage.

15. Notification Architecture

Notifications may be processed using an event-driven approach.

Example:

Appointment Created
        ↓
      Event
        ↓
 Notification Service
        ↓
     Notification

For larger-scale implementation, message queues or
publish/subscribe systems may be introduced.

16. Security Architecture

Security layers:

Client
  ↓
HTTPS
  ↓
CORS
  ↓
Security Headers
  ↓
Rate Limiting
  ↓
Authentication
  ↓
Authorization
  ↓
Validation
  ↓
Business Logic
  ↓
Database
17. Scalability

The architecture should support horizontal scaling.

Example:

                 Load Balancer
                      |
          ┌───────────┼───────────┐
          ↓           ↓           ↓
      Backend 1   Backend 2   Backend 3
          |           |           |
          └───────────┼───────────┘
                      ↓
                    Redis
                      ↓
                   MongoDB

Stateless backend design should be preferred so multiple
backend instances can handle requests.

18. Folder Architecture

Backend:

backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── uploads/
├── logs/
│
├── app.js
├── server.js
└── package.json

Frontend:

frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   └── assets/
│
└── package.json
19. Complete System Flow
                    USER
                      |
                      ↓
              React Frontend
                      |
                      ↓
                HTTPS Request
                      |
                      ↓
              Express Backend
                      |
                      ↓
                Middleware
                      |
          ┌───────────┼───────────┐
          ↓           ↓           ↓
       Auth       Validation    Rate Limit
          |           |           |
          └───────────┼───────────┘
                      ↓
                   Route
                      ↓
                 Controller
                      ↓
                   Service
                 /        \
                ↓          ↓
             Redis       MongoDB
                |          |
                └────┬─────┘
                     ↓
                  Response
                     ↓
               React Frontend
                     ↓
                    User
20. Architecture Goals

The architecture is designed to provide:

Security
Scalability
Reliability
Maintainability
Performance
Separation of concerns
Testability
Clear code organization

---

### आता `docs/` असा दिसेल

```text
docs/
│
├── SRS.md
├── API.md
├── DATABASE.md
└── ARCHITECTURE.md

आता important distinction लक्षात ठेव:

SRS
 ↓
System ने काय करायचं?

ARCHITECTURE
 ↓
System कसं build करायचं?

DATABASE
 ↓
Data कसा store आणि relate करायचा?

API
 ↓
Frontend आणि Backend कसे communicate करणार?