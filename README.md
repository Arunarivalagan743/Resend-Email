# Resend Email Demo 📧

A simple, beautiful email testing application built with **Vite React** frontend and **Node.js Express** backend using **Resend** for reliable email delivery.

## ✨ Features

- 🚀 **Fast Development** - Powered by Vite for lightning-fast development
- 📧 **Email Testing** - Send test emails with predefined templates
- ✉️ **Custom Emails** - Create and send custom emails with your own content
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 🔄 **Real-time Status** - Live API status monitoring
- 🛡️ **Security** - Rate limiting, CORS, and input validation
- 📱 **Responsive** - Works perfectly on desktop and mobile devices

## 🏗️ Project Structure

```
ResendEmailDemo/
├── backend/                 # Node.js Express API
│   ├── routes/
│   │   └── email.js        # Email sending endpoints
│   ├── server.js           # Express server setup
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # Vite React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Application entry point
│   ├── vite.config.js      # Vite configuration
│   ├── package.json        # Frontend dependencies
│   └── .env.example        # Environment variables template
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Resend account** and API key

### 1. Clone/Setup the Project

```bash
cd ResendEmailDemo
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env

# Edit .env file with your Resend API key
# RESEND_API_KEY=your_actual_resend_api_key_here
# FROM_EMAIL=demo@yourdomain.com
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create environment file (optional - defaults work for local development)
copy .env.example .env
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Your application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🔧 Configuration

### Resend Setup

1. **Create a Resend account** at [resend.com](https://resend.com)
2. **Generate an API key** from your dashboard
3. **Add your domain** (for production) or use the test domain
4. **Update the backend `.env` file** with your API key

### Environment Variables

**Backend (.env):**
```env
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=demo@yourdomain.com
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3001
```

## 📧 Email Testing

### Test Email
- Pre-built beautiful template
- Optional custom message
- Perfect for testing your Resend integration

### Custom Email
- Full control over subject and content
- Rich HTML email template
- Ideal for real-world email scenarios

## 🚦 API Endpoints

### Health Check
```
GET /health
```
Returns API status and timestamp.

### Send Test Email
```
POST /api/email/send-test
Content-Type: application/json

{
  "to": "recipient@example.com",
  "from": "Your Name (optional)",
  "message": "Custom message (optional)"
}
```

### Send Custom Email
```
POST /api/email/send-custom
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Your Subject",
  "message": "Your message content",
  "from": "Your Name (optional)"
}
```

## 🌐 Deployment

### Local Testing
The application is already configured for local development. Just follow the Quick Start guide above.

### Production Deployment

#### Backend Deployment Options:

1. **Heroku**
   ```bash
   # In backend directory
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name-backend
   heroku config:set RESEND_API_KEY=your_key
   heroku config:set FROM_EMAIL=demo@yourdomain.com
   heroku config:set NODE_ENV=production
   git push heroku main
   ```

2. **Railway**
   - Connect your GitHub repository
   - Set environment variables in Railway dashboard
   - Deploy automatically

3. **DigitalOcean App Platform**
   - Create new app from GitHub
   - Configure environment variables
   - Deploy with one click

#### Frontend Deployment Options:

1. **Vercel**
   ```bash
   # In frontend directory
   npm run build
   npx vercel --prod
   ```

2. **Netlify**
   ```bash
   # In frontend directory
   npm run build
   # Upload dist/ folder to Netlify or connect GitHub
   ```

3. **GitHub Pages**
   ```bash
   npm run build
   # Deploy dist/ folder to gh-pages branch
   ```

### Environment Variables for Production

**Backend:**
```env
RESEND_API_KEY=your_production_api_key
FROM_EMAIL=noreply@yourdomain.com
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
PORT=3001
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-domain.com
```

## 🛠️ Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding Features

1. **New Email Templates** - Edit `backend/routes/email.js`
2. **UI Components** - Add to `frontend/src/components/`
3. **Styling** - Modify `frontend/src/App.css`

## 🐛 Troubleshooting

### Common Issues

1. **API Key Errors**
   - Verify your Resend API key is correct
   - Check if the key has proper permissions
   - Ensure the FROM_EMAIL domain is verified in Resend

2. **CORS Errors**
   - Check if FRONTEND_URL in backend .env matches your frontend URL
   - Verify the frontend is making requests to the correct API URL

3. **Email Not Delivered**
   - Check your Resend dashboard for delivery status
   - Verify the recipient email address
   - Check spam folders

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your backend `.env` file.

## 📚 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Resend** - Email delivery service
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Resend Documentation](https://resend.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Express Documentation](https://expressjs.com/)

---

**Happy Emailing! 📧✨**