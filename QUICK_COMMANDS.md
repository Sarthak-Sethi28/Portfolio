# ⚡ Quick Command Reference

## 📄 Update Resume (One Command)

```bash
# From your portfolio folder, run:
cp ~/Downloads/YourNewResume.pdf public/resume/Sarthak_Sethi_Resume.pdf
```

---

## 🎬 Add All Videos (One by One)

```bash
# Replace ~/Videos/ with wherever your videos are stored

cp ~/Videos/muse.mp4 public/assets/projects/videos/muse-sketch-studio.mp4
cp ~/Videos/uwchatbot.mp4 public/assets/projects/videos/uw-chatbot.mp4
cp ~/Videos/customchatbot.mp4 public/assets/projects/videos/custom-chatbot.mp4
cp ~/Videos/lowstock.mp4 public/assets/projects/videos/low-stock-alert.mp4
cp ~/Videos/portfolio.mp4 public/assets/projects/videos/portfolio.mp4
cp ~/Videos/caraksha.mp4 public/assets/projects/videos/caraksha.mp4
cp ~/Videos/gim.mp4 public/assets/projects/videos/gim.mp4
cp ~/Videos/imoney.mp4 public/assets/projects/videos/imoney.mp4
```

---

## 🖼️ Add All Images (One by One)

```bash
# Replace ~/Pictures/ with wherever your screenshots are stored

cp ~/Pictures/muse.png public/assets/projects/images/muse-sketch-studio.png
cp ~/Pictures/uwchatbot.png public/assets/projects/images/uw-chatbot.png
cp ~/Pictures/customchatbot.png public/assets/projects/images/custom-chatbot.png
cp ~/Pictures/lowstock.png public/assets/projects/images/low-stock-alert.png
cp ~/Pictures/portfolio.png public/assets/projects/images/portfolio.png
cp ~/Pictures/caraksha.png public/assets/projects/images/caraksha.png
cp ~/Pictures/gim.png public/assets/projects/images/gim.png
cp ~/Pictures/imoney.png public/assets/projects/images/imoney.png
```

---

## 🚀 Push to GitHub

```bash
# Add all changes
git add .

# Commit
git commit -m "Added project media and updated resume"

# Push to GitHub
git push origin main
```

---

## 📁 Check What's Missing

```bash
# See what videos you have
ls -lh public/assets/projects/videos/

# See what images you have
ls -lh public/assets/projects/images/

# Check resume
ls -lh public/resume/
```

---

## 🧹 If You Need to Remove a File

```bash
# Remove a video
rm public/assets/projects/videos/filename.mp4

# Remove an image
rm public/assets/projects/images/filename.png
```

