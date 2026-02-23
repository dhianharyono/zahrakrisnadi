import { Schema, model, models } from 'mongoose';

export interface IUpload {
    filename: string;
    contentType: string;
    data: Buffer;
    size: number;
    createdAt: Date;
}

const UploadSchema = new Schema<IUpload>(
    {
        filename: { type: String, required: true },
        contentType: { type: String, required: true },
        data: { type: Buffer, required: true },
        size: { type: Number, required: true },
    },
    { timestamps: true }
);

if (process.env.NODE_ENV !== 'production') {
    delete models.Upload;
}
const Upload = models.Upload || model<IUpload>('Upload', UploadSchema);
export default Upload;
