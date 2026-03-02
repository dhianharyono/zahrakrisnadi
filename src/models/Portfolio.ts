import mongoose, { Schema, model } from 'mongoose';

export interface IPortfolio {
    title: string;
    category: string;
    description: string;
    image: string;
}

const PortfolioSchema = new Schema<IPortfolio>(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
    },
    { timestamps: true },
);

// Force model rebuild in dev to handle schema changes
if (mongoose.models.Portfolio) {
    delete mongoose.models.Portfolio;
}

const Portfolio = model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;