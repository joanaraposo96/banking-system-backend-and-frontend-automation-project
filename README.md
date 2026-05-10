# 🏦 Banking System Backend Automation Project
This repository contains automated backend tests for a banking API system. It covers core operations like account creation, deletion, deposits, transfers, retrieval, and updates. The automation is built with **Playwright** and **JavaScript**, using **Faker.js** for generating dynamic test data.

## 🛠️ Tech Stack
- JavaScript (ES6+)
- Playwright (End-to-end testing)
- Faker.js (Test data generation)
- Node.js (Runtime environment)

## 🚀 Setup & Install

1. Install node_modules in root and server folders:
</br> "banking-system-backend-and-frontend-automation-project"
</br> "banking-system-backend-and-frontend-automation-project/server"

```
npm install
```

## 📄 Documentation (SwaggerUI)

1. Navigate to the server folder and execute the following command:
```
npm run dev
```
2. Go to the the following URL:
```
http://localhost:3000/api-docs/
```

## 🗂️ Project Structure

```bash
BANKING-SYSTEM-BACKEND-AUTOMATION-PROJECT
📁 .github
📁 backend
├── 🧪 account-creation.spec.js
├── 🧪 account-deletion.spec.js
├── 🧪 account-depositing.spec.js
├── 🧪 account-listing.spec.js
├── 🧪 account-retrieving.spec.js
├── 🧪 account-transfer.spec.js
└── 🧪 account-update.spec.js
📁 helpers
├── 🔧 deleteAccount.js
├── 🔧 getAccount.js
├── 🔧 listAccounts.js
├── 🔧 postAccount.js
├── 🔧 postDeposit.js
├── 🔧 postTransfer.js
└── 🔧 putAccount.js
📁 server
├── 📂 routes
├── 🗄️ db.js
├── 📦 package.json
├── 📦 package-lock.json
└── 🖥️ server.js
📁 test-data
├── 🔧 money.js
├── 🔧 transfer.js
└── 🔧 user.js
📝 index.js
📦 package.json
📦 package-lock.json
⚙️ playwright.config.js
📄 README.md
```

## 🏆 Credits

This backend automation project is based on the original API system built by **Bruno Figueiredo** 👉 [banking-api-training-system](https://github.com/brunonf15/banking-api-training-system).
