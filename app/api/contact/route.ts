import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
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
    if (!process.env.BREVO_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Create email payload for Brevo API
    const emailPayload = {
      sender: {
        name: process.env.BREVO_SENDER_NAME || 'Portfolio Contact',
        email: process.env.BREVO_SENDER_EMAIL
      },
      to: [{
        email: process.env.BREVO_RECIPIENT_EMAIL,
        name: process.env.BREVO_SENDER_NAME || 'Portfolio Owner'
      }],
      replyTo: {
        email: email,
        name: name
      },
      subject: `New Contact Form Message from ${name}`,
      htmlContent: `
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
      `
    }

    // Send email using Brevo REST API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify(emailPayload)
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Brevo API error:', response.status, errorData)
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Email service authentication failed. Please check your API key.' },
          { status: 500 }
        )
      } else if (response.status === 400) {
        return NextResponse.json(
          { error: 'Invalid email data. Please check your configuration.' },
          { status: 500 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Email sent successfully:', result.messageId)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! I\'ll get back to you soon.',
        messageId: result.messageId
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