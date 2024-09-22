import mongoose from "mongoose";

const emailSettingsSchema = new mongoose.Schema(
  {
    mailFromName: {
      type: String,
      required: true,
    },
    mailFromEmail: {
      type: String,
      required: true,
    },
    enableEmailQueue: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    mailDriver: {
      type: String,
      enum: ["mail", "smtp"],
      default: "smtp",
    },
    mailHost: {
      type: String,
      required: true,
    },
    mailPort: {
      type: Number,
      required: true,
    },
    mailEncryption: {
      type: String,
      enum: ["ssl", "tls"],
      default: "ssl",
    },
    mailUsername: {
      type: String,
      required: true,
    },
    mailPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const EmailSetting = mongoose.model("EmailSetting", emailSettingsSchema);

export default EmailSetting;
