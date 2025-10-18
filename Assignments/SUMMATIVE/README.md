# 💰 Student Finance Tracker

Smart budgeting made simple for students. Track expenses, manage budgets, and achieve financial goals with powerful regex search and multi-currency support.

## 🚀 Features

- ✅ **Track Unlimited Transactions** - Add, edit, and delete expense records
- ✅ **Multi-Currency Support** - RWF, USD, EUR with manual exchange rates
- ✅ **Budget Caps & Alerts** - Set monthly budgets with real-time ARIA live notifications
- ✅ **Advanced Regex Search** - Search transactions with powerful pattern matching
- ✅ **Export/Import JSON** - Backup and restore your data
- ✅ **Responsive Design** - Mobile-first (360px), tablet (768px), desktop (1024px+)
- ✅ **Full Keyboard Navigation** - Complete accessibility support
- ✅ **Offline Storage** - All data saved locally in your browser

## 📸 Screenshots

_(Add screenshots here after deployment)_

## 🛠️ Technologies Used

- **HTML5** - Semantic structure with ARIA landmarks
- **CSS3** - Flexbox, Grid, Media Queries, CSS Variables
- **JavaScript ES6+** - Modules, Classes, Async/Await
- **LocalStorage API** - Client-side data persistence
- **Regular Expressions** - Input validation and search

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Regex Patterns](#regex-patterns)
- [Keyboard Navigation](#keyboard-navigation)
- [Accessibility](#accessibility)
- [File Structure](#file-structure)
- [Testing](#testing)
- [License](#license)

## 💻 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   cd finance-tracker
   ```

2. **Open in browser:**

   ```bash
   # Simply open index.html in your browser
   # OR use a local server (recommended):
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **That's it!** No build process required.

## 🎯 Usage

### Adding a Transaction

1. Navigate to **Transactions** section
2. Click **"➕ Add New Transaction"**
3. Fill in the form:
   - **Description**: e.g., "Lunch at cafeteria"
   - **Amount**: e.g., "12.50" (max 2 decimals)
   - **Category**: Select from dropdown
   - **Date**: YYYY-MM-DD format
