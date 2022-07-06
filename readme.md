## This is a sample API that interacts with db.json and React Front End.

You are able to create,read,update, and delete items.

# View API Contents

- Open Postman
- Do a get request to http://localhost:8080/api/
- You should get an initial response like the example below.

`[{"id":1,"title":"React Game!","description":"Tic tac toe game created using Create React app.","URL":"http://heroku/myapp/game/"}, {"id":2,"title":"Online store","description":"Online store created with HTML, CSS and JavaScript.","URL":"https://git.com/myrepos/shop/index"}] `

# Create a post

- Open Postman
- Do a post request to http://localhost:8080/api/additem
- You will see another item added to db.json with a unique id.

# Update an Item

- Open Postman
- Do a put request to http://localhost:8080/api/update/:id
- Replace the **:id** with the specific id of the item you want to edit.

# Delete an Item

- Open Postman
- Do a put request to http://localhost:8080/api/delete/:id
- Replace the **:id** with the specific id of the item you want to delete.
