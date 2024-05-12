import mongoose, { Schema } from 'mongoose';

const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    foundedYear: {
      type: Number,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const Company = mongoose.model('Company', companySchema);
