# 🎙️ VANI - Voice-Powered AI Website Builder

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white" />
</p>

---

## 📖 About VANI

**VANI** (Voice-Assisted Natural Interface) is an AI-powered conversational website builder designed for **non-technical small business owners**. Build, manage, and update professional websites entirely through voice commands or text chat—no coding required.

### ✨ Core Value Proposition

- 🎤 **Zero-Friction Build:** Just talk to VANI ("My shop is Meera's Flowers") to create a site
- 🤝 **Trust Loop:** AI always confirms intent before publishing changes
- 🌐 **Omnichannel:** Accessible via Web Dashboard, PWA, and eventually WhatsApp

---

## 🚀 Features

### Current Features
- 🧠 **AI-Powered Website Generation** - Transform natural language into fully functional websites
- ⚡ **Real-time Updates** - See changes instantly with Convex backend
- 🎨 **Beautiful by Default** - Professional, responsive designs out of the box
- 🔄 **Code Export** - Download your generated code anytime

### Coming Soon (VANI Enhancements)
- 🎤 **Voice Input** - Speak your website into existence
- 💬 **Conversational Confirmation** - "I will add a contact form. Confirm?"
- 📊 **Dashboard UI** - YouTube Studio-style management interface
- 📈 **Analytics** - Track your website performance
- 🖼️ **Media Manager** - Easy image and asset management

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first styling
- **Convex** - Real-time backend database

### AI & ML
- **Google Gemini Flash 2.0** - Natural language to code generation
- **OpenAI Whisper** - Speech-to-text conversion (coming soon)

---

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **yarn** or **pnpm**
- **Google Gemini API Key** - [Get it here](https://ai.google.dev/)
- **OpenAI API Key** - [Get it here](https://platform.openai.com/) (for voice features)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Sumit-ai-dev/Vaani-Prototype.git
cd Vaani-Prototype
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

> **Note:** Copy `.env.local.example` and fill in your API keys

### 4. Start Development Servers

```bash
# Terminal 1: Start Next.js dev server
npm run dev

# Terminal 2: Start Convex (in a new terminal)
npx convex dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
vaani/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API endpoints
│   ├── (main)/            # Main application pages
│   └── layout.js          # Root layout
├── components/            # React Components
│   ├── custom/           # Custom VANI components
│   └── ui/               # UI components
├── convex/               # Convex backend
│   ├── schema.ts         # Database schema
│   └── functions.ts      # Server functions
├── lib/                  # Utilities
└── public/               # Static assets
```

---

## 🎯 Roadmap

- [x] Natural language to website generation
- [x] Real-time preview
- [ ] Voice recording and transcription
- [ ] Conversational confirmation UI
- [ ] Dashboard with analytics
- [ ] Multi-user authentication
- [ ] WhatsApp integration
- [ ] Custom domain support

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 💡 Inspiration

VANI was inspired by the need to make website creation accessible to small business owners who don't have technical skills. We believe everyone should be able to have a professional online presence.

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) - For powerful AI capabilities
- [OpenAI](https://openai.com/) - For Whisper speech recognition
- [Vercel](https://vercel.com/) - For seamless deployment
- [Convex](https://convex.dev/) - For real-time backend
- [Next.js](https://nextjs.org/) - For the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Sumit-ai-dev">Sumit</a> and contributors</sub>
</div>
