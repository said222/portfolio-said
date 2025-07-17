import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if all required environment variables are set
    const requiredEnvVars = [
      'BREVO_API_KEY',
      'BREVO_SENDER_EMAIL',
      'BREVO_SENDER_NAME',
      'BREVO_RECIPIENT_EMAIL'
    ]

    const missingVars = requiredEnvVars.filter(varName => !process.env[varName])
    
    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        missingVars,
        message: 'Please check your .env.local file and restart your development server'
      }, { status: 400 })
    }

    // Test API connection using Brevo REST API
    const response = await fetch('https://api.brevo.com/v3/account', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY!
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json({
          success: false,
          error: 'Invalid API key',
          message: 'Please check your BREVO_API_KEY in .env.local'
        }, { status: 401 })
      }
      
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({
        success: false,
        error: 'Brevo API connection failed',
        message: `HTTP ${response.status}: ${response.statusText}`,
        details: errorData
      }, { status: response.status })
    }

    const accountInfo = await response.json()
    
    return NextResponse.json({
      success: true,
      message: '✅ Brevo configuration is working perfectly!',
      accountInfo: {
        email: accountInfo.email,
        firstName: accountInfo.firstName,
        lastName: accountInfo.lastName,
        companyName: accountInfo.companyName,
        plan: accountInfo.plan?.type || 'Free'
      },
      config: {
        senderEmail: process.env.BREVO_SENDER_EMAIL,
        senderName: process.env.BREVO_SENDER_NAME,
        recipientEmail: process.env.BREVO_RECIPIENT_EMAIL,
        apiKeySet: !!process.env.BREVO_API_KEY,
        apiKeyPrefix: process.env.BREVO_API_KEY?.substring(0, 10) + '...'
      },
      nextSteps: [
        'Your Brevo integration is ready to use!',
        'Test the contact form on your portfolio',
        'Check your email for incoming messages'
      ]
    })

  } catch (error: any) {
    console.error('Brevo test error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Connection failed',
      message: error.message || 'Unable to connect to Brevo API',
      troubleshooting: [
        'Check your internet connection',
        'Verify your API key is correct',
        'Ensure all environment variables are set',
        'Restart your development server'
      ]
    }, { status: 500 })
  }
}