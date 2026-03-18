# RetailEdge

On-device AI platform for retail operations with shelf monitoring, customer analytics, POS integration, and digital signage.

## Features

- **Shelf Monitoring** -- AI-powered shelf stock detection and restocking alerts
- **Customer Analytics** -- Foot traffic, crowd density, and conversion tracking
- **POS Integration** -- Point-of-sale terminal monitoring and performance metrics
- **Digital Signage** -- Manage and deploy content to in-store displays
- **Inventory Management** -- Real-time inventory tracking across all stores
- **Fleet Device Management** -- Monitor edge device health and connectivity
- **Privacy Controls** -- On-device AI processing for data privacy compliance
- **Multi-Store Dashboard** -- Aggregate performance metrics across locations

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Database:** Supabase
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd retailedge
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
retailedge/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── shelf/        # Shelf monitoring
│   │   ├── analytics/    # Customer analytics
│   │   ├── pos/          # POS integration
│   │   ├── signage/      # Digital signage
│   │   ├── inventory/    # Inventory management
│   │   └── fleet/        # Device management
│   ├── components/       # Shared UI components
│   └── lib/              # Utilities, store, mock data
├── public/               # Static assets
└── package.json
```

