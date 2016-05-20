# A basic example of Restful API with Node + Express + MongoDB

   ## Requirements:-
   
    MongoDb needs to be running in order to execute the program



   ## Steps for Author:-

    `http://localhost:8080/booktownapi/` - This is the home... however nothing is defined here

    `http://localhost:8080/booktownapi/authors` - GET -  displays all the authos in JSON

    `http://localhost:8080/booktownapi/authors` - POST - adds a new author  but following should be there
        in body give the following parameters
	```
        id         : <give the id>
        first_name : <give the first name>
        last_name  : <give the last name>
	```
	
   `http://localhost:8080/booktownapi/authors/:id` - PUT - modifies the given id with the given data
        in the body give either of the following

		```
        first_name : <give the first name>
        last_name  : <give the last name>
		```
		

    `http://localhost:8080/booktownapi/authors/:id` - DELETE - deletes the id if exists.

    ### Steps for Books:-

      1) `http://localhost:8080/booktownapi/books/` <title> - GET - Gives a substring of the data if it is there

      3) `http://localhost:8080/booktownapi/books` - POST - adds a new book  but following should be there
           in body give the following parameters
```
           isbn         : <give the isbn>
           publisher : <give the first publisher>
           title : <give the last title>
           year : <give the last year>
```
       `http://localhost:8080/booktownapi/books/:isbn` - PUT - modifies the given isbn with the given data
           in the body give either of the following
```
           publisher : <give the first publisher>
           title : <give the last title>
           year : <give the last year>
```
       `http://localhost:8080/booktownapi/authors/:isbn` - DELETE - deletes the isbn if exists.

