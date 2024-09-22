import express from 'express';
import { getEmailSettings, updateEmailSettings } from '../controllers/emailSettingController.js';
import { getGeneralSettings, upsertGeneralSettings } from '../controllers/generalSettingController.js';

const router = express.Router();

router.get('/email-settings', getEmailSettings);
router.post('/email-settings', updateEmailSettings);

// Route to get general settings
router.get('/general-settings', getGeneralSettings);

// Route to create/update general settings
router.post('/general-settings', upsertGeneralSettings);

export default router;
