'use server';

export async function verifyRecaptcha(token: string) {
  const res = await fetch(
    `https://recaptchaenterprise.googleapis.com/v1/projects/redbird-counseling/assessments?key=${process.env.RECAPTCHA_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        event: {
          token,
          expectedAction: 'Send Message',
          siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        }
      })
    }
  );

  return res.json();
}
