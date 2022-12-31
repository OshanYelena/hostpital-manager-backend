require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const connectDB = require('./DB')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

///Routes
app.use('/patient', require('./routes/PatientRouter'));
app.use('/doctor', require('./routes/DoctorRouter'));

///Connect to mongoDB
connectDB();


const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})