import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import * as fs from 'fs';
import * as path from 'path';

let projectId = process.env.FIREBASE_PROJECT_ID;

try {
  const configPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    if (config.projectId) {
      projectId = config.projectId;
    }
  }
} catch (e) {
  // Ignore
}

if (!getApps().length) {
  initializeApp({
    projectId: projectId || 'example-project',
  });
}

export const adminAuth = getAuth();
