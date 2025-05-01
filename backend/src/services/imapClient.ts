import { ImapFlow } from 'imapflow';
import 'dotenv/config';

export function createImapClient(): ImapFlow {
  return new ImapFlow({
    host: process.env.IMAP_HOST!,
    port: Number(process.env.IMAP_PORT!),
    secure: true,
    auth: {
      user: process.env.IMAP_USER!,
      pass: process.env.IMAP_PASS!,
    }
  });
}
