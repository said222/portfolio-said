# Brevo Email Integration Setup Guide

This guide will help you set up Brevo (formerly Sendinblue) email service for your portfolio contact form using the REST API.

## ✅ Fixed Integration Issues

The integration now uses Brevo's REST API directly instead of the SDK, which resolves module resolution issues and provides better reliability.

## 🚀 Quick Setup Steps

### 1. Create a Brevo Account
1. Go to [Brevo.com](https://www.brevo.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key
1. Log into your Brevo dashboard
2. Go to **Settings** → **API Keys**
3. Click **Generate a new API key**
4. Give it a name like "Portfolio Contact Form"
5. Copy the generated API key

### 3. Configure Environment Variables
Update your `.env.local` file with your actual values:

```env
# Brevo API Configuration
BREVO_API_KEY=xkeysib-your-actual-api-key-here
BREVO_SENDER_EMAIL=your-verified-email@yourdomain.com
BREVO_SENDER_NAME=Your Full Name
BREVO_RECIPIENT_EMAIL=where-you-want-to-receive-messages@yourdomain.com
```

### 4. Verify Your Sender Email
**Important:** You must verify your sender email in Brevo:

1. In Brevo dashboard, go to **Settings** → **Senders & IP**
2. Click **Add a sender**
3. Enter your email address and name
4. Check your email and click the verification link
5. Wait for approval (usually instant for personal emails)

### 5. Install Dependencies
```bash
npm install
```

### 6. Test the Integration
1. Start your development server:
   ```bash
   npm run dev
   ```
2. Go to `http://localhost:3000`
3. Scroll to the contact form
4. Fill out and submit the form
5. Check your email for the message

## 📧 Email Features

### What You Get:
- **Beautiful HTML emails** with your branding
- **Automatic reply-to** set to the sender's email
- **Professional formatting** with contact details
- **Error handling** with user-friendly messages
- **Loading states** and success notifications
- **Email validation** and spam protection

### Email Template Includes:
- Sender's name and email
- Message content with proper formatting
- Timestamp
- Professional styling
- Direct reply capability

## 🔧 Customization Options

### Modify Email Template
Edit `app/api/contact/route.ts` to customize:
- Email subject line
- HTML template design
- Additional fields
- Validation rules

### Change Notification Style
Edit `app/layout.tsx` to modify toast notifications:
- Position
- Duration
- Colors
- Animation

### Add More Fields
To add fields like phone number or company:

1. Update the form in `app/components/Contact.tsx`
2. Add validation in `app/api/contact/route.ts`
3. Include in the email template

## 🛡️ Security Features

- **API key protection** (server-side only)
- **Input validation** and sanitization
- **Rate limiting** ready (add middleware if needed)
- **CORS protection** built-in with Next.js
- **XSS protection** with proper escaping

## 📊 Brevo Free Plan Limits

- **300 emails per day**
- **Unlimited contacts**
- **Email templates**
- **Basic analytics**

Perfect for portfolio contact forms!

## 🚨 Troubleshooting

### Common Issues:

**"Authentication failed"**
- Check your API key is correct
- Ensure no extra spaces in `.env.local`

**"Sender not verified"**
- Verify your sender email in Brevo dashboard
- Wait for approval (can take a few minutes)

**"Invalid email format"**
- Check the email addresses in your `.env.local`
- Ensure they're properly formatted

**Form not submitting**
- Check browser console for errors
- Verify all environment variables are set
- Restart your development server after changing `.env.local`

### Debug Mode:
Check the server console for detailed error messages when testing the form.

## 🎯 Production Deployment

### Vercel:
1. Add environment variables in Vercel dashboard
2. Deploy your app
3. Test the contact form on production

### Other Platforms:
Ensure environment variables are properly set in your hosting platform.

## 📈 Next Steps

Consider upgrading to Brevo's paid plan for:
- Higher email limits
- Advanced analytics
- SMS capabilities
- Marketing automation

---

**Need help?** Check the [Brevo API documentation](https://developers.brevo.com/) or contact their support team.