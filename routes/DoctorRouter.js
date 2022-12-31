const router = require('express').Router()
const doctorClient = require('../controllers/DoctorCtrl')
const authI = require('../middleware/authI')
const authAdmin = require('../middleware/authAdmin')
const authM = require('../middleware/authM')

router.post('/register', doctorClient.register)

router.post('/activation/:token', doctorClient.activateEmail)

router.post('/login', doctorClient.login)

router.post('/refresh_token', doctorClient.getAccessToken)

router.post('/forgotpw', doctorClient.forgotPW)

router.post('/resetpw', authI, doctorClient.resetPW)

router.get('/info', authI, doctorClient.getInstructorInfo)

// router.post('/meal_plan',  doctorClient.createMealPlan)
// router.post('/exercies_plan',  doctorClient.createExercies)

// router.get('/exercies_plan',  doctorClient.getExercies)
// router.get('/meal_plan',  doctorClient.getMeals)




router.get('/logout', doctorClient.logout)

router.get('/allinstructor_info', doctorClient.getAllinstructors)
router.get('/allinstructor_info/:id', doctorClient.getOneinstructors)
router.get('/patients', doctorClient.patientsDoctorGet)

router.get('/appointemnts/:id', doctorClient.getDoctorAppintments)


router.get('/patients',  doctorClient.getAllmembers)

router.patch('/update', authI, doctorClient.updateInstructor) 

router.delete('/deleteIns/:id', authI, authAdmin, doctorClient.deleteInstructor)

router.delete('/deleteMem/:id', authI, authAdmin, doctorClient.deleteMember)

router.patch('/update_role/:id', authI, authAdmin, doctorClient.updateRole) 

module.exports = router