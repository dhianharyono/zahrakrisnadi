import mongoose, { Schema, model } from 'mongoose';

export interface ITestimonial {
  patientName: string;
  program: string;
  role: string;
  message: string;
  rating: number;
  isVisible: boolean; // Managed by admin
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    patientName: { type: String, required: true },
    program: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isVisible: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// Force model rebuild in dev to handle schema changes
if (mongoose.models.Testimonial) {
  delete mongoose.models.Testimonial;
}

const Testimonial = model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
