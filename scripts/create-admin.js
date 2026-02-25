/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Manually load .env.local because dotenv might not be installed
const envPath = path.resolve(__dirname, '../.env.local');

if (fs.existsSync(envPath)) {
    console.log('Loading .env.local...');
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join('=').trim();
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            process.env[key] = value;
        }
    });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

// Define Schema locally to avoid TS compilation requirement
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Prevent overwrite model error
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function createAdmin() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('Connected.');

        const usernameInput = await question('Enter username (default: admin): ');
        const username = usernameInput.trim() || 'admin';

        const password = await question('Enter new password: ');

        if (!password) {
            console.error('Password cannot be empty.');
            process.exit(1);
        }

        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        let admin = await Admin.findOne({ username });

        if (admin) {
            console.log(`User '${username}' found. Updating password...`);
            admin.password = hashedPassword;
            await admin.save();
            console.log('Password updated successfully.');
        } else {
            console.log(`User '${username}' not found. Creating new admin...`);
            await Admin.create({ username, password: hashedPassword });
            console.log('Admin created successfully.');
        }

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await mongoose.disconnect();
        rl.close();
        process.exit(0);
    }
}

createAdmin();
