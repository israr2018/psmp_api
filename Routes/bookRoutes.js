var express=require('express');
var routes=function(Book)
 {
    var bookRouter=express.Router();
    bookRouter.route('/')
    .post(function (req,res) {
    
        var book=new Book(req.body);
        book.save();
        console.log(book);
       
         res.status(201).send(book);
        // res.send(book);
 
    })
    .get(function (req,res) {
        var query={};
        if(req.query.Price){
           query.Price=req.query.Price;
        }
       // res.send(resJson);
       Book.find(query,function (err,books) {
          if(!err)
           res.status(200).json(books);
           else console.log(err);
       });
    });

    bookRouter.use('/:bookId', function(req,res,next){
        Book.findById(req.params.bookId, function(err,book){
            if(err)
                res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next();
            }
            else
            {
                res.status(404).send('no book found');
            }
        });
    });
    bookRouter.route('/:bookId')
    .get(function(req,res){

        res.json(req.book);

    })
    .put(function(req,res){
        req.book.Title = req.body.Title;
        req.book.Author = req.body.Author;
        req.book.Price = req.body.Price;
        req.book.Genere = req.body.Genere;
        req.book.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
        });
    })
    .patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        for(var p in req.body)
        {
            req.book[p] = req.body[p];
        }

        req.book.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
        });
    })
    .delete(function(req,res){
        req.book.remove(function(err){

            if(err){

                res.status(500).send(err);
            }
            else{
                res.status(204).send('Removed');

            }

        })

    })
  
    
return bookRouter;
}




module.exports=routes;