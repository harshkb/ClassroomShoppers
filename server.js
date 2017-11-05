var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');


/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
    mysql = require('mysql');

app.use(
    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : '13100144',
        database : 'newDatabase',
        multipleStatements: true,
        debug    : false //set true if you wanna see debug logger
    },'request')
);

// ------------------------------------------------------------
// static pages

app.get('/404',function(req,res){
    res.render('404');
});

app.get('/faq',function(req,res){
    res.render('faq');
});

app.get('/about',function(req,res){
    res.render('about');
});

app.get('/sitemap',function(req,res){
    res.render('sitemap');
});





app.get('/checkout',function(req,res){
    res.render('checkout');
});

app.get('/contact',function(req,res){
    res.render('contact');
});




app.get('/footer',function(req,res){
    res.render('footer');
});

app.get('/header',function(req,res){
    res.render('header');
});



app.get('/listing',function(req,res){
    res.render('listing');
});

app.get('/listing-empty-category',function(req,res){
    res.render('listing-empty-category');
});



app.get('/product-layout4',function(req,res){
    res.render('product-layout4');
});

app.get('/search',function(req,res){
    res.render('search');
});

app.get('/shopping-cart-empty',function(req,res){
    res.render('shopping-cart-empty');
});



app.get('/wishlist',function(req,res){
    res.render('wishlist');
});

app.get('/process-contact',function(req,res){
    res.render('process-contact');
});

app.get('/process-subscribe',function(req,res){
    res.render('process-subscribe');
});

// ------------------------------------------------------------

//RESTful route
var router = express.Router();

/*------------------------------------------------------
*  This is router middleware,invoked everytime we hit url
*  we can use this for doing validation,authetication
--------------------------------------------------------*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});


// ---------------------------------------------------------------------------------------------------------------

var home = router.route('/');

/*------------------------------------------------------
route.all is extremely useful. you can use it to do
stuffs for specific routes. for example you need to do
a validation everytime route /api/user/:user_id it hit.

remove curut2.all() if you dont want it
------------------------------------------------------*/

home.all(function(req,res,next){
    console.log("You need to smth about home Route ? Do it here");
    console.log(req.params);
    next();
});

//get data to update
home.get(function(req,res,next){


    // var user_id = req.params.user_id;
     // res.render('header',);

     req.getConnection(function(err,conn){
     	

        var query = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;",function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
           
            console.log(rows[0],rows[1]);
            res.render('index',{title:"subcategory name",categ:rows[0],subcateg:rows[1],cart:null,cart_total:null,user_id:null});
          	//   res.render('index',{title:"subcategory name",categ:rows[0],subcateg:rows[1]});

          });

    });
});
//-----------------------------------------------------------------------------------------------------------------------


//----------------------------------------------------------------------------------------------------------------------

 var test = router.route('/temp/connect/:user_id');

// /*------------------------------------------------------
// route.all is extremely useful. you can use it to do
// stuffs for specific routes. for example you need to do
// a validation everytime route /api/user/:user_id it hit.

// remove curut2.all() if you dont want it
// ------------------------------------------------------*/

test.all(function(req,res,next){
    console.log("You need to smth about home Route ? Do it here");
    console.log(req.params);
    next();
});

// //get data to update
test.get(function(req,res,next){

     var user_id = req.params.user_id;
     // res.render('header',);

     req.getConnection(function(err,conn){

        var query = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ? ",[user_id,user_id],function(err,rows){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
           
            console.log(rows[0],rows[1],rows[2],rows[3]);
            res.render('index',{title:"subcategory name",categ:rows[0],subcateg:rows[1],user_id:user_id,cart:rows[2],cart_total:rows[3]});

          });

    });
});

          
//--------------------------------------------------------------------------------------------------------



var vorder = router.route('/account-order/user/:user_id');



//get data to update
vorder.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    

    req.getConnection(
      function(err,conn)
      {

        if (err) return next("Cannot Connect");

        var order = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT order_no, timeStamp, status, newPrice FROM Orders natural join Product WHERE Orders.email_id = ?; SELECT firstName, second_name, email_id, contactNo FROM USER WHERE email_id = ?;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ? ",[user_id,user_id,user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('account-order',{title:"order details",order:rows[2],user:rows[3],categ:rows[0],subcateg:rows[1],user_id:user_id,cart_total:rows[4],cart:rows[5]});
            
            
        });
        
      });
      
  });

//---------------------------------------------------------------------------------------------------------------------

var vaddress = router.route('/account-address/user/:user_id');
//get data to update
vaddress.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    

    req.getConnection(
      function(err,conn)
      {

        if (err) return next("Cannot Connect");

        var order = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT address, isdefault FROM Shipping WHERE email_id = ? ; SELECT firstName, second_name, email_id, contactNo FROM USER WHERE email_id = ? ;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?",[user_id,user_id,user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('account-address',{title:"Account Address",address:rows[2],user:rows[3],categ:rows[0],subcateg:rows[1],cart_total:rows[4],cart:rows[5],user_id:user_id});
            
            
        });
        
        
        
        
      });
      
  });

//--------------------------------------------------------------------------------------------------------------------

var vabout = router.route('/about/user/:user_id');



//get data to update
vabout.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    

    req.getConnection(
      function(err,conn)
      {

        if (err) return next("Cannot Connect");

        var order = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category; SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?",[user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('about',{title:"About Us",categ:rows[0],subcateg:rows[1],cart_total:rows[2],cart:rows[3],user_id:user_id});
            
            
        });
        
        
        
        
      });
      
  });

//------------------------------whishlist--------------------------------------------------------------------------------------
  var vwish = router.route('/wishlist/user/:user_id');

vwish.all(function(req,res,next){
    console.log("You need to smth about home Route ? Do it here");
    console.log(req.params);
    next();
});
//get data to update
vwish.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    console.log(user_id);

    req.getConnection(
      function(err,conn)
      {


        if (err) return next("Cannot Connect");

        var wish = conn.query("SELECT productName, newPrice, smallImage FROM based_on_searches natural join Product WHERE based_on_searches.email_id = ?;SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?",[user_id,user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('wishlist',{title:"wishlist details",wish:rows[0],user_id:user_id,categ:rows[1],subcateg:rows[2],cart_total:rows[3],cart:rows[4]});
            
            
        });
        
        
        
        
      });
      
  });
//-------------------------FAQ-----------------------------
  var vwish = router.route('/faq/user/:user_id');

vwish.all(function(req,res,next){
    console.log("You need to smth about home Route ? Do it here");
    console.log(req.params);
    next();
});
//get data to update
vwish.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    console.log(user_id);

    req.getConnection(
      function(err,conn)
      {
        if (err) return next("Cannot Connect");

        var wish = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?",[user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('faq',{title:"faq details",user_id:user_id,categ:rows[0],subcateg:rows[1],cart_total:rows[2],cart:rows[3]});
            
            
        });
        
      });
      
  });
//--------------------------------------------------------
//-------------------------Contact_us----------------------------
  var vwish = router.route('/contact/user/:user_id');

vwish.all(function(req,res,next){
    console.log("You need to smth about home Route ? Do it here");
    console.log(req.params);
    next();
});
//get data to update
vwish.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    console.log(user_id);


    req.getConnection(
      function(err,conn)
      {
        if (err) return next("Cannot Connect");

        var wish = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?",[user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('contact',{title:"contact details",user_id:user_id,categ:rows[0],subcateg:rows[1],cart_total:rows[2],cart:rows[3]});
            
            
        });
        
      });
      
  });
//--------------------------------------------------------

//-------------------------sitemap----------------------------
  var vwish = router.route('/sitemap/user/:user_id');

vwish.all(function(req,res,next){
    console.log("You need to smth about home Route ? Do it here");
    console.log(req.params);
    next();
});
//get data to update
vwish.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    console.log(user_id);

    req.getConnection(
      function(err,conn)
      {
        if (err) return next("Cannot Connect");

        var wish = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?",[user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows.length < 1)
                return res.send("User Not found");

            res.render('sitemap',{title:"aboutus details",user_id:user_id,categ:rows[0],subcateg:rows[1],cart_total:rows[2],cart:rows[3]});
            
            
        });
        
      });
      
  });
//--------------------------------------------------------
 
//-----------------------------------------------------------

var vcart = router.route('/shopping-cart-right-column/user/:user_id');

vcart.all(function(req,res,next){
    console.log("You need to smth about home Route ? Do it here");
    console.log(req.params);
    next();
});

//get data to update
vcart.get(
  function(req,res,next)
  {

    var user_id = req.params.user_id;
    console.log(user_id);

    req.getConnection(
      function(err,conn)
      {

        if (err) return next("Cannot Connect");

        var cart = conn.query("SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category  ",[user_id,user_id],function(err,rows)
        {

            if(err)
            {
                console.log(err);
                return next("Mysql error, check your query");
            }

            //if user not found
            if(rows[0].length < 1)
                return res.render('shopping-cart-empty',{title:"cart details",cart:rows[0],cart_total:rows[1],user_id:user_id,categ:rows[2],subcateg:rows[3]});
	else{
            res.render('shopping-cart-right-column',{title:"cart details",cart:rows[0],cart_total:rows[1],user_id:user_id,categ:rows[2],subcateg:rows[3]});
		}
            
            
        });
        
        
        
        
      });
      
  });

//-------------------------------------------------------------------------------------------------------------------------
var list = router.route('/user/:category/:subcategory/:user_id');

list.all(function(req,res,next){
    console.log("You need to smth about list Route ? Do it here");
    console.log(req.params);
    next();
});
//show the CRUD interface | GET
list.get(function(req,res,next){

var user_id = req.params.user_id;
var category = req.params.category;
var subcategory = req.params.subcategory;

    req.getConnection(function(err,conn){

        if (err) return next("Cannot Connect");

        var query = conn.query("SELECT Category_id,categoryName FROM category;SELECT Subcategory_id,subCategoryName,Category_id FROM Sub_Category;SELECT productName,product_id,subCategoryName,stock FROM Product NATURAL JOIN Sub_Category WHERE Category_id= ? and subCategory_id= ?;Select subCategoryName from Sub_Category WHERE subCategory_id = ? AND Category_id = ? ;SELECT productName, newPrice, smallImage, quantity, (newPrice * quantity) as subtotal FROM Cart natural join Product WHERE Cart.email_id = ?;SELECT sum(newPrice * quantity) as total FROM Cart natural join Product WHERE Cart.email_id = ? ",[category,subcategory,subcategory,category,user_id,user_id],function(err,rows){
          
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            if(rows[2].length < 1)
                return  res.render('listing-empty-category',{title:"RESTful Crud Example",categ:rows[0],subcateg:rows[1],subv:rows[3],cart:rows[4],cart_total:rows[5],user_id:user_id});
              else{ 
            res.render('listing',{title:"RESTful Crud Example",categ:rows[0],subcateg:rows[1],listin:rows[2],subk:rows[3],subv:rows[3],cart:rows[4],cart_total:rows[5],user_id:user_id});}
         });


 



    });


});







//-------------------------------------------------------------------------------------------------------------


// //update data
// home.put(function(req,res,next){
//     var user_id = req.params.user_id;

//     //validation
//     req.assert('name','Name is required').notEmpty();
//     req.assert('email','A valid email is required').isEmail();
//     req.assert('password','Enter a password 6 - 20').len(6,20);

//     var errors = req.validationErrors();
//     if(errors){
//         res.status(422).json(errors);
//         return;
//     }

//     //get data
//     var data = {
//         name:req.body.name,
//         emailId:req.body.email,
//         password:req.body.password
//      };

//     //inserting into mysql
//     req.getConnection(function (err, conn){

//         if (err) return next("Cannot Connect");

//         var query = conn.query("UPDATE t_user set ? WHERE user_id = ? ",[data,user_id], function(err, rows){

//            if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//            }

//           res.sendStatus(200);

//         });

//      });

// });

// //delete data
// home.delete(function(req,res,next){

//     var user_id = req.params.user_id;

//      req.getConnection(function (err, conn) {

//         if (err) return next("Cannot Connect");

//         var query = conn.query("DELETE FROM t_user  WHERE user_id = ? ",[user_id], function(err, rows){

//              if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//              }

//              res.sendStatus(200);

//         });
//         //console.log(query.sql);

//      });
// });

var createAcc = router.route('/create-account');

createAcc.get(function(req,res,next){
  res.render('create-account');
});

createAcc.post(function(req,res,next){

    //server side validation*********
    req.assert('firstName','First Name is required').matches(/[^\s\\]/);
    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    req.assert('emailId','A valid email is required').isEmail();
    errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    req.assert('password','Enter a password 6 - 20').len(6,20);
    errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }
 
	
     req.assert('confirmPassword','Password not match').matches(req.body.password);
    var errors = req.validationErrors();
    if(errors){
        res.status(422).json(errors);
        return;
    }

    //get data
    var data = {
        email_id:req.body.emailId,
        firstName:req.body.firstName,
        second_name:req.body.lastName,
        password:req.body.password,
	contactNo:null
     };

    //inserting into mysql
    req.getConnection(function (err, conn){
        if (err) return next("Cannot Connect");

        var query = conn.query("INSERT INTO newDatabase.USER set ? ", data, function(err, rows){
           if(err){
                console.log(err);
                return next("Mysql error, check your query");
           }

           res.sendStatus(200);
        });
     });
});

var loginAcc = router.route('/login-account');

loginAcc.get(function(req,res,next){
  res.render('login-account');
});

loginAcc.put(function(req,res,next){
  console.error("inside post--------------");

  req.assert('emailId','A valid email is required').isEmail();
  errors = req.validationErrors();
  if(errors){
      res.status(422).json(errors);
      return;
  }

  req.assert('password','Empty password not alllowed').notEmpty();
  errors = req.validationErrors();
  if(errors){
      res.status(422).json(errors);
      return;
  }

  var email_id = req.body.emailId;
  var password = req.body.password;

  req.getConnection(function(err,conn){
      if (err){
        console.log(err);
        return next("Cannot Connect");
      }


      var query = conn.query("SELECT firstName,second_name FROM newDatabase.USER WHERE email_id = '"+email_id+"' and password = '"+password+"' ", function(err,rows){

          if(err){
            console.log(err);
              return next("Mysql error, check your query");
          }
          if(rows.length==0)
            res.status(400).json("Invalid emailID - password");
          else
          res.status(200).json(rows[0].firstName + rows[0].second_name);
       });
  });
});




// -----------------------------------------------------------------------------


// var curut = router.route('/user');
//
// //show the CRUD interface | GET
// curut.get(function(req,res,next){
//
//     req.getConnection(function(err,conn){
//
//         if (err) return next("Cannot Connect");
//
//         var query = conn.query('SELECT * FROM t_user',function(err,rows){
//
//             if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//             }
//
//             res.render('user',{title:"RESTful Crud Example",data:rows});
//
//          });
//
//     });
//
// });
// //post data to DB | POST
// curut.post(function(req,res,next){
//
//     //validation
//     req.assert('name','Name is required').notEmpty();
//     req.assert('email','A valid email is required').isEmail();
//     req.assert('password','Enter a password 6 - 20').len(6,20);
//
//     var errors = req.validationErrors();
//     if(errors){
//         res.status(422).json(errors);
//         return;
//     }
//
//     //get data
//     var data = {
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password
//      };
//
//     //inserting into mysql
//     req.getConnection(function (err, conn){
//
//         if (err) return next("Cannot Connect");
//
//         var query = conn.query("INSERT INTO t_user set ? ",data, function(err, rows){
//
//            if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//            }
//
//           res.sendStatus(200);
//
//         });
//
//      });
//
// });
//
// // -----------------------------------------------------------------------------
//
// var curut2 = router.route('/user/:user_id');
//
// curut2.all(function(req,res,next){
//     console.log("You need to smth about curut2 Route ? Do it here");
//     console.log(req.params);
//     next();
// });
//
// //get data to update
// curut2.get(function(req,res,next){
//
//     var user_id = req.params.user_id;
//
//     req.getConnection(function(err,conn){
//
//         if (err) return next("Cannot Connect");
//
//         var query = conn.query("SELECT * FROM t_user WHERE user_id = ? ",[user_id],function(err,rows){
//
//             if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//             }
//
//             //if user not found
//             if(rows.length < 1)
//                 return res.send("User Not found");
//
//             res.render('edit',{title:"Edit user",data:rows});
//         });
//
//     });
//
// });
//
// //update data
// curut2.put(function(req,res,next){
//     var user_id = req.params.user_id;
//
//     //validation
//     req.assert('name','Name is required').notEmpty();
//     req.assert('email','A valid email is required').isEmail();
//     req.assert('password','Enter a password 6 - 20').len(6,20);
//
//     var errors = req.validationErrors();
//     if(errors){
//         res.status(422).json(errors);
//         return;
//     }
//
//     //get data
//     var data = {
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password
//      };
//
//     //inserting into mysql
//     req.getConnection(function (err, conn){
//
//         if (err) return next("Cannot Connect");
//
//         var query = conn.query("UPDATE t_user set ? WHERE user_id = ? ",[data,user_id], function(err, rows){
//
//            if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//            }
//
//           res.sendStatus(200);
//
//         });
//
//      });
//
// });
//
// //delete data
// curut2.delete(function(req,res,next){
//
//     var user_id = req.params.user_id;
//
//      req.getConnection(function (err, conn) {
//
//         if (err) return next("Cannot Connect");
//
//         var query = conn.query("DELETE FROM t_user  WHERE user_id = ? ",[user_id], function(err, rows){
//
//              if(err){
//                 console.log(err);
//                 return next("Mysql error, check your query");
//              }
//
//              res.sendStatus(200);
//
//         });
//         //console.log(query.sql);
//
//      });
// });
//
// // -----------------------------------------------------------------------------

//now we need to apply our router here
app.use(router);

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);

});
