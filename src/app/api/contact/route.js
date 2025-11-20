import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_QHsVHHVM_5zY5rMWdyoLmDqsTboyiYX2b');

// Replace with your actual business email
const BUSINESS_EMAIL = 'info@tarasolutions-cr.com';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: 'Tara Solutions <leads@tarasolutions-cr.com>', // Replace with your verified domain
      to: email,
      subject: `Thank You for Contacting Us - ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting Us</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Thank You for Contacting Us!</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          Dear <strong>${fullName}</strong>,
                        </p>
                        
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          We've received your message and wanted to let you know that we're on it! Our team will review your inquiry and get back to you as soon as possible.
                        </p>
                        
                        <!-- Message Summary Box -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
                          <tr>
                            <td style="padding: 24px;">
                              <h2 style="margin: 0 0 16px; color: #1f2937; font-size: 18px; font-weight: 600;">Your Message Summary</h2>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 80px; color: #6b7280; font-size: 14px;">Subject:</span>
                                <strong style="color: #1f2937; font-size: 14px;">${subject}</strong>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 80px; color: #6b7280; font-size: 14px;">Phone:</span>
                                <strong style="color: #1f2937; font-size: 14px;">${phone}</strong>
                              </div>
                              
                              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                <span style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 8px;">Message:</span>
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          In the meantime, feel free to explore our website or connect with us on social media.
                        </p>
                        
                        <!-- Stats -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                          <tr>
                            <td style="width: 50%; padding: 20px; background-color: #eff6ff; border-radius: 12px; text-align: center;">
                              <div style="color: #2563eb; font-size: 24px; font-weight: bold; margin-bottom: 4px;">24/7</div>
                              <div style="color: #6b7280; font-size: 14px;">Support Available</div>
                            </td>
                            <td style="width: 10px;"></td>
                            <td style="width: 50%; padding: 20px; background-color: #f0fdf4; border-radius: 12px; text-align: center;">
                              <div style="color: #16a34a; font-size: 24px; font-weight: bold; margin-bottom: 4px;">&lt; 24h</div>
                              <div style="color: #6b7280; font-size: 14px;">Response Time</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
                        <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px;">
                          <strong style="color: #1f2937;">Tara Solutions</strong><br>
                          Ave 13 y Calle 7, San José, Costa Rica
                        </p>
                        
                        <div style="margin: 20px 0;">
                          <a href="https://instagram.com/tara_solutions" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style="width: 24px; height: 24px;">
                          </a>
                          <a href="https://www.facebook.com/profile.php?id=61552120787685" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" style="width: 24px; height: 24px;">
                          </a>
                          <a href="https://www.linkedin.com/company/tarasolutions-cr/" style="display: inline-block; margin: 0 8px; text-decoration: none;">
                            <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 24px; height: 24px;">
                          </a>
                        </div>
                        
                        <p style="margin: 16px 0 0; color: #9ca3af; font-size: 12px;">
                          © ${new Date().getFullYear()} Tara Solutions. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    // Send notification email to business
    const businessEmailPromise = resend.emails.send({
      from: 'Contact Form <responses@ebadgeid.com>', // Replace with your verified domain
      to: BUSINESS_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🔔 New Contact Form Submission</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 1.6;">
                          You've received a new message from your website contact form.
                        </p>
                        
                        <!-- Contact Details -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 16px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 8px;">
                              <h2 style="margin: 0 0 16px; color: #1e40af; font-size: 18px; font-weight: 600;">Contact Information</h2>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 600;">Name:</span>
                                <span style="color: #1f2937; font-size: 14px;">${fullName}</span>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 600;">Email:</span>
                                <a href="mailto:${email}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${email}</a>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 600;">Phone:</span>
                                <a href="tel:${phone}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${phone}</a>
                              </div>
                              
                              <div>
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px; font-weight: 600;">Subject:</span>
                                <span style="color: #1f2937; font-size: 14px; font-weight: 600;">${subject}</span>
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 16px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                              <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px; font-weight: 600;">Message:</h3>
                              <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Action Button -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                          <tr>
                            <td align="center">
                              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); color: #ffffff; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
                                Reply to ${fullName}
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 24px 0 0; padding-top: 24px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; text-align: center;">
                          Submitted on ${new Date().toLocaleString('en-US', { 
                            dateStyle: 'full', 
                            timeStyle: 'short' 
                          })}
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 20px 30px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
                        <p style="margin: 0; color: #6b7280; font-size: 12px;">
                          This email was sent from your Tara Solutions contact form
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    // Wait for both emails to send
    const [userEmailResult, businessEmailResult] = await Promise.all([
      userEmailPromise,
      businessEmailPromise,
    ]);

    console.log('User email sent:', userEmailResult);
    console.log('Business email sent:', businessEmailResult);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Emails sent successfully',
        userEmailId: userEmailResult.data?.id,
        businessEmailId: businessEmailResult.data?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send emails', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}