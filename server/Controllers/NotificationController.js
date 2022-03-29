const express = require("express");
const db = require("../database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const mail = require("nodemailer");

const NotificationController = express.Router()

NotificationController.use(express.json());
NotificationController.use(cookieParser());
NotificationController.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
NotificationController.use(express.static(path.join(__dirname, "../client/build")));
NotificationController.use(express.static(__dirname + "../client/public/"));
NotificationController.use(bodyParser.urlencoded({ extended: true }));
NotificationController.use(bodyParser.json())
NotificationController.use(express.static('dist'));


NotificationController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Gets patient name, and appointment time

NotificationController.get("/retrieveAllNotifications", (req, res) => {
    let doctorID = req.query["id"];
    //parameters: DoctorID
    //returns: FName, LName, aptDate, StartTime,EndTime
    let state = "SELECT Upatient.Fname, Upatient.Lname, A.aptDate, A.startTime, A.endTime " +
        "FROM 390db.appointments A, 390db.users Upatient, 390db.doctors D, 390db.patients P " +
        "Where A.PatientID = Upatient.ID AND A.doctorID = ? AND P.id=Upatient.id AND P.doctorID = D.id;"
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

//Gets the total number of appointments
NotificationController.post("/getAllNotificationCount", (req, res) => {
    let doctorID = req.query["id"];
    //parameters: DoctorID
    //returns: (count of rows)
    let state = "SELECT count(*) as notificationCount FROM 390db.appointments A WHERE A.DoctorID = ?"
    db.query(state, [doctorID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

//reruns the check every 60 seconds for the target time of 23:30
let checkTime = setInterval(() => {
    let dateNow = new Date();
    let timeNow = dateNow.getHours() + ":" + dateNow.getMinutes();
    let dayNow = dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate()
    console.log(dayNow+"\t"+dateNow.getHours() + ":" + dateNow.getMinutes() + ":" + dateNow.getSeconds());

    reminderNotification(timeNow, dateNow, dayNow)
}, 60000);

function reminderNotification(timeNow, dateNow, dayNow) {
    if (timeNow == "23:30") {
        let state = "select U.FName, U.LName, U.email, U.id from users U where U.ID not in (select U.ID from users U, healthInformation HI where U.ID = HI.PatientID and HI.InfoTimestamp =?) and U.Role = 'Patient';"
        db.query(state, [dayNow],
            (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    //send email to all emails from results
                    for (i = 0; i < results.length; i++) {
                        let fName = results[i]['FName']
                        let lName = results[i]['LName']
                        let email = results[i]['email']
                        const transporter = mail.createTransport({
                            service: "gmail",
                            auth: {
                                user: "noreply.COVID19site@gmail.com",
                                pass: "COVID19#2022"
                            }
                        });

                        const mailOptions = {
                            from: "COVID 19 WEBSITE",
                            to: email,//i,
                            subject: "A status update is needed",
                            text: "Dear " + fName + " " + lName + ",\n\n" + "We would like to remind you to update your profile with your symptoms for today (" + dayNow + ')' + "\n\nRegards,\n\nCOVID 19 Website"
                        }
                        transporter.sendMail(mailOptions)
                    }

                }
            }
        );
    }

}


module.exports = NotificationController;