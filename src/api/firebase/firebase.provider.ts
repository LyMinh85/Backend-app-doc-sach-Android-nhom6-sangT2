import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

export const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      project_id: configService.get<string>('PROJECT_ID'),
    } as admin.ServiceAccount;

    const base64EncodedServiceAccount =
      process.env.BASE64_ENCODED_SERVICE_ACCOUNT;
    const decodedServiceAccount = Buffer.from(
      base64EncodedServiceAccount,
      'base64',
    ).toString('utf-8');
    const credentials = JSON.parse(decodedServiceAccount);

    return admin.initializeApp({
      credential: admin.credential.cert(credentials),
      // databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};
