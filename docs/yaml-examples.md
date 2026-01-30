# YAML Examples

This document provides practical examples of valid Actualization Canvas YAML configurations.

## Example 1: SaaS Platform

A B2B SaaS analytics platform for e-commerce businesses.

```yaml
meta:
  title: 'DataPulse Analytics'
  caption: 'E-commerce Intelligence Platform'
  logoUrl: ''
  canvasSize: 'A4'
  noteColumns: 2

blocks:
  suppliers:
    - title: 'AWS'
      body: 'Cloud infrastructure and data storage.'
      color: 'blue'
    - title: 'Stripe'
      body: 'Payment processing for subscriptions.'
      color: 'blue'

  problem:
    - title: 'Data Silos'
      body: 'E-commerce data scattered across platforms.'
      color: 'pink'
    - title: 'Slow Insights'
      body: 'Manual reporting takes days.'
      color: 'pink'

  primaryFunctions:
    - title: 'Data Integration'
      body: 'Connect to 50+ e-commerce platforms.'
      color: 'green'
    - title: 'Analytics Engine'
      body: 'Real-time data processing and ML models.'
      color: 'green'

  solution:
    - title: 'Unified Dashboard'
      body: 'Single view of all sales, inventory, and customer data.'
      color: 'yellow'

  essentialAssets:
    - title: 'Integration Library'
      body: 'Pre-built connectors to major platforms.'
      color: 'blue'
    - title: 'ML Models'
      body: 'Proprietary prediction algorithms.'
      color: 'blue'

  keyMetrics:
    - title: 'MRR'
      body: 'Monthly Recurring Revenue growth.'
      color: 'green'
    - title: 'Churn Rate'
      body: 'Target: <5% monthly.'
      color: 'yellow'

  valuePropositions:
    - title: 'Real-Time Insights'
      body: 'Live dashboards updated every minute.'
      color: 'green'
    - title: 'Predictive Analytics'
      body: 'Forecast sales and inventory needs.'
      color: 'green'

  unfairAdvantage:
    - title: 'First-Mover'
      body: 'First platform with Shopify Plus API access.'
      color: 'blue'

  channels:
    - title: 'Content Marketing'
      body: 'SEO-optimized blog and case studies.'
      color: 'yellow'
    - title: 'Partner Network'
      body: 'Referrals from e-commerce agencies.'
      color: 'yellow'

  customerRelationships:
    - title: 'Self-Service'
      body: 'Automated onboarding and setup.'
      color: 'blue'
    - title: 'Account Manager'
      body: 'Dedicated support for enterprise tier.'
      color: 'blue'

  customerSegments:
    - title: 'Mid-Market'
      body: 'E-commerce businesses $1M-$50M revenue.'
      color: 'pink'
    - title: 'Enterprise'
      body: 'Multi-brand retailers >$50M revenue.'
      color: 'pink'

  costStructure:
    - title: 'Infrastructure'
      body: 'AWS hosting and data processing.'
      color: 'red'
    - title: 'Development'
      body: 'Engineering team salaries.'
      color: 'red'

  revenueStreams:
    - title: 'Subscription'
      body: '$299/month starter, $999/month pro.'
      color: 'green'
    - title: 'Enterprise'
      body: 'Custom pricing for large accounts.'
      color: 'green'
```

## Example 2: Marketplace Platform (Catalyzed Model)

A freelance marketplace connecting designers with clients.

```yaml
meta:
  title: 'DesignMatch'
  caption: 'Premium Freelance Design Marketplace'
  logoUrl: ''
  canvasSize: 'A4'
  noteColumns: 2

blocks:
  suppliers:
    - title: 'Payment Processor'
      body: 'Escrow and split payment handling.'
      color: 'blue'
    - title: 'Identity Verification'
      body: 'KYC service for designer vetting.'
      color: 'blue'

  problem:
    - title: 'Quality Uncertainty'
      body: 'Clients struggle to find reliable designers.'
      color: 'pink'
    - title: 'Payment Risk'
      body: 'Freelancers fear non-payment.'
      color: 'pink'

  primaryFunctions:
    - title: 'Vetting Process'
      body: 'Screen and approve designer portfolios.'
      color: 'green'
    - title: 'Matching Algorithm'
      body: 'Connect clients with suitable designers.'
      color: 'green'

  solution:
    - title: 'Curated Marketplace'
      body: 'Pre-vetted designers with escrow protection.'
      color: 'yellow'

  essentialAssets:
    - title: 'Designer Network'
      body: '500 vetted designers at launch.'
      color: 'blue'
    - title: 'Brand Reputation'
      body: 'Endorsements from design influencers.'
      color: 'blue'

  keyMetrics:
    - title: 'GMV'
      body: 'Gross Merchandise Value processed.'
      color: 'green'
    - title: 'Match Rate'
      body: '% of projects successfully matched.'
      color: 'yellow'

  valuePropositions:
    - title: 'Quality Guarantee'
      body: 'Only top 5% of designers accepted.'
      color: 'green'
    - title: 'Secure Payments'
      body: 'Escrow protects both parties.'
      color: 'green'

  unfairAdvantage:
    - title: 'Exclusive Talent'
      body: 'Contracts with top design schools.'
      color: 'blue'

  channels:
    - title: 'Designer Referrals'
      body: 'Invite-only network growth.'
      color: 'yellow'
    - title: 'Client Outreach'
      body: 'Direct sales to startups and agencies.'
      color: 'yellow'

  customerRelationships:
    - title: 'Designers'
      body: 'Community forums and monthly webinars.'
      color: 'blue'
    - title: 'Clients'
      body: 'Dedicated project manager for large contracts.'
      color: 'blue'

  customerSegments:
    - title: 'Designers'
      body: 'Experienced freelancers seeking premium clients.'
      color: 'pink'
    - title: 'Startups'
      body: 'Tech companies needing design work.'
      color: 'pink'
    - title: 'Agencies'
      body: 'Design agencies outsourcing overflow.'
      color: 'pink'

  costStructure:
    - title: 'Platform Development'
      body: 'Engineering and maintenance.'
      color: 'red'
    - title: 'Vetting Operations'
      body: 'Team reviewing designer applications.'
      color: 'red'

  revenueStreams:
    - title: 'Commission (Clients)'
      body: '15% fee on project value.'
      color: 'green'
    - title: 'Designer Subscription'
      body: '$29/month for premium listing.'
      color: 'green'
```

## Example 3: Physical Product Business

A sustainable coffee roastery with direct-to-consumer sales.

```yaml
meta:
  title: 'GreenBean Roasters'
  caption: 'Sustainable Single-Origin Coffee'
  logoUrl: ''
  canvasSize: 'A4'
  noteColumns: 2

blocks:
  suppliers:
    - title: 'Ethiopian Cooperative'
      body: 'Direct trade single-origin beans.'
      color: 'blue'
    - title: 'Packaging Supplier'
      body: 'Compostable coffee bags.'
      color: 'blue'

  problem:
    - title: 'Commodity Coffee'
      body: 'Mass-market coffee lacks flavor and ethics.'
      color: 'pink'
    - title: 'Farmer Exploitation'
      body: 'Traditional supply chains underpay farmers.'
      color: 'pink'

  primaryFunctions:
    - title: 'Roasting'
      body: 'Small-batch artisan roasting.'
      color: 'green'
    - title: 'Fulfillment'
      body: 'Pack and ship orders within 24 hours.'
      color: 'green'

  solution:
    - title: 'Subscription Service'
      body: 'Fresh-roasted beans delivered monthly.'
      color: 'yellow'

  essentialAssets:
    - title: 'Roasting Equipment'
      body: 'Commercial-grade 15kg roaster.'
      color: 'blue'
    - title: 'Direct Trade Contracts'
      body: 'Exclusive agreements with 3 farms.'
      color: 'blue'

  keyMetrics:
    - title: 'Subscriber Count'
      body: 'Target: 1,000 active subscriptions.'
      color: 'green'
    - title: 'Retention Rate'
      body: 'Monthly retention >85%.'
      color: 'yellow'

  valuePropositions:
    - title: 'Exceptional Flavor'
      body: 'Single-origin, roasted to order.'
      color: 'green'
    - title: 'Ethical Sourcing'
      body: 'Farmers paid 2x fair trade prices.'
      color: 'green'

  unfairAdvantage:
    - title: 'Farm Relationships'
      body: '10-year exclusive contracts with farms.'
      color: 'blue'

  channels:
    - title: 'E-commerce Site'
      body: 'Shopify store with subscription plugin.'
      color: 'yellow'
    - title: 'Farmers Markets'
      body: 'Weekend sampling and sales.'
      color: 'yellow'

  customerRelationships:
    - title: 'Subscription'
      body: 'Automated monthly deliveries.'
      color: 'blue'
    - title: 'Email Newsletter'
      body: 'Farm stories and brewing tips.'
      color: 'blue'

  customerSegments:
    - title: 'Coffee Enthusiasts'
      body: 'Home brewers seeking quality.'
      color: 'pink'
    - title: 'Ethical Consumers'
      body: 'Buyers prioritizing sustainability.'
      color: 'pink'

  costStructure:
    - title: 'Green Beans'
      body: 'Raw coffee bean purchases.'
      color: 'red'
    - title: 'Roasting Labor'
      body: 'Roaster salaries and utilities.'
      color: 'red'

  revenueStreams:
    - title: 'Subscriptions'
      body: '$28/month for 12oz bag.'
      color: 'green'
    - title: 'One-Time Sales'
      body: 'Individual bag purchases at premium.'
      color: 'green'
```
