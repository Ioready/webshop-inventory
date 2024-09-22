import mongoose from 'mongoose';

const generalSettingSchema = new mongoose.Schema({
  taxName: {
    type: String,
    required: true,
  },
  taxPercentage: {
    type: Number,
    required: true,
  },
  shipmentCharges: {
    type: Number,
    required: true,
  },
  currencySymbol: {
    type: String,
    required: true,
  },
  showOnFrontend: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // This will automatically add createdAt and updatedAt fields
});

const GeneralSetting = mongoose.model('GeneralSetting', generalSettingSchema);

export default GeneralSetting;
