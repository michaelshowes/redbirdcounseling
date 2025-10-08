'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormSchema, contactFormSchema } from '@/lib/formSchemas';
import { verifyRecaptcha } from '@/server/recaptcha';

export default function ContactForm() {
  const [message, setMessage] = useState('');
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);
  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  async function handleSubmit(values: ContactFormSchema) {
    // if (!recaptchaVerified) {
    //   setMessage('Recaptcha verification failed. Please try again.');
    // }

    fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(values)
    });
  }

  async function onChange(token: string) {
    const result = await verifyRecaptcha(token);
    if (result.riskAnalysis.score >= 0.5) {
      setMessage('');
      setRecaptchaVerified(true);
    } else {
      setMessage('Recaptcha verification failed. Please try again.');
    }
  }

  console.log({
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    RECAPTCHA_API_KEY: process.env.RECAPTCHA_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY
  });

  return (
    <div className='mx-auto max-w-2xl rounded-lg bg-gray-50 p-8'>
      <Form {...form}>
        <form
          className='space-y-6'
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Your name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='example@mail.com'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='(555) 555-5555'
                        type='tel'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='subject'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Subject'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Please type your message here...'
                      className='min-h-[120px] resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => onChange(token as string)}
          />
          {message && <div className='text-redbird text-sm'>{message}</div>}
          <div className='pt-4'>
            <Button type='submit'>Send message</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
