# 🤝 Contributing to VANI

Thank you for your interest in contributing to VANI (Voice-Assisted Natural Interface)! We love contributions from the community. This guide will help you get started.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

---

## 📜 Code of Conduct

By participating in this project, you agree to be respectful, inclusive, and constructive. We expect all contributors to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what is best for the community

---

## 🚀 Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Vaani-Prototype.git
   cd Vaani-Prototype
   ```
3. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/Sumit-ai-dev/Vaani-Prototype.git
   ```

---

## 🛠️ Development Setup

Follow the [Quick Start](README.md#-quick-start) guide in the README to set up your local environment.

---

## 💡 How to Contribute

### Reporting Bugs

- Check the [Issues](https://github.com/Sumit-ai-dev/Vaani-Prototype/issues) page first to avoid duplicates
- Open a new issue with a clear title and detailed description
- Include steps to reproduce, expected behavior, and actual behavior

### Suggesting Features

- Open an issue with the label `enhancement`
- Describe your feature idea and the problem it solves
- Be open to discussion and feedback

### Submitting Code

1. **Create a branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
2. **Make your changes** following the [Style Guidelines](#style-guidelines)
3. **Test your changes** thoroughly
4. **Commit** with a meaningful message (see below)
5. **Push** to your fork and open a Pull Request

---

## 📝 Submitting Changes

### Commit Message Format

Use clear and descriptive commit messages:

```
feat: add voice confirmation dialog
fix: resolve microphone permission issue
docs: update setup instructions
style: improve button hover animation
```

### Pull Request Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-reviewed the code
- [ ] Tested on a local development environment
- [ ] No breaking changes (or clearly documented if there are)
- [ ] Added/updated relevant documentation

---

## 🎨 Style Guidelines

- **JavaScript/JSX**: Follow the existing code style; use functional components and hooks
- **CSS**: Use Tailwind CSS utility classes consistent with the existing design system
- **File Naming**: Use PascalCase for components (e.g., `VoiceRecorder.jsx`), camelCase for utilities
- **Imports**: Group imports — React/Next first, then third-party, then local

---

## ❓ Questions?

Feel free to open an issue or start a discussion. We're happy to help!

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/Sumit-ai-dev">Sumit</a> and contributors</sub>
</div>
