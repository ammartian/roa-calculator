# ROA Calculator - MVP PRD

## Overview
A single-page Break Even ROAS Calculator to help businesses quickly calculate the minimum ROAS needed to be profitable on their ad campaigns. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

---

## Core Formula

```
Break Even ROAS = Total Revenue per Product / (Total Revenue per Product - Total Costs per Product)
```

---

## Features (MVP)

### 1. Costs Section
Input fields for costs per product with VAT handling:

| Field | Type | VAT Options |
|-------|------|-------------|
| Cost of Goods | Currency input (USD) | None / 5% / 10% / 15% / 20% / 25% |
| Shipping Costs | Currency input (USD) | None / 5% / 10% / 15% / 20% / 25% |
| Transaction Costs | Currency input (USD) | None / 5% / 10% / 15% / 20% / 25% |
| Other Costs | Currency input (USD) | None / 5% / 10% / 15% / 20% / 25% |

**Total Costs Display**: Auto-calculated and displayed in real-time

### 2. Revenue Section
Input field for revenue per product with VAT handling:

| Field | Type | VAT Options |
|-------|------|-------------|
| Revenue | Currency input (USD) | None / 5% / 10% / 15% / 20% / 25% |

**Total Revenue Display**: Auto-calculated and displayed in real-time

### 3. Results Section
- **Break Even ROAS**: Large, prominent display of the calculated ROAS value
- **Reset Button**: Clears all inputs to start a new calculation

---

## VAT Calculation Logic

```
Cost Excl. VAT = Cost Incl. VAT / (1 + VAT%)
Total Cost = Sum of all costs excluding VAT

Revenue Excl. VAT = Revenue Incl. VAT / (1 + VAT%)
Total Revenue = Revenue excluding VAT
```

---

## UI Components (shadcn/ui)

| Component | Usage |
|-----------|-------|
| `Input` | Currency input fields |
| `Select` | VAT percentage dropdowns |
| `Button` | Reset button |
| `Card` | Section containers |
| `Label` | Field labels |
| `Separator` | Visual separation between sections |

---

## Page Layout

```
┌─────────────────────────────────────────┐
│           ROA CALCULATOR                │
│         (Page Header/Title)             │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │        COSTS (per product)      │    │
│  │                                 │    │
│  │  Cost of Goods      [____] [VAT▼] │  │
│  │  Shipping Costs     [____] [VAT▼] │  │
│  │  Transaction Costs  [____] [VAT▼] │  │
│  │  Other Costs        [____] [VAT▼] │  │
│  │                                 │    │
│  │  Total Costs: $0.00             │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │       REVENUE (per product)     │    │
│  │                                 │    │
│  │  Revenue            [____] [VAT▼] │  │
│  │                                 │    │
│  │  Total Revenue: $0.00           │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │         RESULT                  │    │
│  │                                 │    │
│  │  Break Even ROAS: 0.00          │    │
│  │                                 │    │
│  │       [  Reset  ]               │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

---

## Technical Requirements

### State Management
- React `useState` for form inputs
- Real-time calculation using `useEffect`
- No external state library needed

### Input Handling
- Currency format: USD with 2 decimal places
- Allow numeric input with proper validation
- Auto-format on blur (optional for MVP)

### Responsive Design
- Mobile-first approach
- Max-width container: 600px centered
- Padding: 16px on mobile, 24px on desktop

---

## File Structure

```
app/
├── page.tsx              # Main calculator page
├── layout.tsx            # Root layout
├── globals.css           # Global styles
└── components/
    └── calculator.tsx    # Main calculator component
components/
└── ui/                   # shadcn/ui components
    ├── input.tsx
    ├── select.tsx
    ├── button.tsx
    ├── card.tsx
    ├── label.tsx
    └── separator.tsx
lib/
└── utils.ts              # Utility functions (cn, formatCurrency)
```

---

## Dependencies to Install

```bash
# shadcn/ui components
npx shadcn add input select button card label separator
```

---

## Success Criteria

- [ ] User can input all cost fields with VAT selection
- [ ] User can input revenue with VAT selection
- [ ] Total costs and total revenue update in real-time
- [ ] Break Even ROAS calculates automatically
- [ ] Reset button clears all fields
- [ ] Works correctly on mobile and desktop
- [ ] Clean, minimal UI using shadcn/ui components

---

## Out of Scope (Future Versions)

- Saving calculation history
- Export/sharing functionality
- Dark mode toggle
- Multiple currency support
- Custom VAT percentage input
- Analytics/tracking
- User accounts

---

## Notes

- Keep styling minimal and functional
- Use default shadcn/ui styling as base
- Ensure all calculations happen client-side
- Formulas should match the reference site logic
