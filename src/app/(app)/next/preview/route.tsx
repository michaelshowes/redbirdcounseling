import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

import configPromise from '@payload-config';
import type { CollectionSlug, PayloadRequest } from 'payload';
import { getPayload } from 'payload';

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  } & Request
): Promise<Response> {
  const payload = await getPayload({ config: configPromise });

  const { searchParams } = new URL(req.url);

  const path = searchParams.get('path');
  const collection = searchParams.get('collection') as CollectionSlug;
  const slug = searchParams.get('slug');
  const previewSecret = searchParams.get('previewSecret');

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('You are not allowed to preview this page', {
      status: 403
    });
  }

  if (!path || !collection || !slug) {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Preview Error</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 2rem; text-align: center; }
            .container { max-width: 600px; margin: 0 auto; }
            .error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 1rem; border-radius: 0.5rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error">
              <h2>Preview Not Available</h2>
              <p>You need to save the document for the first time before previewing it.</p>
              <p>Please save your changes in the admin panel and refresh this page to see the preview.</p>
            </div>
          </div>
        </body>
      </html>
      `,
      {
        status: 400,
        headers: { 'Content-Type': 'text/html' }
      }
    );
  }

  if (!path.startsWith('/')) {
    return new Response(
      'This endpoint can only be used for relative previews',
      { status: 500 }
    );
  }

  let user;

  try {
    user = await payload.auth({
      req: req as unknown as PayloadRequest,
      headers: req.headers
    });
  } catch (error) {
    payload.logger.error(
      { err: error },
      'Error verifying token for live preview'
    );
    return new Response('You are not allowed to preview this page', {
      status: 403
    });
  }

  const draft = await draftMode();

  if (!user) {
    draft.disable();
    return new Response('You are not allowed to preview this page', {
      status: 403
    });
  }

  // You can add additional checks here to see if the user is allowed to preview this page

  draft.enable();

  redirect(path);
}
