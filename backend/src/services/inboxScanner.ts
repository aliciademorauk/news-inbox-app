import { simpleParser, ParsedMail } from 'mailparser';
import { createImapClient } from './imapClient';
import { NewsEmailSchema } from '../schemas/newsEmail.schema';
import { saveNewsEmail } from '../db/newsEmailRepository';

// this will be set by user on frontend form
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
  const client = createImapClient();
  await client.connect();
  const lock = await client.getMailboxLock('INBOX');

  try {
    for await (const message of client.fetch(
      { from: sender }, { source: true })) {
      const parsed: ParsedMail = await simpleParser(message.source);

      const data = {
        sender: parsed.from?.value[0]?.address ?? 'unknown@example.com',
        subject: parsed.subject,
        title: parsed.subject, // placeholder... needs to come from headings in parsed.html
        summary: parsed.text, // placeholder... needs to come from p tags in parsed.html
        receivedAt: parsed.date,
      }

      const validated = NewsEmailSchema.safeParse(data);

      if (!validated.success) {
        console.error('Invalid email data:', validated.error.flatten().fieldErrors);
        continue;
      }

      await saveNewsEmail(validated.data);
    }
  } finally {
    lock.release();
    await client.logout();
  }
}

// fetchEmailsFromSenders(allowedSenders);
