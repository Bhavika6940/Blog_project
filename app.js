const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const { Role, seedRBAC } = require('./models');

dotenv.config();
const app = express();

const {sequelize,createDatabaseAndConnect} = require("./config/db");
const startServer = async () => {
  await createDatabaseAndConnect();

  //Sync models here
  await sequelize.sync();
  const roleCount = await Role.count();
  if(roleCount === 0){
    console.log("Database empty. Seeding RBAC");
    await seedRBAC();
  }
  
  app.listen(5000, () => console.log('Server running on port 5000'));
}
//Router files
const postRoutes = require("./routes/post.routes");
const userRoutes = require("./routes/user.routes");
const commentRoutes = require("./routes/comment.routes");
const categoryRoutes = require("./routes/category.routes");
const uploadRoutes = require("./routes/upload.routes");
const roleRoutes = require("./routes/role.routes");
const permissionRoutes = require("./routes/permission.routes");
const rolePermissionRoutes = require("./routes/rolePermission.routes")

//connect to database
startServer();

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({ origin: "*" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Route level middleware

app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/permission", permissionRoutes);
app.use("/api/rolePermission", rolePermissionRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
