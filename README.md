## 🚀 Recommendations

- **Runtime:** Node.js (v22.20.0)
- **Package Manager:** pnpm

## ⚙️ Installation & Setup

Follow the steps below to run the project locally.

### Prerequisites

Make sure you have **Node.js** version **v22.20.0** or higher and the **pnpm** package manager installed on your machine.

Ensure that the project's back-end is running during execution for everything to work correctly.

### Install Dependencies

Use pnpm to install all project dependencies:

```
pnpm install
```

### ▶️ Running the Project

To start the development server, run:

```
pnpm dev
```

The project will be available at [http://localhost:3000](http://localhost:3000)

---

## 🧪 Pre-commit Tests (Husky)

This project uses **Husky** and **lint-staged** to enforce code quality before commits.

Whenever you try to commit, the following will run automatically:

- **ESLint** — validates the code
- **Prettier** — formats the code
- **TypeScript checks** (if configured)

If any of these fail, the commit is blocked to prevent invalid code from entering the repository.

You can reinstall Husky hooks if needed using:

```
pnpm prepare
```

---

## 🔄 CI/CD Pipeline Checks

A GitHub Actions workflow has been added to ensure code quality on every:

- **push**
- **pull request**

The pipeline runs:

1. **ESLint checks**
2. **Prettier formatting validation**
3. **TypeScript type checking**
4. **Build verification**

If any step fails, the pipeline stops and marks the commit/PR as failing.

This helps ensure the project always remains stable, formatted, and error-free.

---

## ⚠️ Any Known Limitations

- The project currently does not include a database.
- Because of this, any data created or modified during runtime will **not persist** after the server is restarted.
- All data is temporarily stored in memory, so refreshing or stopping the backend server will reset it.
