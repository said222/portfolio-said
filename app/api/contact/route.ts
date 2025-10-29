import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, recaptchaToken } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate reCAPTCHA token
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification required' },
        { status: 400 }
      )
    }

    // Check if reCAPTCHA secret key is configured
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      return NextResponse.json(
        { error: 'reCAPTCHA service not configured' },
        { status: 500 }
      )
    }

    // Verify reCAPTCHA token with Google
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    })

    const recaptchaData = await recaptchaResponse.json()

    // Log reCAPTCHA response for debugging (remove in production)
    console.log('reCAPTCHA verification response:', recaptchaData)

    if (!recaptchaData.success) {
      const errorCodes = recaptchaData['error-codes'] || []
      console.error('reCAPTCHA verification failed:', errorCodes)

      // Provide more specific error messages
      if (errorCodes.includes('invalid-input-secret')) {
        return NextResponse.json(
          { error: 'reCAPTCHA configuration error. Please contact support.' },
          { status: 500 }
        )
      } else if (errorCodes.includes('timeout-or-duplicate')) {
        return NextResponse.json(
          { error: 'reCAPTCHA expired. Please try again.' },
          { status: 400 }
        )
      } else {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed. Please try again.' },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not found in environment variables')
      return NextResponse.json(
        { error: 'Email service not configured - missing API key' },
        { status: 500 }
      )
    }

    // Log configuration for debugging (remove sensitive info in production)
    console.log('Email configuration:', {
      hasApiKey: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10) + '...',
      fromEmail: process.env.RESEND_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
      toEmail: process.env.RESEND_TO_EMAIL || 'contact@said-aazri.com'
    })

    // Send email using Resend with proper format
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const toEmail = process.env.RESEND_TO_EMAIL || 'contact@said-aazri.com'

    const emailPayload = {
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Message</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc; border-left: 4px solid #3b82f6;">
            <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #475569;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 15px; background: #e0f2fe; border-radius: 8px;">
              <p style="margin: 0; color: #0369a1; font-size: 14px;">
                <strong>📧 Reply directly to this email to respond to ${name}</strong>
              </p>
            </div>
          </div>
          
          <div style="padding: 20px; text-align: center; color: #64748b; font-size: 12px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Sent on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    }

    console.log('Sending email with payload:', {
      from: emailPayload.from,
      to: emailPayload.to,
      subject: emailPayload.subject
    })

    const { data, error } = await resend.emails.send(emailPayload)
console.log('error.message:', error?.message)
    if (error) {
      console.error('Resend API error details:', {
        error,
        message: error.message,
        name: error.name
      })

      // Provide more specific error messages based on Resend error types
      if (error.message?.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid email service API key. Please check configuration.' },
          { status: 500 }
        )
      } else if (error.message?.includes('domain')) {
        return NextResponse.json(
          { error: 'Email domain not verified. Please verify your domain with Resend.' },
          { status: 500 }
        )
      } else if (error.message?.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        )
      } else {
        return NextResponse.json(
          { error: `Email service error: ${error.message || 'Unknown error'}` },
          { status: 500 }
        )
      }
    }

    console.log('Email sent successfully:', data?.id)

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        messageId: data?.id
      },
      { status: 200 }
    )

  } catch (error: any) {
    console.error('Error sending email:', error)

    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}