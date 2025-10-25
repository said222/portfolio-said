import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  try {
    // Check environment variables
    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL
    const toEmail = process.env.RESEND_TO_EMAIL

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'RESEND_API_KEY not found',
        config: {
          hasApiKey: false,
          hasFromEmail: !!fromEmail,
          hasToEmail: !!toEmail
        }
      }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    // Test email configuration
    const testEmail = {
      from: fromEmail || 'Portfolio <onboarding@resend.dev>',
      to: [toEmail || 'contact@said-aazri.com'],
      subject: 'Test Email - Portfolio Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>✅ Email Configuration Test</h2>
          <p>This is a test email to verify your Resend configuration.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>From:</strong> ${fromEmail || 'Portfolio <onboarding@resend.dev>'}</p>
          <p><strong>To:</strong> ${toEmail || 'contact@said-aazri.com'}</p>
          <p>If you received this email, your configuration is working correctly! 🎉</p>
        </div>
      `,
    }

    console.log('Testing email configuration:', {
      hasApiKey: !!apiKey,
      apiKeyPrefix: apiKey.substring(0, 10) + '...',
      from: testEmail.from,
      to: testEmail.to
    })

    const { data, error } = await resend.emails.send(testEmail)

    if (error) {
      console.error('Resend test error:', error)
      return NextResponse.json({
        success: false,
        error: error.message || 'Unknown error',
        details: error,
        config: {
          hasApiKey: !!apiKey,
          apiKeyPrefix: apiKey.substring(0, 10) + '...',
          fromEmail: testEmail.from,
          toEmail: testEmail.to
        }
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: '✅ Test email sent successfully!',
      messageId: data?.id,
      config: {
        hasApiKey: !!apiKey,
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        fromEmail: testEmail.from,
        toEmail: testEmail.to
      }
    })

  } catch (error: any) {
    console.error('Test email error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      stack: error.stack
    }, { status: 500 })
  }
}