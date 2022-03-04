const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { addToLocals } = require('./middleware/allMidlleWares')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const travelCardRouter = require('./routes/travelCard');

const app = express();

// view engine setup
app.set('views', path.join(process.env.PWD, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'apojrglkdzfng;sakg', // строка для шифрования сессии
  resave: false, // не пересохраняем сессию если не было изменений
  saveUninitialized: false, // не сохраняем сессию если она пустая
  cookie: { secure: false }, // не HTTPS
  name: 'userCookie', // имя сессионной куки
  store: new FileStore(), // хранилище для куков - папка с файлами
}));

app.use(addToLocals)

app.use('/', indexRouter);
app.use('/profile', usersRouter);
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/travelCard', travelCardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has been started on PORT:${PORT}`);
});

module.exports = app;
