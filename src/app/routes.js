module.exports = (app, passport) => {
	
	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	})
	//login view
	app.get('/login', (req, res) => {
		res.render('login', {
			message: req.flash('loginMessage')
		});
	});
	app.post('./login', (req, res) => {});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('./signup', (req, res) =>{})
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view

	 app.get('/profile', isLoggedIn, (req, res) => {
	 	res.render('profile', {
	 		user: req.user
	 	});
	 });

	// logout

	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};


//middleware to navigate only if logged in
function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
} 