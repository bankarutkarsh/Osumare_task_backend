# Task Manager API

This project is a simple Task Manager API built with Node.js and Express. It allows you to create, read, update, and delete tasks.

## Prerequisites

- Node.js installed
- Dependencies listed in `package.json`

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Folder Structure

```lua
BACKEND/
|-- Controllers/
|   |-- tasks.js
|-- Database/
|   |-- db.json
|-- Routes/
|   |-- routes.js
|-- node_modules/
|-- index.js
|-- package-lock.json
|-- package.json
```

## API Endpoints

### 1. Get All Tasks

- **URL**: `/tasks`
- **Method**: GET
- **Description**: Retrieve all tasks.
- **Sample Request**:

    ```bash
    curl -X GET http://localhost:5500/tasks
    ```

- **Sample Response**:

    ```json
    {
      "message": "Tasks fetched successfully",
      "task": [
        {
          "id": 1,
          "title": "Buy groceries",
          "description": "Purchase milk, eggs, bread, and vegetables."
        },
        {
          "id": 2,
          "title": "Read a book",
          "description": "Finish reading 'To Kill a Mockingbird'."
        }
      ]
    }
    ```

### 2. Get Task by ID

- **URL**: `/task/:askedId`
- **Method**: GET
- **Description**: Retrieve a task by its ID.
- **Sample Request**:

    ```bash
    curl -X GET http://localhost:5500/task/1
    ```

- **Sample Response**:

    ```json
    {
      "message": "Task fetched successfully",
      "task": {
        "id": 1,
        "title": "Buy groceries",
        "description": "Purchase milk, eggs, bread, and vegetables."
      }
    }
    ```

### 3. Add a New Task

- **URL**: `/tasks`
- **Method**: POST
- **Description**: Add a new task.
- **Request Body**:

    ```json
    {
      "title": "New Task",
      "description": "Description of the new task."
    }
    ```

- **Sample Request**:

    ```bash
    curl -X POST http://localhost:5500/tasks -H "Content-Type: application/json" -d '{"title": "New Task", "description": "Description of the new task."}'
    ```

- **Sample Response**:

    ```json
    {
      "message": "Task added successfully",
      "addedTask": {
        "id": 12,
        "title": "New Task",
        "description": "Description of the new task."
      }
    }
    ```

### 4. Edit an Existing Task

- **URL**: `/task/edit/:askedId`
- **Method**: PUT
- **Description**: Edit an existing task.
- **Request Body**:

    ```json
    {
      "title": "Updated Task",
      "description": "Updated description of the task."
    }
    ```

- **Sample Request**:

    ```bash
    curl -X PUT http://localhost:5500/task/edit/1 -H "Content-Type: application/json" -d '{"title": "Updated Task", "description": "Updated description of the task."}'
    ```

- **Sample Response**:

    ```json
    {
      "message": "Task edited successfully",
      "newTask": {
        "id": 1,
        "title": "Updated Task",
        "description": "Updated description of the task."
      }
    }
    ```

### 5. Delete a Task

- **URL**: `/task/delete/:askedId`
- **Method**: DELETE
- **Description**: Delete a task by its ID.
- **Sample Request**:

    ```bash
    curl -X DELETE http://localhost:5500/task/delete/1
    ```

- **Sample Response**:

    ```json
    {
      "message": "Task deleted successfully",
      "deletedTask": {
        "id": 1,
        "title": "Buy groceries",
        "description": "Purchase milk, eggs, bread, and vegetables."
      }
    }
    ```

## Error Handling

- **400 Bad Request**: Validation errors (e.g., missing or invalid fields).

    ```json
    {
      "message": "Validation errors: Title is required, Description is required"
    }
    ```

- **404 Not Found**: Resource not found (e.g., task with the given ID does not exist).

    ```json
    {
      "message": "Task with id 999 not found."
    }
    ```

- **500 Internal Server Error**: General server error.

    ```json
    {
      "error": "Internal server error"
    }
    ```

## Code Details

### `index.js`

This is the entry point of the application where you set up the Express server and middleware.

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./Routes/routes.js');

const app = express();
app.use(bodyParser.json());

app.use('/', routes);

const PORT = 5500;
const hostname = 'localhost';

app.listen(PORT, hostname, () => {
    console.log(`Server is running at http://${hostname}:${PORT}`);
});
```

### `db.json`

This file contains the sample data for the tasks.

```json
{
  "task": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Purchase milk, eggs, bread, and vegetables."
    },
    {
      "id": 2,
      "title": "Read a book",
      "description": "Finish reading 'To Kill a Mockingbird'."
    },
    {
      "id": 3,
      "title": "Complete assignment",
      "description": "Work on the math assignment due next week."
    },
    {
      "id": 4,
      "title": "Exercise",
      "description": "Go for a 30-minute run in the park."
    },
    {
      "id": 5,
      "title": "Call mom",
      "description": "Check in with mom and see how she's doing."
    },
    {
      "id": 6,
      "title": "Clean the house",
      "description": "Vacuum, dust, and mop the floors."
    },
    {
      "id": 7,
      "title": "Pay bills",
      "description": "Pay the electricity and internet bills online."
    },
    {
      "id": 8,
      "title": "Plan vacation",
      "description": "Research destinations and book flights for the summer vacation."
    },
    {
      "id": 9,
      "title": "Attend meeting",
      "description": "Join the team meeting at 10 AM via Zoom."
    },
    {
      "id": 10,
      "title": "Cook dinner",
      "description": "Prepare a healthy dinner with grilled chicken and salad."
    },
    {
      "id": 11,
      "title": "Workout",
      "description": "Complete your daily scheduled workout"
    }
  ]
}
```