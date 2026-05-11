import emailsRaw from './emails.json';
import type { Email } from './types';

const emails = emailsRaw as unknown as Email[];