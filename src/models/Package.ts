import mongoose, { Schema, model } from 'mongoose';

export interface IPackageFeature {
    name: string;
    value: Schema.Types.Mixed; // Supports string or boolean
}

export interface IPackage {
    name: string;
    price: string;
    duration: string;
    description: string;
    features: IPackageFeature[];
    highlight: boolean;
    order: number;
}

const PackageFeatureSchema = new Schema(
    {
        name: { type: String, required: true },
        value: { type: Schema.Types.Mixed, required: true },
    },
    { _id: false },
);

const PackageSchema = new Schema<IPackage>(
    {
        name: { type: String, required: true },
        price: { type: String, required: true },
        duration: { type: String, required: true },
        description: { type: String, required: true },
        features: [PackageFeatureSchema],
        highlight: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true },
);

// Force model rebuild in dev to handle schema changes
if (mongoose.models.Package) {
    delete mongoose.models.Package;
}

const Package = model<IPackage>('Package', PackageSchema);

export default Package;
