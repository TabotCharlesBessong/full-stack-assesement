// utils/emailTemplates.ts
export const assignmentTemplate = (
  trainerName: string,
  courseName: string,
  courseDate: Date
) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #4F46E5;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: #f8fafc;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      color: #1f2937;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Course Assignment Notification</h1>
    </div>
    <div class="content">
      <p>Dear ${trainerName},</p>
      <p>You have been assigned to conduct the following course:</p>
      <ul>
        <li><strong>Course Name:</strong> ${courseName}</li>
        <li><strong>Date:</strong> ${new Date(courseDate).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )}</li>
      </ul>
      <p>Please review the course details and ensure your availability for the scheduled date.</p>
      <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
      <p>Best regards,<br>Course Management Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>
`;

export const removalTemplate = (trainerName: string, courseName: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    .email-container {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #DC2626;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .content {
      background-color: #f8fafc;
      padding: 20px;
      border-radius: 0 0 5px 5px;
      color: #1f2937;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Course Assignment Removal</h1>
    </div>
    <div class="content">
      <p>Dear ${trainerName},</p>
      <p>This email is to inform you that you have been removed from the following course:</p>
      <p><strong>Course Name:</strong> ${courseName}</p>
      <p>If you believe this was done in error or have any questions, please contact the course management team.</p>
      <p>Best regards,<br>Course Management Team</p>
    </div>
    <div class="footer">
      <p>This is an automated message, please do not reply directly to this email.</p>
    </div>
  </div>
</body>
</html>
`;
