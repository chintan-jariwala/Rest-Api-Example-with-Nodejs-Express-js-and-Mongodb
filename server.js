var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;

mongoose.connect('mongodb://localhost/booktown');

var bookSchema = new Schema({
    isbn: { type: String, required: true, unique: true },
    publisher: { type: String, required: true},
    title: { type: String, required: true },
    year: String
});

var authSchema = new Schema({
    id : { type: String, required: true, unique: true },
    first_name : { type: String , required: true},
    last_name : { type: String , required: true }
});

var bookauthor = new Schema({
    isbn : { type: String, required: true},
    author_id : { type: String , required: true}
});



var book = mongoose.model('book', bookSchema);

var author = mongoose.model('author', authSchema);
module.exports =author;


var bookauthor = mongoose.model('bookauthor', bookauthor);
module.exports =bookauthor;

// make this available to our users in our Node applications
module.exports =book;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/',function (req,res) {
    res.json({message:'The api works now'});
});

router.route('/books/:title')
    .get(function (req,res) {
        book.find( { "title": { "$regex": req.params.title, "$options": "i" } }, function(err,docs) {
            if(err){
                res.status(500);
                res.send(err)
            }

            res.json(docs)} );
    });

router.route('/books').post(function (req,res) {

    var mybook = new book({
       isbn: req.body.isbn,
        publisher:req.body.publisher,
        title: req.body.title,
        year:req.body.year
    });

   /* var bookauthor = new bookauthor({
        isbn: req.body.isbn,
        author_id:req.body.publisher
    });*/

    mybook.save(function (err) {
        if(err) {
            console.log(err);
            res.status(500);
            res.json({message: "error while created!"});
        }
        else {
            res.status(201);
            res.json({message: "posted successfully"});
        }
    });
        /*bookauthor.save(function (err) {
            if(err){
                console.log(err);
                res.status(500);
                res.json({message:"error while created!"})
            }
            res.status(201);
            res.json({message:"posted successfully created!"});
        });*/

    /*bookauthor.save(function (err) {
        if(err){
            console.log(err);
            res.status(500);
            res.json({message:"error while created!"})
        }
        res.status(201);
        res.json({message:"bookauthor created!"})
    });*/


});

router.route('/books/:id').put(function (req,res) {

    //var publisher = req.query.publisher;
    if(req.body.publisher) {
        console.log("publisher::" + req.body.publisher);
        var query = {'publisher': req.body.publisher};
        console.log("param::"+req.params.id);
        book.findOne({'isbn':req.params.id}, function (err, selectedbook) {

            if (err)
                res.send(err);

            selectedbook.publisher = req.body.publisher;  // update the bears info

            // save the bear
            selectedbook.save(function (err) {
                if (err)
                {
                    res.status(304);
                    res.send(err);
                }

                res.status(201);
                res.json({message: 'books updated!'});
            });

        });
    }
    else if(req.body.title)
    {
        console.log("title::" + req.body.title);
        var query = {'title': req.body.title};
        console.log("param::"+req.params.id);
        book.findOne({'isbn':req.params.id}, function (err, selectedbook) {

            if (err)
                res.send(err);

            selectedbook.title = req.body.title;  // update the bears info

            // save the bear
            selectedbook.save(function (err) {
                if (err)
                    res.send(err);
                res.status(201);
                res.json({message: 'books title updated!'});
            });

        });
    }
    else if(req.body.year)
    {
        console.log("title::" + req.body.year);
        var query = {'title': req.body.year};
        console.log("param::"+req.params.id);
        book.findOne({'isbn':req.params.id}, function (err, selectedbook) {

            if (err)
                res.send(err);

            selectedbook.year = req.body.year;  // update the bears info

            // save the bear
            selectedbook.save(function (err) {
                if (err)
                    res.send(err);
                res.status(201);
                res.json({message: 'books year updated!'});
            });

        });
    }

    /*var mybook = new book({
        isbn: req.body.isbn,
        publisher:req.body.publisher,
        title: req.body.title,
        year:req.body.year
    });

    mybook.save(function (err) {
        if(err){
            console.log(err);
            res.status(500);
            res.json({message:"error while created!"})
        }
        res.status(201);
        res.json({message:"book created!"})
    })*/
});
router.route('/books/:bookisbn')

    .get(function (req,res) {
    book.findOne({'isbn': req.params.bookisbn}, function (err, book) {
        if (err) {
            res.status(400);
            res.send(err);
        }
        res.status(200);
        res.json(book);
    });
})

.delete(function (req,res) {
    book.remove({'isbn': req.params.bookisbn}, function (err) {
        if (err) {
            res.status(400);
            res.send(err);
        }
        res.status(200);
        res.json({"message": "book deleteed successfuly"});
    });
});

router.route('/authors')

    .post(function (req,res) {

        var myAuthor = new author({
            id:req.body.id,
            first_name:req.body.first_name,
            last_name:req.body.last_name
        });

        myAuthor.save(function (err) {
            if(err){
                res.status(400);
                res.send(err);
            }
            res.status(201);
            res.json({message:"Author created!"})
        })
    })


    .get(function (req,res) {

        author.find(function (err,authors) {
            if(err){
                res.status(400);
                res.send(err);
            }
            res.status(200);
            res.json(authors)
        })
    });

router.route('/authors/:authorid')

    .get(function(req,res){
        author.findOne({'id':req.params.authorid},function(err,author){
            if (err){
                res.status(400);
                res.send(err);
            }

            res.status(200);
            res.json(author);
        });


    })

    .put(function(req,res){
        author.findOne({'id':req.params.authorid},function(err,author){
            if (err){
                res.status(304);
                res.send(err);
            }

            if(req.body.first_name != null){
                author.first_name = req.body.first_name;

            }else if(req.body.last_name != null){
                author.last_name = req.body.last_name;
            }
            author.save(function(err){
                if (err)
                    res.send(err);

                res.json({ message: 'Author updated!' });
            });

        });
    })

    .delete(function(req,res){
        author.remove({'id':req.params.authorid},function(err,author){
            if (err)
                res.send(err);

            res.json({ message: 'Author Successfully deleted' });
        });
    });

app.get('*', function(req, res){
    res.send('Page is not there', 404);
});

app.use('/booktownapi', router);

app.listen(port);
console.log('The server started on  ' + port);