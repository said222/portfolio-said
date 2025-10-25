import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { recaptchaToken } = await request.json()

    // Check environment variables
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!siteKey || !secretKey) {
      return NextResponse.json({
        success: false,
        error: 'reCAPTCHA not configured',
        config: {
          siteKeySet: !!siteKey,
          secretKeySet: !!secretKey,
          siteKeyPrefix: siteKey ? siteKey.substring(0, 10) + '...' : 'Not set'
        }
      }, { status: 500 })
    }

    if (!recaptchaToken) {
      return NextResponse.json({
        success: false,
        error: 'No reCAPTCHA token provided'
      }, { status: 400 })
    }

    // Verify with Google
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${recaptchaToken}`,
    })

    const data = await response.json()

    return NextResponse.json({
      success: data.success,
      recaptchaResponse: data,
      timestamp: new Date().toISOString()
    })

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}