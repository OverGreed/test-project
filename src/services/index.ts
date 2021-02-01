import { AuthService } from './auth.service';
import { EmailService } from './email.service';

export * from './db.service';
export * from './response.service';

export const auth = new AuthService();
export const email = new EmailService();
