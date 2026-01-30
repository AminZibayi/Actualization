# Quick Reference

A condensed reference for The Actualization Canvas YAML format.

## YAML Structure

```yaml
meta:
  title: 'Business Name'
  caption: 'Tagline'
  logoUrl: ''
  canvasSize: 'A4' # A4, A3, A2, A1
  noteColumns: 2 # 1-4

blocks:
  blockId:
    - title: 'Note Title'
      body: 'Note body'
      color: 'yellow' # yellow, blue, green, pink, red
```

## 13 Valid Block IDs

| Block ID                | Description                    |
| ----------------------- | ------------------------------ |
| `suppliers`             | Internal/external dependencies |
| `primaryFunctions`      | Core operational work          |
| `essentialAssets`       | Critical owned assets          |
| `costStructure`         | Major cost categories          |
| `problem`               | Problems being solved          |
| `solution`              | Product/service offered        |
| `keyMetrics`            | Success metrics                |
| `unfairAdvantage`       | Competitive advantages         |
| `valuePropositions`     | Value to customers             |
| `customerSegments`      | Target customers               |
| `channels`              | Customer reach methods         |
| `customerRelationships` | Interaction model              |
| `revenueStreams`        | Revenue methods                |

## Note Colors

- `red` - Costs, risks

## Quick Tips

1. **Be Specific**: "$199/month" not "subscription"
2. **Be Realistic**: Essential Assets = what you actually have
3. **Be Concrete**: "500 scooters" not "fleet"
4. **Use Colors**: Meaningful color coding improves readability
5. **Catalyzed Models**: Marketplace users are customers, not partners

## See Also

- [Complete Schema Reference](yaml-schema.md)
- [Practical Examples](yaml-examples.md)
- [AI Prompts Guide](ai-prompts.md)
- [TAC Specification](spec.md)
