import * as fs from 'fs';
import * as path from 'path';
import prettier from 'prettier';
import { render } from '@react-email/components';
import { EmailConfirmChange } from './email-confirm-change';
import { EmailVerify } from './email-verify';
import { PasswordReset } from './password-reset';
import { SignInPasswordless } from './signin-passwordless';
import { SignInOTP } from './signin-otp';

async function renderEmails(targetLocale: string) {
  const emails = [
    {
      name: 'email-confirm-change',
      body: await prettier.format(await render(EmailConfirmChange()), {
        parser: 'html',
        printWidth: 500,
      }),
      subject: '<subject>',
    },
    {
      name: 'email-verify',
      body: await prettier.format(await render(EmailVerify()), {
        parser: 'html',
        printWidth: 500,
      }),
      subject: '<subject>',
    },
    {
      name: 'password-reset',
      body: await prettier.format(await render(PasswordReset()), {
        parser: 'html',
        printWidth: 500,
      }),
      subject: '<subject>',
    },
    {
      name: 'signin-passwordless',
      body: await prettier.format(await render(SignInPasswordless()), {
        parser: 'html',
        printWidth: 500,
      }),
      subject: '<subject>',
    },
    {
      name: 'signin-otp',
      body: await prettier.format(await render(SignInOTP()), {
        parser: 'html',
        printWidth: 500,
      }),
      subject: '<subject>',
    },
  ];

  const targetFolder = path.resolve(`./email-templates/${targetLocale}`);

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  emails.forEach((email) => {
    if (!fs.existsSync(`${targetFolder}/${email.name}`)) {
      fs.mkdirSync(`${targetFolder}/${email.name}`, { recursive: true });
    }

    fs.writeFileSync(`${targetFolder}/${email.name}/body.html`, email.body);
    fs.writeFileSync(
      `${targetFolder}/${email.name}/subject.txt`,
      email.subject
    );
  });
}

const args = process.argv.slice(2);
const locale = args[0];

if (!locale) {
  console.error('Please provide a locale for the emails.');
  process.exit(1);
}

renderEmails(locale).catch((err) => {
  console.error('Error rendering emails:', err);
  process.exit(1);
});
