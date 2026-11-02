# Software Requirements Specification (SRS)

## Healthcare Management System

---

# 1. Introduction

## 1.1 Purpose

The purpose of this Healthcare Management System is to provide
a centralized platform for managing healthcare-related
activities such as patient management, doctor management,
appointments, medical records, prescriptions, and
notifications.

The system will provide different features and permissions
based on the user's role.

---

## 1.2 Scope

The Healthcare Management System will allow:

- Patients to manage their profiles and appointments.
- Doctors to manage appointments and patient medical information.
- Healthcare workers to manage assigned healthcare operations.
- Administrators to manage users and monitor the system.
- Secure storage and access of medical records.
- Prescription management.
- File/document uploads.
- Notifications.
- Authentication and role-based authorization.

---

# 2. System Overview

The system will be a web-based full-stack application.

## Technology Stack

### Frontend

- React.js
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Additional Technologies

- JWT Authentication
- Redis
- File Storage
- Logging
- REST API

---

# 3. User Roles

The system will contain the following roles:

## 3.1 Patient

A patient can:

- Register/Login
- Manage profile
- Search doctors
- Book appointments
- View appointments
- Cancel appointments
- View medical records
- View prescriptions
- Upload required documents
- Receive notifications

---

## 3.2 Doctor

A doctor can:

- Login
- Manage profile
- View appointments
- Accept/Reject appointments
- View patient information
- Create medical records
- Create prescriptions
- Upload medical documents
- View previous medical history
- Receive notifications

---

## 3.3 Healthcare Worker

A healthcare worker can:

- Login
- Manage assigned tasks
- View permitted patient information
- Manage appointments
- Update healthcare-related information
- Upload required documents
- Receive notifications

Access will be restricted according to the permissions
assigned to the healthcare worker.

---

## 3.4 Admin

An admin can:

- Login
- Manage users
- Manage patients
- Manage doctors
- Manage healthcare workers
- Activate/Deactivate users
- Manage system data
- Monitor system activity
- View system logs
- Manage roles and permissions

---

# 4. Functional Requirements

## 4.1 Authentication

The system shall provide:

- User registration
- User login
- User logout
- Password hashing
- JWT-based authentication
- Token validation
- Role-based authorization
- Password reset
- Account activation/deactivation

---

# 4.2 User Management

The system shall allow users to:

- Create an account
- Login securely
- View profile
- Update profile
- Change password
- Upload profile picture
- Manage personal information

---

# 4.3 Patient Management

The system shall allow authorized users to:

- Create patient records
- View patient information
- Update patient information
- View medical history
- View medical records
- Manage patient documents

Sensitive patient information must only be accessible
to authorized users.

---

# 4.4 Doctor Management

The system shall allow:

- Doctor registration/creation
- Doctor profile management
- Doctor availability management
- Doctor specialization management
- Viewing doctor information
- Managing doctor status

---

# 4.5 Appointment Management

The system shall allow patients to:

- Search doctors
- View doctor availability
- Book appointments
- View appointments
- Cancel appointments

Doctors shall be able to:

- View appointments
- Accept appointments
- Reject appointments
- Complete appointments
- Update appointment status

Appointment statuses may include:

- Pending
- Confirmed
- Rejected
- Cancelled
- Completed

---

# 4.6 Medical Records

Authorized doctors shall be able to:

- Create medical records
- Update medical records
- View patient medical history
- Add diagnosis
- Add treatment information
- Add notes

Patients shall be able to view their permitted medical records.

---

# 4.7 Prescription Management

Doctors shall be able to:

- Create prescriptions
- Update prescriptions
- View prescriptions
- Add medicines
- Add dosage
- Add frequency
- Add duration
- Add instructions

Patients shall be able to view their prescriptions.

---

# 4.8 File Management

The system shall support:

- Medical document uploads
- Prescription document uploads
- Profile image uploads
- Document retrieval
- Document deletion where permitted

Uploaded files shall be validated for:

- File type
- File size
- Authorization

---

# 4.9 Notification System

The system shall provide notifications for events such as:

- Appointment booking
- Appointment confirmation
- Appointment rejection
- Appointment cancellation
- Appointment reminders
- New prescription
- Important system notifications

---

# 4.10 Search

The system shall support searching for:

- Doctors
- Patients (authorized users only)
- Medical records
- Appointments

Search functionality shall support appropriate filtering
and pagination.

---

# 4.11 Pagination

Large datasets shall use pagination to improve performance.

Pagination may be implemented for:

- Patients
- Doctors
- Appointments
- Medical records
- Prescriptions
- Notifications

---

# 5. Authorization Requirements

The system shall implement Role-Based Access Control (RBAC).

Example:

Patient
  ↓
Can access own information

Doctor
  ↓
Can access assigned/authorized patient information

Healthcare Worker
  ↓
Can access permitted healthcare information

Admin
  ↓
Can manage system-level resources

Users must not be able to access resources for which
they do not have permission.

---

# 6. Non-Functional Requirements

## 6.1 Security

The system shall provide:

- Password hashing
- JWT authentication
- Role-based authorization
- Input validation
- Secure HTTP headers
- CORS configuration
- Rate limiting
- Protection against unauthorized access
- Secure environment variables
- File validation

---

## 6.2 Performance

The system should:

- Respond to API requests efficiently.
- Use database indexes where required.
- Use pagination for large datasets.
- Use caching where appropriate.
- Avoid unnecessary database queries.

Redis may be used for caching and other performance-related
operations.

---

## 6.3 Scalability

The backend should be designed so that it can scale when
the number of:

- Users
- Appointments
- Medical records
- API requests

increases.

The architecture should support future horizontal scaling.

---

## 6.4 Reliability

The system should:

- Handle errors gracefully.
- Prevent application crashes caused by expected errors.
- Provide centralized error handling.
- Maintain reliable database operations.
- Log important system events.

---

## 6.5 Maintainability

The codebase should follow:

- Modular architecture
- Separation of concerns
- Clean folder structure
- Reusable components
- Centralized error handling
- Consistent coding standards
- Meaningful naming conventions

---

# 7. Error Handling

The backend shall implement centralized error handling.

The system should handle:

- Validation errors
- Authentication errors
- Authorization errors
- Database errors
- Resource not found errors
- Duplicate data errors
- Server errors

The API should return a consistent error response format.

Example:

{
  "success": false,
  "message": "Resource not found"
}

---

# 8. Logging

The backend shall maintain logs for important events.

Logs may include:

- HTTP requests
- Errors
- Authentication events
- Important system operations
- Database-related errors

Sensitive information such as passwords and authentication
secrets must not be logged.

---

# 9. Database Requirements

The system shall use MongoDB as the primary database.

Possible collections include:

- Users
- Patients
- Doctors
- HealthcareWorkers
- Appointments
- MedicalRecords
- Prescriptions
- Notifications
- Files

Mongoose will be used as the Object Data Modeling (ODM)
library.

Database indexes shall be created for frequently searched
fields where required.

---

# 10. API Requirements

The backend shall expose RESTful APIs.

Example API groups:

/api/auth
/api/users
/api/patients
/api/doctors
/api/appointments
/api/medical-records
/api/prescriptions
/api/notifications
/api/files

APIs shall use appropriate HTTP methods:

- GET
- POST
- PUT/PATCH
- DELETE

APIs shall return appropriate HTTP status codes.

---

# 11. API Response Format

The API should follow a consistent response structure.

### Success

{
  "success": true,
  "message": "Operation successful",
  "data": {}
}

### Error

{
  "success": false,
  "message": "Something went wrong"
}

---

# 12. Security Requirements

The system shall:

- Never store plain-text passwords.
- Validate user input.
- Protect authenticated routes.
- Verify user permissions.
- Protect sensitive healthcare information.
- Use environment variables for secrets.
- Apply rate limiting.
- Validate uploaded files.
- Prevent unauthorized resource access.

---

# 13. Deployment Requirements

The application shall be deployable as:

Frontend
  ↓
Web hosting platform

Backend
  ↓
Cloud server

Database
  ↓
Cloud MongoDB

Environment-specific configuration shall be managed
using environment variables.

Example:

NODE_ENV
PORT
MONGO_URI
JWT_SECRET
REDIS_URL

Secrets must not be committed to Git.

---

# 14. Testing Requirements

The system should include:

## Unit Testing

Testing individual functions and modules.

## Integration Testing

Testing interaction between:

- Controllers
- Services
- Database
- APIs

## API Testing

Testing REST API endpoints including:

- Success cases
- Validation failures
- Authentication failures
- Authorization failures
- Error cases

---

# 15. System Constraints

The system shall require:

- Internet connection
- Supported modern web browser
- Backend server
- MongoDB database

Users must have appropriate permissions to access
protected resources.

---

# 16. Future Enhancements

Possible future features include:

- Online consultation
- Video calling
- Payment integration
- Email notifications
- SMS notifications
- AI-assisted healthcare features
- Advanced analytics
- Mobile application
- Appointment reminders
- Advanced reporting

---

# 17. Conclusion

The Healthcare Management System will provide a secure,
scalable, and maintainable platform for managing healthcare
operations.

The system will use role-based access control, REST APIs,
MongoDB, authentication, authorization, logging, validation,
and centralized error handling to provide a production-oriented
architecture.