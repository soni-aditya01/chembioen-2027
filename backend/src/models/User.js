import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      unique: true,
    },
    phone: { type: String, required: true, trim: true, maxlength: 24 },
    institution: { type: String, required: true, trim: true, maxlength: 160 },
    department: { type: String, required: true, trim: true, maxlength: 120 },
    designation: { type: String, required: true, trim: true, maxlength: 80 },
    termsAccepted: { type: Boolean, required: true, default: false },
    passwordHash: { type: String, required: true, select: false }
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.toPublicProfile = function toPublicProfile() {
  return {
    id: this.id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    institution: this.institution,
    department: this.department,
    designation: this.designation
  };
};

userSchema.statics.hashPassword = (password) => bcrypt.hash(password, 12);
userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model("User", userSchema);
