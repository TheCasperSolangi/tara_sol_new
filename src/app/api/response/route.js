import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_cYYUqzNK_T6No6EdYZqd6mZ2gt4KAhBMo');

// Replace with your actual business email
const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'naveeddsolangi@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Tara Solutions <responses@ebadgeid.com>';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, course, technology, category, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !course) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
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

    const subject = `Course Inquiry: ${course}`;

    // Send confirmation email to user
    const userEmailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Thank You for Your Course Inquiry - ${course}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Your Course Inquiry</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Thank You for Your Course Inquiry!</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          Dear <strong>${fullName}</strong>,
                        </p>
                        
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          Thank you for your interest in our <strong>${course}</strong> course. We've received your inquiry and our team will contact you shortly to discuss the next steps.
                        </p>
                        
                        <!-- Course Details Box -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
                          <tr>
                            <td style="padding: 24px;">
                              <h2 style="margin: 0 0 16px; color: #1f2937; font-size: 18px; font-weight: 600;">Course Details</h2>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px;">Course:</span>
                                <strong style="color: #1f2937; font-size: 14px;">${course}</strong>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px;">Technology:</span>
                                <strong style="color: #1f2937; font-size: 14px;">${technology}</strong>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px;">Category:</span>
                                <strong style="color: #1f2937; font-size: 14px;">${category}</strong>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 100px; color: #6b7280; font-size: 14px;">Phone:</span>
                                <strong style="color: #1f2937; font-size: 14px;">${phone}</strong>
                              </div>
                              
                              ${message && message !== 'No additional message provided' ? `
                              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                <span style="color: #6b7280; font-size: 14px; display: block; margin-bottom: 8px;">Your Message:</span>
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                              </div>
                              ` : ''}
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          One of our education specialists will contact you within 24 hours to discuss:
                        </p>
                        
                        <ul style="margin: 0 0 20px; padding-left: 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                          <li>Course schedule and availability</li>
                          <li>Pricing and payment options</li>
                          <li>Prerequisites and skill assessment</li>
                          <li>Career opportunities after completion</li>
                        </ul>
                        
                        <!-- Stats -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                          <tr>
                            <td style="width: 33%; padding: 20px; background-color: #eff6ff; border-radius: 12px; text-align: center;">
                              <div style="color: #2563eb; font-size: 24px; font-weight: bold; margin-bottom: 4px;">&lt; 24h</div>
                              <div style="color: #6b7280; font-size: 14px;">Response Time</div>
                            </td>
                            <td style="width: 10px;"></td>
                            <td style="width: 33%; padding: 20px; background-color: #f0fdf4; border-radius: 12px; text-align: center;">
                              <div style="color: #16a34a; font-size: 24px; font-weight: bold; margin-bottom: 4px;">Flexible</div>
                              <div style="color: #6b7280; font-size: 14px;">Scheduling</div>
                            </td>
                            <td style="width: 10px;"></td>
                            <td style="width: 33%; padding: 20px; background-color: #fef7cd; border-radius: 12px; text-align: center;">
                              <div style="color: #d97706; font-size: 24px; font-weight: bold; margin-bottom: 4px;">Expert</div>
                              <div style="color: #6b7280; font-size: 14px;">Instructors</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center;">
                        <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px;">
                          <strong style="color: #1f2937;">Tara Solutions - Digital Education</strong><br>
                          Ave 13 y Calle 7, San José, Costa Rica
                        </p>
                        
                        <div style="margin: 20px 0;">
                          <a href="https://instagram.com/tara_solutions" style="display: inline-block; margin: 0 8px; text-decoration: none; color: #6b7280; font-size: 14px;">Instagram</a>
                          <a href="https://www.facebook.com/profile.php?id=61552120787685" style="display: inline-block; margin: 0 8px; text-decoration: none; color: #6b7280; font-size: 14px;">Facebook</a>
                          <a href="https://www.linkedin.com/company/tarasolutions-cr/" style="display: inline-block; margin: 0 8px; text-decoration: none; color: #6b7280; font-size: 14px;">LinkedIn</a>
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
      from: FROM_EMAIL,
      to: BUSINESS_EMAIL,
      subject: `New Course Inquiry: ${course}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Course Inquiry</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🎓 New Course Inquiry</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 24px; color: #374151; font-size: 16px; line-height: 1.6;">
                          You've received a new course inquiry from your website.
                        </p>
                        
                        <!-- Student Information -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 16px; background-color: #eff6ff; border-left: 4px solid #2563eb; border-radius: 8px;">
                              <h2 style="margin: 0 0 16px; color: #1e40af; font-size: 18px; font-weight: 600;">Student Information</h2>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 600;">Full Name:</span>
                                <span style="color: #1f2937; font-size: 14px;">${fullName}</span>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 600;">Email:</span>
                                <a href="mailto:${email}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${email}</a>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 600;">Phone:</span>
                                <a href="tel:${phone}" style="color: #2563eb; font-size: 14px; text-decoration: none;">${phone}</a>
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- Course Information -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 16px; background-color: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 8px;">
                              <h2 style="margin: 0 0 16px; color: #166534; font-size: 18px; font-weight: 600;">Course Information</h2>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 600;">Course:</span>
                                <strong style="color: #1f2937; font-size: 14px;">${course}</strong>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 600;">Technology:</span>
                                <span style="color: #1f2937; font-size: 14px;">${technology}</span>
                              </div>
                              
                              <div style="margin-bottom: 12px;">
                                <span style="display: inline-block; width: 120px; color: #6b7280; font-size: 14px; font-weight: 600;">Category:</span>
                                <span style="color: #1f2937; font-size: 14px;">${category}</span>
                              </div>
                            </td>
                          </tr>
                        </table>
                        
                        <!-- Message -->
                        ${message && message !== 'No additional message provided' ? `
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                          <tr>
                            <td style="padding: 16px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
                              <h3 style="margin: 0 0 12px; color: #1f2937; font-size: 16px; font-weight: 600;">Student's Message:</h3>
                              <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                            </td>
                          </tr>
                        </table>
                        ` : ''}
                        
                        <!-- Action Buttons -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                          <tr>
                            <td align="center" style="padding: 0 10px;">
                              <a href="mailto:${email}?subject=Re: Course Inquiry - ${encodeURIComponent(course)}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3); margin: 0 8px;">
                                Reply to Student
                              </a>
                              <a href="tel:${phone}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px rgba(22, 163, 74, 0.3); margin: 0 8px;">
                                Call Student
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 24px 0 0; padding-top: 24px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; text-align: center;">
                          Inquiry received on ${new Date().toLocaleString('en-US', { 
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
                          This inquiry was submitted through the Tara Solutions courses platform
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