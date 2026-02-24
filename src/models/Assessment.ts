import { Schema, model, models } from 'mongoose';

// Interface for Assessment
export interface IAssessment {
  namaLengkap: string;
  usia: string;
  tanggalLahir: string;
  jenisKelamin: string;
  pendidikan: string;
  targetKonsultasi: string;
  beratBadan: number;
  tinggiBadan: number;
  lila: number;
  // ... complete Step 2-5 fields
  pemeriksaanLab?: string;
  pemeriksaanLabFile?: string;
  keluhan?: string[];
  riwayatPenyakit?: string;
  obatKonsumsi?: string;
  suplemenKonsumsi?: string;
  frekuensiMakan?: string;
  frekuensiMakanLainnya?: string;
  polaMakan?: string[];
  waktuMakan?: string;
  riwayatDiet?: string;
  alasanBerhentiDiet?: string;
  sumberKarbohidrat?: string;
  laukHewani?: string;
  laukNabati?: string;
  sayuran?: string;
  buahbuahan?: string;
  minuman?: string;
  cemilan?: string;
  olahraga?: string;
  frekuensiOlahraga?: string;
  jenisOlahraga?: string;
  pilihanPaket?: string;

  createdAt: Date;
  status: string;
}

const AssessmentSchema = new Schema<IAssessment>(
  {
    namaLengkap: { type: String, required: true },
    usia: { type: String, required: true },
    tanggalLahir: { type: String, required: true },
    jenisKelamin: { type: String, required: true },
    pendidikan: { type: String, required: true },
    targetKonsultasi: { type: String, required: true },
    beratBadan: { type: Number, required: true },
    tinggiBadan: { type: Number, required: true },
    lila: { type: Number, required: true },

    // Optional / Less strict fields to facilitate partial completion if needed
    pemeriksaanLab: { type: String },
    pemeriksaanLabFile: { type: String },
    keluhan: { type: [String] },
    riwayatPenyakit: { type: String },
    obatKonsumsi: { type: String },
    suplemenKonsumsi: { type: String },

    frekuensiMakan: { type: String },
    frekuensiMakanLainnya: { type: String },
    polaMakan: { type: [String] },
    waktuMakan: { type: String },
    riwayatDiet: { type: String },
    alasanBerhentiDiet: { type: String },

    sumberKarbohidrat: { type: String },
    laukHewani: { type: String },
    laukNabati: { type: String },
    sayuran: { type: String },
    buahbuahan: { type: String },
    minuman: { type: String },
    cemilan: { type: String },

    olahraga: { type: String },
    frekuensiOlahraga: { type: String },
    jenisOlahraga: { type: String },
    pilihanPaket: { type: String },

    status: { type: String, default: 'new' }, // new, reviewed, archived
  },
  { timestamps: true },
);

// Force recompile model during development to catch schema changes
if (process.env.NODE_ENV !== 'production') {
  delete models.Assessment;
}

const Assessment =
  models.Assessment || model<IAssessment>('Assessment', AssessmentSchema);

export default Assessment;
