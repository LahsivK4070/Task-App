
# MERN Task Web App

Simple page application where people can signup and login and create their
tasks.


## Clone or Download

```
$ git clone https://github.com/LahsivK4070/MERN-Task-App.git
$ yarn # or npm i
```
    
## Run Locally

### Prerequisites 

- MongoDB
- Node
- npm

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

### Client-side usage(PORT: 3000)

```
$ cd task-front-end          // go to task-front-end folder
$ yarn # or npm i    // npm install packages
$ npm start        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

### Server-side usage(PORT: 5000)

### Prepare your secret

run the script at the first level:

(You need to add a MONGO_URL and JWT_SECRET in .env to connect to MongoDB)

- create a .env file in task-back-end
- write your MONGO_URL = YOUR_MONGO_URL and TOKKEN_SECRET = YOUR_TOKKEN_SECRET

### Start

```
$ cd task-back-end  // go to task-back-end folder
$ npm i       // npm install packages
$ node index.js // run it locally
```
## Screenshots

User visit the login page if they are not already logged in

![Login Screenshot](https://i.postimg.cc/rpwHXtRM/Screenshot-Login.png)

If we have a new user then they can sign up by clicking on the signup button

![Signup Screenshot](https://i.postimg.cc/W4YH2b0r/Screenshot-signup.png)

User enter their credentils on login page and if they enter wrong credentials they see an error message

![Wrong Login Screenshot](https://i.postimg.cc/3RPfvSSx/Screenshot-wrong-login.png)

On entering correct credentials user see the home page

![Home Screenshot](https://i.postimg.cc/Nj4nzxMd/Screenshot-home.png)

User can add new tasks by writing the task in given form and on clicking task gets added and is shown on YOUR TASKS Section

![Add Task](https://i.postimg.cc/3rsz4RVF/Screenshot-add-task.png)

To edit a task click on edit button and make your changes

![Edit task](https://i.postimg.cc/50Hkjdmr/Screenshot-edit-task.png)

The taks gets update and to delete a task click on trash(delete) button

![delete task](https://i.postimg.cc/CLbXj0VT/Screenshot-after-edit.png)

The task gets deleted and to log out a user click on logout button and you will see the login page

![log-out](https://i.postimg.cc/cLZjhzsK/Screenshot-delete.png)
