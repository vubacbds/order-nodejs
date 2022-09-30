module.exports = {
  mutipleMongooseToObject: (mongoose) => mongoose.map((m) => m.toObject()),
  mongooseToObject: (mongoose) => (mongoose ? mongoose.toObject() : mongoose),
};
