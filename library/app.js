const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const port = 3000;

// Import route
const postsRouter = require('./routes/posts');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Route
app.use('/posts', postsRouter);

// Redirect default ke /posts
app.get('/', (req, res) => {
  res.redirect('/posts');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});