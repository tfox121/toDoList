## To Do List

I decided to build my first app from the ground up using Node/Express along with MongoDB Atlas for the database. I also took the opportunity to learn Nunjucks and implement it in the project. 

Simply type in To-Dos at the bottom and hit enter or click the up arrow to add them to the list. Once complete, click on the tick icon to remove it from the list. To edit, just click the box to edit inline and then hit enter or click the right arrow to confirm the changes.

If you wish to clone it to tinker with yourself, you will need create a .env file in the root folder with the following variables:
```
NODE_ENV="build"
MONGO_URI="mongodb+srv://UUUUU:PPPPP@cluster0-1gbjj.mongodb.net/ToDoList?retryWrites=true&w=majority"
PORT=3000
```

The "UUUUU" and "PPPPP" in the MONGO_URI should be changed to your username and password for your own Mongo Atlas account. You will need to create a database with the name "ToDoList" on MongoDB Atlas.

Try it out [here](https://todo-list-tf.glitch.me/)!
