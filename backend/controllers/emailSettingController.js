import EmailSetting from '../models/emailSettings.js';

// Get Email Settings
export const getEmailSettings = async (req, res) => {
  try {
    console.log("call")
    const settings = await EmailSetting.findOne();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching email settings' });
  }
};

// Update Email Settings
export const updateEmailSettings = async (req, res) => {
  const { mailFromName, mailFromEmail, enableEmailQueue, mailDriver, mailHost, mailPort, mailEncryption, mailUsername, mailPassword } = req.body;

  try {
    let settings = await EmailSetting.findOne();

    if (settings) {
      // Update existing settings
      settings.mailFromName = mailFromName;
      settings.mailFromEmail = mailFromEmail;
      settings.enableEmailQueue = enableEmailQueue;
      settings.mailDriver = mailDriver;
      settings.mailHost = mailHost;
      settings.mailPort = mailPort;
      settings.mailEncryption = mailEncryption;
      settings.mailUsername = mailUsername;
      settings.mailPassword = mailPassword;
    } else {
      // Create new settings
      settings = new EmailSetting({
        mailFromName,
        mailFromEmail,
        enableEmailQueue,
        mailDriver,
        mailHost,
        mailPort,
        mailEncryption,
        mailUsername,
        mailPassword,
      });
    }

    await settings.save();
    res.status(200).json({ message: 'Email settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating email settings' });
  }
};
