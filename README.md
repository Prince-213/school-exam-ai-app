# Online Exam Proctoring System - Next.js 15 Application

A secure online examination platform built with Next.js 15 that uses facial recognition technology to authenticate students and monitor exam sessions in real-time.

![Application Screenshot](Screenshot%202025-08-22%20040713.png)

## Overview

This application provides a secure online examination environment where students are authenticated using facial recognition technology and monitored during exams to prevent malpractice. The system uses FaceAPI.js to compare webcam footage with registered student faces and monitors activity throughout the exam session.

## Key Features

- 👤 Facial recognition authentication using FaceAPI.js
- 📝 Secure exam environment with real-time monitoring
- ⚠️ Activity monitoring with warning system
- 🎯 Three-strike policy for exam termination
- 📊 Matric number-based student identification
- 🔒 Secure exam session management

## Technology Stack

- **Frontend**: Next.js 15 with TypeScript
- **Facial Recognition**: FaceAPI.js
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Package Manager**: pnpm
- **Build Tool**: Next.js

## Project Structure

```
online-exam-system/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and helpers
├── public/             # Static assets and FaceAPI.js models
├── styles/             # Global styles and CSS modules
├── .gitignore          # Git ignore rules
├── components.json     # UI components configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies
├── pnpm-lock.yaml      # pnpm lockfile
├── postcss.config.mjs  # PostCSS configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Installation & Setup

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Webcam access for facial recognition

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd online-exam-system
```

2. Install dependencies:
```bash
pnpm install
```

3. Download FaceAPI.js models:
   - Place model files in the `public/models` directory
   - Required models: face detection, face recognition, and facial landmark detection

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Student Authentication
1. Students enter their matriculation number
2. System activates webcam for facial recognition
3. FaceAPI.js compares captured face with database records
4. Upon successful authentication, student proceeds to exam

### Exam Monitoring
1. Webcam remains active throughout the exam
2. System monitors student presence and activity
3. First absence triggers a warning
4. Three warnings result in exam termination
5. All activity is logged for review

## Configuration

### FaceAPI.js Models
Place the following model files in `public/models/`:
- faceapi.tinyFaceDetectorOptions
- faceapi.faceLandmark68Net
- faceapi.faceRecognitionNet
- faceapi.faceExpressionNet
- faceapi.ageGenderNet

### Environment Variables
Create a `.env.local` file for configuration:
```
# Database connection for student records
DATABASE_URL=your_database_connection_string

# Face recognition confidence threshold
FACE_MATCH_THRESHOLD=0.6

# Exam duration settings
EXAM_DURATION=60
```

## Usage Guidelines

### For Students:
1. Ensure good lighting and a clear view of your face
2. Remain visible to the webcam throughout the exam
3. Avoid moving out of frame to prevent warnings
4. Complete all questions within the time limit

### For Administrators:
1. Register student faces in the database before exams
2. Set appropriate exam duration and warning thresholds
3. Review activity logs after exam sessions

## Security Features

- Facial recognition authentication
- Real-time activity monitoring
- Session recording for review
- Prevention of exam retakes
- Secure question delivery

## Browser Compatibility

- Chrome 70+ (recommended)
- Firefox 65+
- Safari 12+
- Edge 79+

## Deployment

### Vercel Deployment
1. Connect your repository to Vercel
2. Add environment variables in the dashboard
3. Deploy automatically on git push

### Self-Hosting
1. Build the application: `pnpm build`
2. Start production server: `pnpm start`
3. Configure reverse proxy if needed

## Troubleshooting

### Common Issues:
1. Webcam permissions not granted
2. FaceAPI.js models not loading
3. Poor lighting affecting recognition
4. Network issues during exam

### Solutions:
- Ensure browser has camera permissions
- Check model files are in correct location
- Use well-lit environment
- Stable internet connection required

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Important**: This system should be used in compliance with privacy regulations and with proper consent from participants. Ensure you have appropriate policies in place for facial recognition data usage.
