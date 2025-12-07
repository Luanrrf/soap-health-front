## 🚀 Recommendations

* **Runtime:** Node.js (v22.20.0)
* **Package Manager:** pnpm

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

## ⚠️ Any Known Limitations

* The project currently does not include a database.
* Because of this, any data created or modified during runtime will **not persist** after the server is restarted.
* All data is temporarily stored in memory, so refreshing or stopping the backend server will reset it.
