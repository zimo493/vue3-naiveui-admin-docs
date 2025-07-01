---
title: Git Version Control System Guide
tags: [Git, Tutorial]
---

## Git Overview

Git is an open-source distributed version control system created by Linus Torvalds in 2005 for efficiently managing project code version history.

### Core Features

- **Distributed Architecture**: Every developer has a complete repository copy
- **High Performance**: Fast handling of large projects
- **Branch Management**: Lightweight branch operations
- **Integrity Protection**: Uses SHA-1 hashing to ensure data integrity

## Download and Install

### Windows System

1. Visit the official download page: [Download Git](https://git-scm.com/downloads)
2. Download the latest Windows installer
3. Run the installer and follow the prompts to complete installation
4. Recommended options during installation:
   - Add Git to PATH
   - Use Git Bash as the default terminal
   - Configure line ending conversion (recommended: "Checkout as-is, commit Unix-style")

### macOS System

**Method 1 (Recommended):**

```bash
# Install using Homebrew
brew install git
```

**Method 2:**

1. Download the latest macOS installer
2. Run the installer and follow the prompts to complete installation

**Linux System**

```bash
# Debian/Ubuntu
sudo apt-get install git

# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

## Initial Configuration

After installation, configure user information

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Optional configuration

```bash
# Set default editor (e.g. VSCode)
git config --global core.editor "code --wait"

# Enable colored output
git config --global color.ui auto
```

## Verify Installation

To verify successful installation, enter the following command in the terminal

```bash
git --version
```

## GUI Tools

- Git GUI (built-in)
- GitHub Desktop
- [TortoiseGit (visual tool)](https://tortoisegit.org/download/)

## Learning Resources

> Tip: After installation, it is recommended to run `git help tutorial` to view the basic tutorial

- Official documentation: https://git-scm.com/doc
- Visual Git Guide: https://marklodato.github.io/visual-git-guide
- GitHub Learning Resources: https://guides.github.com
