var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
var compression = require('compression');
var variables = require('../variables')
var facultyAllowedUrls = [variables.facLink1, variables.facLink2];


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.all('*', function (req, res, next) {
  var date = new Date();
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  res.header("Access-Control-Max-Age", "36000");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,auth-token");

  if(req && req.body && req.body.regno && req.body.regno.length != 9 && req.body.regno.length != 4 && req.body.regno.length != 5 && req.body.regno.length != 6)
  {
    res.send({"code" : "5001", "message" : "User does not exist. Please check for spaces in register number."});
  }
  else
  {
    if((req && req.body && req.body.regno) && (req.body.regno.length == 4 || req.body.regno.length == 5 || req.body.regno.length == 6))
    {
      if(facultyAllowedUrls.indexOf(req.originalUrl) == -1)
      {
        res.send({"code" : "5009", "message" : "This service is not for you. Sorry :("});
        return;
      }
    }
    next();
  }
});


app.use(session(
{
  cookieName : variables.sessionName,
  secret : variables.sessionSecret,
  duration : (10 * 60 * 1000),
  activeDuration : (10 * 60 * 1000)
}
));










var index = require('./routes/index')
var checkLogin = require('./routes/checkLogin');
var getTimetable = require('./routes/getTimetable');
var getMessages = require('./routes/getMessages');
var getMarks = require('./routes/getMarks');
var getMarks2 = require('./routes/getMarks2');
var getDigitalAssignments = require('./routes/getDigitalAssignments');
var getDigitalAssignmentMarks = require('./routes/getDigitalAssignmentMarks');
var getDefaultEmailAndPassword = require('./routes/getDefaultEmailAndPassword');
var searchFaculty = require('./routes/searchFaculty');
var getFaculty = require('./routes/getFaculty');
var getExamSchedule = require('./routes/getExamSchedule');
var getAttendance = require('./routes/getAttendance');
var detailAttendance = require('./routes/detailAttendance');
var getGrades = require('./routes/getGrades');
var getLeaves = require('./routes/getLeaves');
var cancelLeave = require('./routes/cancelLeave');
var cancelLateHour = require('./routes/cancelLateHour');
var applyOuting = require('./routes/applyOuting');
var applyHometownLeave = require('./routes/applyHometownLeave');
var getLateHourPermission = require('./routes/getLateHourPermission');
var applyLateHour = require('./routes/applyLateHour');
var getCourses = require('./routes/getCourses');
var getClasses = require('./routes/getClasses');
var getCoursePage = require('./routes/getCoursePage');
var checkParams = require('./routes/checkParams');
var loaderio = require('./routes/loaderio');
var makeFacultyJson = require('./routes/makeFacultyJson');
var login = require('./routes/login');
var oauth = require('./routes/oauth');
var playawmicks = require('./routes/playawmicks');
var pushChaptersFromAwMicks = require('./routes/pushChaptersFromAwMicks');
var home = require('./routes/home');
var postEventForm = require('./routes/postEventForm');
var chapterDidPostAnEvent = require('./routes/chapterDidPostAnEvent');
var chapterDidPostEventImage = require('./routes/chapterDidPostEventImage');
var getEvents = require('./routes/getEvents');
var getEventsAndroid = require('./routes/getEventsAndroid');
var registerEvent = require('./routes/registerEvent');
var changePassword = require('./routes/changePassword');
var changePasswordAuth = require('./routes/changePasswordAuth');
var seeAllEventsPosted = require('./routes/seeAllEventsPosted');
var editEvents = require('./routes/editEvents');
var seeEventRegistrations = require('./routes/seeEventRegistrations');
var editEventWithEncId = require('./routes/editEventWithEncId');
var chapterDidEditAnEvent = require('./routes/chapterDidEditAnEvent');
var logout = require('./routes/logout');
var pushDeviceId = require('./routes/pushDeviceId');
var getMessagesAndAssignments = require('./routes/getMessagesAndAssignments');
var getSpotlight = require('./routes/getSpotlight');
var getCoursePageFaculties = require('./routes/getCoursePageFaculties');
var getCoursePageInDetail = require('./routes/getCoursePageInDetail');
var getProctor = require('./routes/getProctor');
var getAcademicHistory = require('./routes/getAcademicHistory');
var getMyCurriculum = require('./routes/getMyCurriculum');




app.use(variables.getMyCurriculumLink, getMyCurriculum);
app.use(variables.getAcademicHistoryLink, getAcademicHistory);
app.use(variables.getSpotlightLink, getSpotlight);
app.use(variables.indexLink, index);
app.use(variables.checkLoginLink, checkLogin);
app.use(variables.getTimetableLink, getTimetable);
app.use(variables.getMessagesLink, getMessages);
app.use(variables.getMarksLink, getMarks);
app.use(variables.getMarks2Link, getMarks2);
app.use(variables.getDigitalAssignmentsLink, getDigitalAssignments);
app.use(variables.getDigitalAssignmentMarksLink, getDigitalAssignmentMarks);
app.use(variables.getDefaultEmailAndPasswordLink, getDefaultEmailAndPassword);
app.use(variables.searchFacultyLink, searchFaculty);
app.use(variables.getFacultyLink, getFaculty);
app.use(variables.getExamScheduleLink, getExamSchedule);
app.use(variables.getAttendanceLink, getAttendance);
app.use(variables.detailAttendanceLink, detailAttendance);
app.use(variables.getGradesLink, getGrades);
app.use(variables.getLeavesLink, getLeaves);
app.use(variables.cancelLeaveLink, cancelLeave);
app.use(variables.cancelLateHourLink, cancelLateHour);
app.use(variables.applyOutingLink, applyOuting);
app.use(variables.applyHometownLeaveLink, applyHometownLeave);
app.use(variables.getLateHourPermissionLink, getLateHourPermission);
app.use(variables.applyLateHourLink, applyLateHour);
app.use(variables.getCoursesLink, getCourses);
app.use(variables.getClassesLink, getClasses);
app.use(variables.getCoursePageLink, getCoursePage);
app.use(variables.checkParamsLink, checkParams);
app.use(variables.loaderioLink, loaderio);
app.use(variables.makeFacultyJsonLink, makeFacultyJson);
app.use(variables.loginLink, login);
app.use(variables.oauthLink, oauth);
app.use(variables.playawmicksLink, playawmicks);
app.use(variables.pushChaptersFromAwMicksLink, pushChaptersFromAwMicks);
app.use(variables.homeLink, home);
app.use(variables.postEventFormLink, postEventForm);
app.use(variables.chapterDidPostAnEventLink, chapterDidPostAnEvent);
app.use(variables.chapterDidPostEventImageLink, chapterDidPostEventImage);
app.use(variables.getEventsLink, getEvents);
app.use(variables.getEventsAndroidLink, getEventsAndroid);
app.use(variables.changePasswordLink, changePassword);
app.use(variables.changePasswordAuthLink, changePasswordAuth);
app.use(variables.seeAllEventsPostedLink, seeAllEventsPosted);
app.use(variables.editEventsLink, editEvents);
app.use(variables.editEventWithEncIdLink, editEventWithEncId);
app.use(variables.seeEventRegistrationsLink, seeEventRegistrations);
app.use(variables.chapterDidEditAnEventLink, chapterDidEditAnEvent);
app.use(variables.logoutLink, logout);
app.use(variables.registerEventLink, registerEvent);
app.use(variables.pushDeviceIdLink, pushDeviceId);
app.use(variables.getMessagesAndAssignmentsLink, getMessagesAndAssignments);
app.use(variables.getCoursePageFacultiesLink, getCoursePageFaculties);
app.use(variables.getCoursePageInDetailLink, getCoursePageInDetail);
app.use(variables.getProctorLink, getProctor);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    res.render('error', {
      message: "Not Authorized",
    error: "Not Authorized"
    });
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
   res.render('error', {
    message: "Not Authorized",
    error: "Not Authorized"
  }); 
                      // res.render('error', {
                      //     message: err.message,
                      //     error: {}
                      //   });
});


module.exports = app;
