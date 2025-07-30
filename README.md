
# Star Wars Fleet Management Dashboard

[Preview URL](https://astra-assignment-rust.vercel.app/)

## 🎯 Objective

Build a **Star Wars Fleet Management Dashboard** where users can:

* Search for starships (e.g., “Millennium Falcon”)
* View a paginated list of starships with name, model, manufacturer, crew size, and hyperdrive rating
* Filter starships by hyperdrive rating and crew size
* Select multiple starships to compare their details
* Persist selected starships when navigating between pages


## 🧰 Tech Stack Used

* **Next.js 15**
* **TanStack React Query**
* **TanStack Table**
* **TS-Rest**
* **Zod** (schema validation, type inferance)
* **Jotai** (state management)
* **Framer Motion** (animations)
* **Tailwind CSS** (styling)


## 🚀 Getting Started

```bash
git clone https://github.com/MubashirTanwar/astra-assignment.git .
yarn install
yarn dev
```

> To run it in production, create a `.env` file with:

```env
NEXT_PUBLIC_API_BASE=https://astra-assignment-rust.vercel.app/
```


## ✨ Features Implemented

* Display all starships from SWAPI
* Search by name
* Filter by crew size and hyperdrive rating
* Sort starships by hyperdrive rating
* Select multiple starships for side-by-side comparison
* Framer Motion animations for smoother UI
* Dark/Light theme inspired by Star Wars
* Type-safe API calls using **TS-Rest**
* Persistent state using **Jotai**
* Data fetching using **TanStack Query**
* Fully mobile-responsive UI
* Synced the URL with the state of the current table selection



## 📝 Notes

1. **Zod Compatibility**: TS-Rest v3.5+ isn't compatible with Zod v4+, which caused a type error and a day of debugging. Stick to Zod v3.x for now. Check this [issue](https://github.com/ts-rest/ts-rest/issues/835)
2. **Why TS-Rest?**: Curious about the rationale behind choosing TS-Rest over tRPC, which has a simpler setup and broader community adoption. Is native SDK generation a key reason?
3. **SSL Issue with SWAPI**: The official SWAPI (`https://swapi.dev`) lost its SSL certificate. SSL verification was temporarily disabled to bypass this for development purposes.


## 📁 Project Structure

```
├── .gitignore              
├── .prettierignore          
├── .prettierrc             
├── README.md              
├── components.json        
├── next-env.d.ts             
├── next.config.ts            
├── package.json               
├── postcss.config.mjs         
├── public/                    # Static assets (served as root-level URLs)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/                       # All source code lives here
│   ├── app/                   
│   │   ├── api/               # API route handlers
│   │   │   └── starships/
│   │   │       └── route.ts   # API endpoint for starships
│   │   ├── favicon.ico        # Favicon
│   │   ├── fonts/             # Custom fonts
│   │   │   ├── Quicksand.ttf
│   │   │   └── Starjedi.ttf
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/          
│   │   ├── Starships/         # Starship-specific components
│   │   │   ├── CompareModal.tsx
│   │   │   ├── Filters.tsx
│   │   │   ├── SelectedShips.tsx
│   │   │   ├── Table.tsx
│   │   │   ├── TableSkeleton.tsx
│   │   │   └── index.tsx
│   │   └── ui/                # Common shared UI components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── skeleton.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── theme-toggler.tsx
│   │       └── tooltip.tsx
│   ├── hooks/                 # React hooks
│   │   ├── tanstack/
│   │   │   └── useStarships.ts
│   │   ├── useDebounce.tsx
│   │   └── useUrlSync.tsx
│   ├── lib/                   # Utility functions and core logic
│   │   ├── api-client.ts
│   │   ├── atom.ts
│   │   ├── constants.ts
│   │   ├── filters.ts
│   │   ├── get-query-client.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── providers/             # React context and providers
│   │   ├── QueryClientProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── index.tsx
│   ├── schema/                # Zod or form schemas
│   │   └── search.schema.ts
│   └── shared/                # Shared contracts
│       ├── contract.ts
│       └── starships.ts
├── tsconfig.json              # TypeScript config
└── yarn.lock                  # Yarn dependency lockfile



```


## ✅ Conclusion

Its really refreshing to see assignments/ tasks that are intuitive in nature and tricky to implement, after my first interafction with ts-rest in this project, i dont this if I ever will make a TS full-stack project without this. 