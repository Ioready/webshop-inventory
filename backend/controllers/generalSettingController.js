import GeneralSetting from '../models/generalSetting.js';

// Get General Settings
export const getGeneralSettings = async (req, res) => {
  try {
    const settings = await GeneralSetting.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found.' });
    }
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching general settings:", error);
    res.status(500).json({ message: "Failed to fetch settings." });
  }
};

// Create or Update General Settings
export const upsertGeneralSettings = async (req, res) => {
  const { taxName, taxPercentage, shipmentCharges, currencySymbol, showOnFrontend } = req.body;

  try {
    let settings = await GeneralSetting.findOne();
    
    if (settings) {
      // Update existing settings
      settings.taxName = taxName;
      settings.taxPercentage = taxPercentage;
      settings.shipmentCharges = shipmentCharges;
      settings.currencySymbol = currencySymbol;
      settings.showOnFrontend = showOnFrontend;
    } else {
      // Create new settings
      settings = new GeneralSetting({
        taxName,
        taxPercentage,
        shipmentCharges,
        currencySymbol,
        showOnFrontend,
      });
    }

    await settings.save();
    res.status(200).json({ message: "Settings saved successfully.", settings });
  } catch (error) {
    console.error("Error saving general settings:", error);
    res.status(500).json({ message: "Failed to save settings." });
  }
};
