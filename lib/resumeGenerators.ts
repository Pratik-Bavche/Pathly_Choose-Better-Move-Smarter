interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  education: { school: string; degree: string; year: string }[];
  experience: { company: string; role: string; duration: string; desc: string }[];
  skills: string[];
}

export const generateResumeHtml = (data: ResumeData, templateId: string) => {
  const { name, email, phone, location, summary, education, experience, skills } = data;

  const getStyle = (id: string) => {
    switch (id) {
      case 'modern':
        return `
          body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.6; }
          .header { background: #0d47a1; color: white; padding: 40px; text-align: center; }
          .container { padding: 40px; }
          h1 { margin: 0; font-size: 32px; text-transform: uppercase; letter-spacing: 2px; }
          .contact { margin-top: 10px; font-size: 14px; opacity: 0.9; }
          h2 { color: #0d47a1; border-bottom: 2px solid #0d47a1; padding-bottom: 5px; margin-top: 30px; font-size: 18px; }
          .item { margin-bottom: 20px; }
          .item-title { font-weight: bold; font-size: 16px; display: flex; justify-content: space-between; }
          .item-sub { color: #666; font-style: italic; }
          .skills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px; }
          .skill-tag { background: #e3f2fd; color: #0d47a1; padding: 5px 12px; border-radius: 20px; font-size: 13px; }
        `;
      case 'minimal':
        return `
          body { font-family: 'Georgia', serif; color: #111; max-width: 800px; margin: auto; }
          .header { border-bottom: 1px solid #000; padding: 40px 0; text-align: left; }
          .container { padding: 30px 0; }
          h1 { font-size: 40px; font-weight: 300; }
          h2 { font-size: 14px; text-transform: uppercase; letter-spacing: 3px; margin-top: 40px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
          .item-title { font-weight: bold; }
          .skill-tag { margin-right: 15px; display: inline-block; }
        `;
      case 'creative':
        return `
          body { font-family: 'Arial', sans-serif; display: flex; min-height: 100vh; margin: 0; }
          .sidebar { width: 30%; background: #6a1b9a; color: white; padding: 40px 20px; }
          .main { width: 70%; padding: 40px; }
          .sidebar h1 { font-size: 24px; margin-bottom: 20px; }
          .sidebar h3 { font-size: 14px; text-transform: uppercase; margin-top: 30px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 5px; }
          .main h2 { color: #6a1b9a; border-left: 5px solid #6a1b9a; padding-left: 15px; }
          .item { margin-bottom: 25px; }
        `;
      case 'corporate':
        return `
          body { font-family: 'Verdana', sans-serif; background: #f4f4f4; padding: 40px; }
          .paper { background: white; padding: 60px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { border-left: 10px solid #263238; padding-left: 20px; margin-bottom: 40px; }
          h1 { color: #263238; font-size: 36px; }
          h2 { background: #263238; color: white; padding: 8px 15px; font-size: 16px; }
          .item-title { color: #263238; border-bottom: 1px solid #ccc; margin-bottom: 5px; }
        `;
      case 'elegant':
        return `
          body { font-family: 'Times New Roman', serif; text-align: center; }
          .header { padding-bottom: 20px; border-bottom: 3px double #b71c1c; margin-bottom: 30px; }
          h1 { color: #b71c1c; font-size: 42px; font-weight: normal; }
          h2 { font-variant: small-caps; color: #b71c1c; font-size: 22px; margin-top: 30px; }
          .item { text-align: left; margin: 20px 0; }
        `;
      case 'sleek':
        return `
          body { background: #1a1a1a; color: #eee; font-family: sans-serif; padding: 50px; }
          .header { border-bottom: 1px solid #444; padding-bottom: 30px; }
          h1 { color: #fff; text-shadow: 2px 2px #000; }
          h2 { color: #00e676; text-transform: uppercase; letter-spacing: 1px; }
          .skill-tag { border: 1px solid #333; padding: 5px 10px; background: #222; }
        `;
      case 'vibrant':
        return `
          body { font-family: 'Trebuchet MS', sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 30px; }
          .card { background: white; border-radius: 20px; padding: 40px; overflow: hidden; }
          .header { background: #00c853; color: white; margin: -40px -40px 40px -40px; padding: 40px; transform: skewY(-2deg); }
          h1 { transform: skewY(2deg); font-size: 34px; }
          h2 { color: #00c853; }
        `;
      case 'professional':
        return `
          body { font-family: 'Calibri', sans-serif; padding: 40px; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1565c0; padding-bottom: 20px; }
          h1 { color: #1565c0; margin: 0; }
          h2 { color: #1565c0; background: #f0f4f8; padding: 5px 10px; border-radius: 4px; }
          .item { border-left: 2px solid #1565c0; padding-left: 15px; margin-bottom: 20px; }
        `;
      case 'executive':
        return `
          body { font-family: 'Garamond', serif; color: #444; padding: 60px; border: 20px solid #ff8f00; min-height: 100%; box-sizing: border-box; }
          h1 { color: #ff8f00; text-align: center; font-size: 48px; }
          .contact { text-align: center; border-bottom: 1px solid #ff8f00; padding-bottom: 20px; margin-bottom: 40px; }
          h2 { border-bottom: 2px solid #ff8f00; display: inline-block; }
          .item-title { color: #222; font-style: italic; }
        `;
      case 'tech':
        return `
          body { font-family: 'Courier New', monospace; background: #fafafa; padding: 20px; }
          pre { background: #fff; padding: 30px; border: 1px solid #00bcd4; box-shadow: 5px 5px 0 #00bcd4; }
          h1 { color: #00bcd4; }
          .code-comment { color: #999; }
          h2::before { content: '> '; }
        `;
      default:
        return `body { font-family: sans-serif; padding: 40px; }`;
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
        <style>
          ${getStyle(templateId)}
          ${templateId === 'tech' ? 'body { font-family: monospace; }' : ''}
        </style>
      </head>
      <body>
        ${templateId === 'corporate' ? '<div class="paper">' : ''}
        ${templateId === 'vibrant' ? '<div class="card">' : ''}
        ${templateId === 'creative' ? '<div class="sidebar"><h1>' + name + '</h1><div class="contact">' + email + '<br>' + phone + '<br>' + location + '</div><h3>Skills</h3><div class="skills">' + skills.map(s => `<div class="skill-tag">${s}</div>`).join('') + '</div></div><div class="main">' : `
          <div class="header">
            <h1>${name || 'Your Name'}</h1>
            <div class="contact">
              ${email} | ${phone} | ${location}
            </div>
          </div>
          <div class="container">
        `}

        <section>
          <h2>Professional Summary</h2>
          <p>${summary}</p>
        </section>

        ${experience.length > 0 ? `
          <section>
            <h2>Work Experience</h2>
            ${experience.map(exp => `
              <div class="item">
                <div class="item-title">
                  <span>${exp.role}</span>
                  <span>${exp.duration}</span>
                </div>
                <div class="item-sub">${exp.company}</div>
                <p>${exp.desc || ''}</p>
              </div>
            `).join('')}
          </section>
        ` : ''}

        <section>
          <h2>Education</h2>
          ${education.map(edu => `
            <div class="item">
              <div class="item-title">
                <span>${edu.degree}</span>
                <span>${edu.year}</span>
              </div>
              <div class="item-sub">${edu.school}</div>
            </div>
          `).join('')}
        </section>

        ${templateId !== 'creative' ? `
          <section>
            <h2>Skills</h2>
            <div class="skills">
              ${skills.map(s => s ? `<span class="skill-tag">${s}</span>` : '').join('')}
            </div>
          </section>
        ` : ''}

        ${templateId === 'creative' ? '</div>' : '</div>'}
      </body>
    </html>
  `;

  return htmlContent;
};
