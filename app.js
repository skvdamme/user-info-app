// User Information App - Web Server

// Create a Node.js application that is the beginning of a user management system. 
// Your users are all saved in a "users.json" file, and you can currently do the following:
// - search for users
// - add new users to your users file.
// - get your starter file here: users.jsonView in a new window

// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.


// Part 1
// Create two more routes:
// - route 2: renders a page that displays a form which is your search bar.
// - route 3: takes in the post request from your form, then displays matching users on a new page. 
//   Users should be matched based on whether either their first or last name contains the input string.

// Part 2
// Create two more routes:
// - route 4: renders a page with three forms on it (first name, last name, and email) 
// that allows you to add new users to the users.json file.
// - route 5: takes in the post request from the 'create user' form, 
// then adds the user to the users.json file. 
// Once that is complete, redirects to the route that displays all your users (from part 0).

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function (req, res) {
    res.render('index');
});


app.get('/displayUsers', function (req, res) {
		fs.readFile('users.json', function(err, data){
        	if (err) {
            	throw err;
        };

        var json = JSON.parse(data);
	res.render('users', { userlist: json });
	console.log(json);
	});
});


app.get('/searchBar', function (req, res) {
    res.render('search');

});

app.post('/postRequestForm', function (req, res) {
    console.log(req.body);

    fs.readFile('users.json', function(err, data){
        if (err) {
            throw err;
        };

    console.log("This is the users.json before parsing: "+data)
    
    var call = JSON.parse(data);
   
    console.log('/////')
    
    console.log('This is the users.json after parsing '+ call);

    for (var x = 0; x < call.length; x++){
        if (req.body.search === call[x].firstname || req.body.search === call[x].lastname || req.body.search === call[x].email){
            var result = call[x].firstname + " " + call[x].lastname + "'s email is: " + call[x].email
        }
    }
        res.render('results', {key: result});
    });

});
    

//     if (postRequestForm = users.json){
//         res.render('postRequestForm')
//     }
//     else {
//         console.log(there is no match);
//     }    
// }
// compare the user information data from the search bar with your users.json
//if match render results page
//else tell user there's no match
// });

app.get('/formPage', function (req, res) {
    res.render('messagebox');
});


app.post('/formPageInfo', function (req, res){
    console.log(req.body);

    fs.readFile('users.json', function(err, data){
        if (err) {
            throw err;

    }
        var call = JSON.parse(data);
        var newUserData = req.body;

        call.push(newUserData);
     //    console.log(call);

	    var string = JSON.stringify(call);
	    // console.log(string);

    fs.writeFile("users.json", string, function(err) {
		if(err) {
			throw err;    
		}
		console.log(string);		
		res.redirect('/');
	});
    		 
  });

});


var server = app.listen(3000, function(req,res){
    console.log('App running on port 3000')
});


