# YAML Schema Reference

This document provides the complete specification for The Actualization Canvas YAML format.

## Schema Overview

The canvas YAML consists of two top-level sections:

- `meta`: Canvas metadata and configuration
- `blocks`: The 13 canvas blocks containing notes

## Structure

```yaml
meta:
  # Canvas metadata
blocks:
  # Canvas blocks with notes
```

## Meta Section

The `meta` section contains canvas-wide settings and metadata.

### Required Fields

| Field     | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `title`   | string | Canvas title (business name)        |
| `caption` | string | Canvas subtitle or tagline          |
| `logoUrl` | string | Logo URL (data URI or external URL) |

### Optional Fields

| Field               | Type   | Default | Description                            |
| ------------------- | ------ | ------- | -------------------------------------- |
| `canvasSize`        | enum   | `A4`    | Canvas size: `A4`, `A3`, `A2`, or `A1` |
| `backgroundPattern` | string | -       | Background pattern name                |
| `noteColumns`       | number | `2`     | Number of note columns (1-4)           |
| `fonts`             | object | -       | Custom font configuration              |
| `advanced`          | object | -       | Advanced export settings               |

### Fonts Object

Custom fonts for different canvas elements:

```yaml
fonts:
  canvasTitle: 'roboto'
  canvasCaption: 'roboto'
  blockTitle: 'inter'
  noteTitle: 'inter'
  noteBody: 'inter'
```

All fields are optional strings representing font family names.

### Advanced Object

```yaml
advanced:
  exportScale: 2.0 # Export scale multiplier (0.1-10)
```

## Blocks Section

The `blocks` section contains the 13 TAC blocks. Each block is a list of notes.

### Valid Block IDs

The following 13 block IDs are valid:

**Left Side (Reality)**

- `suppliers` - Internal and external dependencies
- `primaryFunctions` - Core operational work
- `essentialAssets` - Critical assets owned or being acquired
- `costStructure` - Major cost categories

**Center (Problem & Solution)**

- `problem` - Problems being solved
- `solution` - Product or service offered
- `keyMetrics` - Metrics to track success
- `unfairAdvantage` - Unique competitive advantages

**Right Side (Hypotheses)**

- `valuePropositions` - Value delivered to customers
- `customerSegments` - Target customer groups
- `channels` - How customers are reached
- `customerRelationships` - Customer interaction model
- `revenueStreams` - Revenue generation methods

### Block Structure

Each block contains an array of notes:

```yaml
blocks:
  blockId:
    - title: 'Note Title'
      body: 'Note body text'
      color: 'yellow'
```

### Note Fields

| Field   | Type   | Required | Description                        |
| ------- | ------ | -------- | ---------------------------------- |
| `title` | string | No       | Note title (defaults to empty)     |
| `body`  | string | No       | Note body text (defaults to empty) |
| `color` | enum   | No       | Note color (defaults to `yellow`)  |

### Valid Note Colors

- `yellow` - Default, general purpose
- `blue` - Information, facts
- `green` - Positive, revenue, growth
- `pink` - Customers, segments
- `red` - Costs, risks, warnings

## Validation Rules

1. **Block IDs**: Only the 13 valid block IDs are accepted
2. **Note Colors**: Only the 5 valid colors are accepted
3. **Canvas Size**: Only `A4`, `A3`, `A2`, `A1` are valid
4. **Note Columns**: Must be between 1 and 4
5. **Export Scale**: Must be between 0.1 and 10
6. **Empty Blocks**: Blocks can be empty arrays or omitted entirely

## Complete Example

```yaml
meta:
  title: 'EcoScoot'
  caption: 'Urban Electric Mobility Platform'
  logoUrl: ''
  canvasSize: 'A4'
  backgroundPattern: 'lined-paper'
  noteColumns: 2

blocks:
  suppliers:
    - title: 'Battery Corp'
      body: 'Long-range lithium cells provider.'
      color: 'blue'
    - title: 'City Council'
      body: 'Permits and charging zones.'
      color: 'yellow'

  problem:
    - title: 'Traffic Jams'
      body: 'Commuting takes too long in CBD.'
      color: 'pink'
    - title: 'Pollution'
      body: 'High carbon footprint of cars.'
      color: 'pink'

  primaryFunctions:
    - title: 'Fleet Mgmt'
      body: 'Daily charging & repairs.'
      color: 'green'
    - title: 'App Dev'
      body: 'User experience & tracking.'
      color: 'green'

  solution:
    - title: 'E-Scooters'
      body: 'Deployable anywhere, unlock via app.'
      color: 'yellow'

  essentialAssets:
    - title: 'The Fleet'
      body: '500 Initial Scooters.'
      color: 'blue'
    - title: 'Charging Hubs'
      body: 'Strategically placed warehouses.'
      color: 'blue'

  keyMetrics:
    - title: 'Rides/Day'
      body: 'Target: 4 rides per scooter.'
      color: 'green'
    - title: 'CAC'
      body: 'Cost to acquire rider < $5.'
      color: 'yellow'

  valuePropositions:
    - title: 'Fast Commute'
      body: 'Bypass traffic instantly.'
      color: 'green'
    - title: 'Eco-Friendly'
      body: 'Zero emissions ride.'
      color: 'green'
    - title: 'Affordable'
      body: 'Cheaper than Uber/Taxi.'
      color: 'green'

  unfairAdvantage:
    - title: 'Exclusive Deal'
      body: '3-year exclusive city contract.'
      color: 'blue'

  channels:
    - title: 'Mobile App'
      body: 'iOS and Android Store.'
      color: 'yellow'
    - title: 'Social Media'
      body: 'Instagram local influencers.'
      color: 'yellow'

  customerRelationships:
    - title: 'Automated'
      body: 'Self-service via app.'
      color: 'blue'
    - title: 'Support Chat'
      body: '24/7 in-app assistance.'
      color: 'blue'

  customerSegments:
    - title: 'Commuters'
      body: 'Daily office workers.'
      color: 'pink'
    - title: 'Students'
      body: 'University campus travel.'
      color: 'pink'
    - title: 'Tourists'
      body: 'City exploration.'
      color: 'pink'

  costStructure:
    - title: 'Hardware'
      body: 'Scooter purchase & depreciation.'
      color: 'red'
    - title: 'Charging'
      body: 'Electricity and "Juicer" labor.'
      color: 'red'

  revenueStreams:
    - title: 'Unlock Fee'
      body: '$1 per ride start.'
      color: 'green'
    - title: 'Per Minute'
      body: '$0.15 per minute riding.'
      color: 'green'
```

## Minimal Valid Example

```yaml
meta:
  title: My Business
  caption: The Actualization Canvas
  logoUrl: ''
  canvasSize: A4
  backgroundPattern: paper-fibers
  noteColumns: 2
blocks:
  suppliers: []
  problem: []
  primaryFunctions: []
  solution: []
  essentialAssets: []
  keyMetrics: []
  valuePropositions: []
  unfairAdvantage: []
  channels: []
  customerRelationships: []
  customerSegments: []
  costStructure: []
  revenueStreams: []
```
