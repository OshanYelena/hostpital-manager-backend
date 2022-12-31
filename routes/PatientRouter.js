const router = require('express').Router()
const patientClient = require('../controllers/PatientCtrl')
const authM = require('../middleware/authM')

router.post('/register', patientClient.register)

router.post('/activation/:token', patientClient.activateEmail)

router.post('/login', patientClient.login)

router.get('/refresh_token', patientClient.getAccessToken)

router.post('/appoinment', patientClient.applinmentCreate)

router.get('/appoinment/all', patientClient.totalAppointment)
router.get('/appoinment', patientClient.applinmentGet)
router.get('/all', patientClient.allRegisteredPatients)



router.post('/forgotpw', patientClient.forgotPW)

router.post('/resetpw', authM, patientClient.resetPW)

router.get('/info',patientClient.getUserInfo)

router.get('/logout',  patientClient.logout)




module.exports = router