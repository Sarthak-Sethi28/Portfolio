# 📁 Portfolio Upload Guide

## 🎯 Quick Start

Your portfolio is now set up to display **videos, images, and your resume**! Follow this guide to add your media files.

---

## 📄 1. How to Update Your Resume

### Location:
```
/Users/SarthakSethi/portfolio/public/resume/Sarthak_Sethi_Resume.pdf
```

### Steps:
1. Save your new resume as **`Sarthak_Sethi_Resume.pdf`**
2. Replace the existing file in `public/resume/` folder
3. **That's it!** The website will automatically use the new resume ✅

### Current Resume Link:
- Download button links to: `/resume/Sarthak_Sethi_Resume.pdf`
- Automatically served from the `public` folder

---

## 🎬 2. How to Add Project Videos

### Location:
```
/Users/SarthakSethi/portfolio/public/assets/projects/videos/
```

### File Naming (IMPORTANT):
Use these EXACT names for your video files:

| Project | Video Filename |
|---------|----------------|
| Muse Sketch Studio | `muse-sketch-studio.mp4` |
| University of Waterloo Chatbot | `uw-chatbot.mp4` |
| Custom Chatbot (Danier) | `custom-chatbot.mp4` |
| Low-Stock Alert System | `low-stock-alert.mp4` |
| Personal Portfolio | `portfolio.mp4` |
| CarRaksha | `caraksha.mp4` |
| GIM - Guard in Motion | `gim.mp4` |
| iMoney | `imoney.mp4` |

### Steps:
1. Copy your video files to `public/assets/projects/videos/`
2. Rename them using the exact names above
3. Supported formats: `.mp4` (recommended), `.webm`, `.mov`
4. **Recommended**: Keep videos under 10MB for fast loading

### Example:
```bash
cp ~/Downloads/my_muse_demo.mp4 public/assets/projects/videos/muse-sketch-studio.mp4
```

---

## 🖼️ 3. How to Add Project Images

### Location:
```
/Users/SarthakSethi/portfolio/public/assets/projects/images/
```

### File Naming (IMPORTANT):
Use these EXACT names for your image files:

| Project | Image Filename |
|---------|----------------|
| Muse Sketch Studio | `muse-sketch-studio.png` |
| University of Waterloo Chatbot | `uw-chatbot.png` |
| Custom Chatbot (Danier) | `custom-chatbot.png` |
| Low-Stock Alert System | `low-stock-alert.png` |
| Personal Portfolio | `portfolio.png` |
| CarRaksha | `caraksha.png` |
| GIM - Guard in Motion | `gim.png` |
| iMoney | `imoney.png` |

### Steps:
1. Copy your screenshot/image to `public/assets/projects/images/`
2. Rename using exact names above
3. Supported formats: `.png` (recommended), `.jpg`, `.webp`
4. **Recommended**: 1920x1080 or smaller, optimized for web

### Example:
```bash
cp ~/Desktop/muse_screenshot.png public/assets/projects/images/muse-sketch-studio.png
```

---

## 🔒 4. How to Mark Projects as "Internal Tools"

### For Projects Without Public Demos

Some projects are internal company tools and can't be shared publicly. To mark them:

**Open:** `src/pages/Home.tsx`

**Find the project** in the `projects` array and change:
```typescript
isInternal: false  // Change this to true
```

### Example - Marking CompareIQ as Internal:
```typescript
{
  title: 'CompareIQ - Insurance Comparison Tool',
  // ... other fields ...
  isInternal: true,  // ✅ This will show "Internal Tool" badge
  videoUrl: '/assets/projects/videos/compareiq.mp4',  // Still show demo video!
  imageUrl: '/assets/projects/images/compareiq.png'
}
```

### What Changes:
- ✅ Shows **"🔒 Internal Tool"** badge
- ✅ GitHub button replaced with **"Internal Company Tool - No Public Demo Available"**
- ✅ You can still show videos/images!
- ✅ All other details remain visible

---

## 📧 5. EmailJS - Contact Form Setup

### ✅ ALREADY CONFIGURED!

Your EmailJS is set up and will work on GitHub/Vercel/anywhere:

**Config File:** `src/config/emailjs.ts`
```typescript
serviceId: "service_lbvvuwu"
templateId: "template_n3okbb4"
publicKey: "W-ZxqejtsOaOWG81D"
```

### These are PUBLIC keys - safe to push to GitHub! ✅

### How It Works:
1. User fills contact form on your website
2. EmailJS sends email directly from their browser
3. Email arrives at your configured email address
4. **No backend server needed!**
5. **Works everywhere** (localhost, GitHub Pages, Vercel, Netlify, etc.)

### Test Your Contact Form:
1. Go to your portfolio
2. Scroll to Contact section
3. Fill out the form
4. Click "Send Message"
5. Check your email! 📨

---

## 🚀 6. Push to GitHub

Once you've added all your files:

```bash
# Add all files
git add .

# Commit
git commit -m "Added project videos, images, and updated resume"

# Push to GitHub
git push origin main
```

### Your EmailJS will continue working! ✅

---

## 📊 What Gets Displayed?

### If You Have a Video:
- Video player with controls
- Image used as poster/thumbnail
- Auto-plays when user clicks expand

### If You Only Have an Image:
- Full-size image preview
- Clickable to expand

### If You Have Neither:
- No media shown
- Just project details and GitHub link
- (This is fine for some projects!)

---

## 🎨 Media Display Priority

The website displays media in this order:
1. **Video** (if available) + Image as poster
2. **Image** (if no video)
3. **Nothing** (if neither - still looks good!)

---

## 🔧 Troubleshooting

### Video Not Showing?
- ✅ Check filename matches exactly (case-sensitive!)
- ✅ Check file is in correct folder: `public/assets/projects/videos/`
- ✅ Check file format is `.mp4`
- ✅ Try refreshing the page (Ctrl+Shift+R / Cmd+Shift+R)

### Image Not Showing?
- ✅ Check filename matches exactly
- ✅ Check file is in correct folder: `public/assets/projects/images/`
- ✅ Check file format is `.png`, `.jpg`, or `.webp`

### Resume Not Updating?
- ✅ Clear browser cache
- ✅ Check filename is exactly: `Sarthak_Sethi_Resume.pdf`
- ✅ File must be in `public/resume/` folder

### Contact Form Not Working?
- ✅ Check browser console for errors
- ✅ Verify EmailJS dashboard is active
- ✅ Check you're not blocking popups/scripts

---

## 📝 Example: Adding a New Project (Optional)

Want to add more projects later? Here's the template:

```typescript
{
  title: 'Your Project Name',
  period: 'Location/Date',
  description: 'Brief description...',
  technologies: ['Tech1', 'Tech2', 'Tech3'],
  points: [
    'Key achievement 1',
    'Key achievement 2',
    'Key achievement 3'
  ],
  demoUrl: 'https://github.com/username/repo',
  videoUrl: '/assets/projects/videos/project-name.mp4',
  imageUrl: '/assets/projects/images/project-name.png',
  isInternal: false  // true if internal tool
}
```

---

## 🎯 Checklist Before Going Live

- [ ] Updated resume PDF
- [ ] Added all project videos (where available)
- [ ] Added all project images (where available)
- [ ] Marked internal projects with `isInternal: true`
- [ ] Tested contact form
- [ ] Tested all GitHub links
- [ ] Tested video playback
- [ ] Checked mobile responsiveness
- [ ] Pushed to GitHub
- [ ] Deployed to hosting (Vercel/Netlify)

---

## 🌟 Your Portfolio is Ready!

Everything is set up to work seamlessly:
- ✅ Resume downloads
- ✅ Videos play
- ✅ Images display
- ✅ Contact form sends emails
- ✅ Internal tools marked appropriately

Just add your media files and push to GitHub! 🚀

