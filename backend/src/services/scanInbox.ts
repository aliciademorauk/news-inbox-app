import { ImapFlow } from 'imapflow';
import { simpleParser, ParsedMail } from 'mailparser';
import 'dotenv/config';

const allowedSenders = ['ramin.nakisa@pensioncraft.com'];

export async function fetchEmailsFromSenders(senders: string[]): Promise<void> {
  for (const sender of senders) {
    try {
      await fetchEmailsFromSender(sender)
    } catch (e: any) {
      console.error(`Failed to fetch from ${sender}:`, e);
    }
  }
}

async function fetchEmailsFromSender(sender: string): Promise<void> {
  const client = new ImapFlow({
    host: 'imap.mail.yahoo.com',
    port: 993,
    secure: true,
    auth: {
      user: process.env.IMAP_USER!,
      pass: process.env.IMAP_PASS!,
    }
  });

  await client.connect();
  const lock = await client.getMailboxLock('INBOX');

  try {
    for await (const message of client.fetch(
      { from: sender }, { source: true })) {
      const parsed: ParsedMail = await simpleParser(message.source);

      console.log('From:', parsed.from?.text);
      console.log('Subject:', parsed.subject);
    }
  } finally {
    lock.release();
    await client.logout();
  }
}


fetchEmailsFromSenders(allowedSenders);
