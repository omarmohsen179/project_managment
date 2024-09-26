
# Full-Stack Technical Assessment: Project Management App

## Overview

This project is a full-stack web application for project management. The application consists of a ReactJS frontend and a .NET Core backend using Entity Framework. The backend manages Projects, Tasks, and User Roles with CRUD operations, while the frontend interacts with the backend via a REST API. The app includes role-based access control, with two user roles (Manager and Employee), authentication, and task management features.

---

## Project Structure 

### Backend
The backend provides a REST API with endpoints to manage projects, tasks, and user roles. Key entities include:

1. **Project Entity**:
   - Fields: `ProjectId`, `ProjectName`, `Description`, `StartDate`, `EndDate`, `Budget`, `Owner`, and `Status`.
   - Operations: CRUD operations for creating, updating, retrieving, and deleting projects.

2. **Task Entity**:
   - Fields: `TaskId`, `TaskName`, `Description`, `AssignedTo`, `StartDate`, `EndDate`, `Priority`, and `Status`.
   - Relationship: Tasks are associated with a project and can have statuses like "Not Started," "In Progress," or "Completed."
   - Operations: CRUD operations for managing tasks, including assigning them to users.

3. **User Roles**:
   - Two roles: `Manager` and `Employee`.
   - Managers can create projects and tasks, while employees can update tasks assigned to them.

4. **Additional Features**:
   - **Project Deadlines**: An endpoint to return overdue tasks (tasks whose `EndDate` is past, but are not completed).
   - **Authentication**: JWT-based authentication to secure the API with role-based access control.
   
5. **Optional Features**:
   - Task comments and dependencies.
   - Pagination for project and task listings.

### Frontend
The frontend is built with ReactJS, and provides an interface for managing projects and tasks:

1. **Project and Task Management**:
   - Create, update, and delete projects.
   - View tasks associated with projects and perform CRUD operations on tasks.
   - Role-based UI: Managers can access all operations, while employees can only manage their assigned tasks.

2. **Authentication**:
   - A login page with JWT-based authentication to restrict access to the application.

3. **UI Design**:
   - Minimalistic design with user-friendly interfaces for listing projects and tasks.
   - Visual indicators for overdue tasks (e.g., red highlight or a warning icon).

4. **Optional Features**:
   - Filters for task status.
   - Dashboard with project statistics (e.g., total tasks, overdue tasks, and project progress).

---

## Setup Instructions

### Backend (.NET Core with Entity Framework)
1. **Requirements**:
   - .NET Core SDK
   - Entity Framework Core
   - PostgreSQL or another database of choice

2. **Steps to Run**:
   - Clone the repository.
   - Navigate to the backend folder.
   - Configure the `appsettings.json` for database connection and JWT secret.
   - Run the following command to apply migrations and start the server:
     ```bash
     dotnet ef database update
     dotnet run
     ```
   - API will be accessible at `http://localhost:5000/api`.

3. **Testing**:
   - Unit tests can be run with the following command:
     ```bash
     dotnet test
     ```

### Frontend
1. **Requirements**:
   - Node.js (v14 or higher)
   - npm or yarn

2. **Steps to Run**:
   - Navigate to the frontend folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Configure the `.env` file for the API base URL.
   - Start the frontend:
     ```bash
     npm start
     ```
   - The frontend will be accessible at `http://localhost:3000`.

---

## Design Choices

- **.NET Core with Entity Framework** was chosen for its robust support for REST API development, scalability, and integration with databases.
- **ReactJS** offers a flexible and efficient way to build interactive UIs, making it suitable for managing complex forms and project/task views.
- **JWT-based Authentication** ensures secure role-based access control, preventing unauthorized access to critical features.
- **Role-based Access Control** provides flexibility in user permissions, ensuring employees can only access their assigned tasks, while managers have full control over project and task management.

---

## Testing

- Backend tests cover key CRUD operations for Projects and Tasks, role-based access control, and task deadline checks.
- Frontend testing includes basic validation for form inputs and proper role-based rendering of UI elements.

---

## Conclusion

This project demonstrates the implementation of a simple yet efficient project management application using a full-stack approach with ReactJS and .NET Core Entity Framework. The application provides role-based access control, authentication, and intuitive UI for managing projects and tasks.
