# GyanSetu

> A digital education platform designed to simplify academic management for teachers and students, with a focus on accessibility, assignment management, attendance, and academic tracking.

## Overview

GyanSetu is a full-stack education management platform that connects students and teachers through a centralized system.

The platform allows teachers to create and manage assignments, review student submissions, grade work, and mark attendance. Students can access assignments, submit answers, and view their attendance and academic status.

The project was designed with the goal of providing a simple, scalable foundation for educational institutions, especially environments where reliable digital infrastructure may be limited.

---

## Problem Statement

Traditional academic workflows often rely on a combination of paper records, messaging applications, and disconnected systems for:

- Assignment distribution
- Assignment submission
- Student evaluation
- Attendance management
- Academic record tracking

This can make it difficult for teachers to manage student data and for students to keep track of their academic responsibilities.

GyanSetu brings these workflows together into a single platform.

---

## Key Features

### Authentication and Authorization

- Student and teacher login
- Secure password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- Protected API routes
- Separate permissions for students and teachers

### Teacher Dashboard

Teachers can:

- Create assignments
- View assignments
- View student submissions
- Grade submissions
- View student information
- Mark students as Present or Absent
- View attendance records

### Student Dashboard

Students can:

- View available assignments
- Read assignment descriptions
- View due dates
- Submit assignment answers
- Track submission status
- View grades
- View attendance records

### Assignment Management

Each assignment contains:

- Title
- Description
- Subject
- Class
- Due date
- Teacher reference

Teachers can create, update, view, and delete assignments through protected APIs.

### Submission Management

Students can submit answers for assignments.

Teachers can:

- View submissions
- View student details
- View assignment details
- Grade submissions
- Update submission status

Submission states include:

- `Submitted`
- `Graded`

### Attendance Management

Teachers can mark students as:

- Present
- Absent

Attendance records contain:

- Student
- Class
- Date
- Status
- Teacher who marked the attendance

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Axios
- React Router

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcryptjs

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Development Tools

- Git
- GitHub
- Postman
- VS Code

---

## System Architecture

```text
                    GyanSetu
                       |
        +--------------+--------------+
        |                             |
     Frontend                      Backend
        |                             |
   React + Vite                 Node.js + Express
        |                             |
     Axios                         REST APIs
        |                             |
        +-------------+---------------+
                      |
                  MongoDB Atlas
                      |
       +--------------+--------------+
       |              |              |
    Students      Teachers      Assignments
                                     |
                              Submissions
                                     |
                                Attendance
