const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// CRUD operations
userSchema.statics.createUser = async function (userData) {
  return this.create(userData);
};

userSchema.statics.getUserById = async function (userId) {
  return this.findById(userId);
};

userSchema.statics.updateUser = async function (userId, updatedData) {
  return this.findByIdAndUpdate(userId, updatedData, { new: true });
};

userSchema.statics.deleteUser = async function (userId) {
  return this.findByIdAndDelete(userId);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
