const Patients = require("../models/PatientModel");
const MealModel = require("../models/MealModel");
const Exercies = require("../models/ExerciesModel");
const Doctors = require("../models/DoctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const { UserRefreshClient } = require("google-auth-library");

const Appoinment = require("../models/Appoinment");
const Instructor = require("../models/DoctorModel");

// const sendEmail = require("./sendMail");

const {
  CLIENT_URL,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  ACTIVATION_TOKEN_SECRET,
} = require("../config/key");

const patientCtrl = {
  // Member Registration (S)

  register: async (req, res) => {
    try {
      const { name, email, password, address, phone, gender } =
        req.body.loginData;

      if (!name || !email || !phone || !password || !address || !gender)
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid email." });

      const member = await Patients.findOne({ email });
      if (member)
        return res.status(400).json({ msg: "This email already exists" });

      if (password.length < 8)
        return res
          .status(400)
          .json({ msg: "Password must be at least 8 characters" });

      const passwordHash = await bcrypt.hash(password, 12);

      const newMember = {
        name,
        email,
        password,
        address,
        phone,
        gender,
      };

      const newPatient = new Patients({
        name: name,
        email: email,
        phone: phone,
        role: "1",
        password: password,
        address: address,
        gender: gender,
      });

      await newPatient.save();

      res.json({ msg: "Account has been activated" });

      // const activation_token = createActivationToken(newMember);

      // const url = `${CLIENT_URL}/member/activation/${activation_token}`;
      // sendMail(email, url, "Verfy your email");
      // console.log({ activation_token });

      // res.json({ msg: "Registration Success! Please activate your account." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  //Member Activation (S)
  activateEmail: async (req, res) => {
    try {
      const activation_token = req.params.token;
      const member = jwt.verify(activation_token, ACTIVATION_TOKEN_SECRET);
      const {
        name,
        lastname,
        email,
        phone,
        password,
        height,
        weight,
        address,
        occupation,
        dob,
        gender,
      } = member;

      const check = await Patients.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "This email is already exists" });
      const newMember = new Patients({
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        height: height,
        weight: weight,
        address: address,
        occupation: occupation,
        dob: dob,
        gender: gender,
      });

      await newMember.save();

      res.json({ msg: "Account has been activated" });
    } catch (err) {
      console.log(err);
      if (
        err.message ==
        "E11000 duplicate key error collection: test.Patients index: Email_1 dup key: { Email: null }"
      ) {
        return res.json({ msg: "Account has been activated" });
      }
      return res.status(500).json({ msg: err.message });
    }
  },

  //Member Login (H)
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const member = await Patients.findOne({ email });

      if (!member)
        return res.status(400).json({ msg: "User Credentials Invalid." });

      if (member.password !== password) {
        return res.status(400).json({ msg: "User Credentials Invalid" });
      }
      console.log(member);

      const refresh_token = createRefreshToken({
        id: member._id,
        role: member.role,
      });
      //   res.cookie("refreshtoken", refresh_token, {
      //     httpOnly: true,
      //     path: "/member/refresh_token",
      //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      //   });
      res.json({
        msg: "Login success!",
        token: refresh_token,
        role: member.role,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // (H)
  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

      jwt.verify(rf_token, REFRESH_TOKEN_SECRET, (err, member) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });

        const access_token = createAccessToken({ id: member.id });
        console.log({ access_token });
        res.json({ access_token });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Member Forgot password (S)
  forgotPW: async (req, res) => {
    try {
      const { Email } = req.body;
      const member = await Patients.findOne({ Email });
      if (!member)
        return res.status(400).json({ msg: "This email does not exist." });

      const access_token = createAccessToken({ id: member._id });
      console.log({ access_token });
      const url = `${CLIENT_URL}/member/reset/${access_token}`;

      sendMail(Email, url, "Reset your password");
      res.json({ msg: "Please check your email to reset your password" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  applinmentCreate: async (req, res) => {
    try {
      const { id, apTime } = req.body;
      const token = req.header("authToken");
      const user = jwt.verify(token, REFRESH_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      const insdata = await Doctors.findById(id);
      const pati = await Patients.findById(user.id);
      const newAppointment = new Appoinment({
        doctorName: insdata.name,
        specialist: insdata.specialist,
        patientName: pati.name,
        date: apTime,
        doctorId: id,
        patientId: user.id,
      });

      await newAppointment.save();
      console.log(newAppointment);
      res.json({ msg: "Appinment Submited" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  applinmentGet: async (req, res) => {
    try {
      const token = req.header("authToken");
      console.log(token);
      const user = jwt.verify(token, REFRESH_TOKEN_SECRET, {
        expiresIn: "60m",
      });
      const appointemnt = await Appoinment.find({ patientId: user.id });
      res.json(appointemnt);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  totalAppointment: async (req, res) => {
    try {
      const appointemnt = await Appoinment.find();
      res.json(appointemnt);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  allRegisteredPatients: async (req, res) => {
    try {
      const patients = await Patients.find();
      console.log(patients)
      res.json(patients);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Member Reset password (H)
  resetPW: async (req, res) => {
    try {
      const { Password } = req.body;
      console.log(Password);
      const passwordHash = await bcrypt.hash(Password, 12);

      console.log(req.member);
      await Patients.findOneAndUpdate(
        { _id: req.member.id },
        {
          Password: passwordHash,
        }
      );

      res.json({ msg: "Password successfully changed!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Get member info (S)
  getUserInfo: async (req, res) => {
    try {

      const token  = req.header("authToken");
      const user = jwt.verify(token, REFRESH_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      console.log(user)
      if (user.role === "doctor") {
        const doctor = await Doctors.findById(user.id)
        return res.json(doctor);
      } else {
        const patient = await Patients.findById(user.id);

        return res.json(patient);
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Member Logout (S)
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/member/refresh_token" });
      return res.json({ msg: "You have successfully logged out." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },



  //Upload avatar
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

//password check
//number check

const createActivationToken = (payload) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

module.exports = patientCtrl;
