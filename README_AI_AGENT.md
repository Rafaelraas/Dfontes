# AI Agent Integration Guide - Dernival Fontes Real Estate

## Overview

This guide provides comprehensive documentation for AI agents assisting customers in finding housing through the Dernival Fontes real estate platform. The system is designed to help customers discover properties in Natal and the Rio Grande do Norte region of Brazil.

## Property Data Structure

### Core Property Schema

Each property in the system follows this data structure:

```javascript
{
  id: Number,              // Unique identifier
  type: String,            // Property type: "Apartamento", "Casa", "Terreno"
  location: String,        // Full location string (e.g., "Ponta Negra - Natal/RN")
  bedrooms: Number,        // Number of bedrooms (0 for land)
  bathrooms: Number,       // Number of bathrooms (0 for land)
  area: Number,            // Area in square meters (m²)
  price: String,           // Price in Brazilian Reais format (e.g., "R$ 450.000")
  featured: Boolean,       // Whether property is featured/highlighted
  city: String,            // City name (e.g., "Natal", "Parnamirim")
  neighborhood: String,    // Neighborhood/district name
  status: String,          // "available", "pending", "sold", "rented"
  amenities: Array,        // List of amenities (pool, garage, etc.)
  description: String      // Detailed property description
}
```

### Property Types

1. **Apartamento** (Apartment)
   - Urban residential units in multi-story buildings
   - Typically include bedrooms, bathrooms, living areas
   - Common in Natal's urban neighborhoods

2. **Casa** (House)
   - Single-family residential properties
   - May include yard, garage, multiple floors
   - Various sizes from compact to luxury homes

3. **Terreno** (Land)
   - Vacant lots for construction
   - bedrooms and bathrooms = 0
   - Measured by total area (m²)

## Service Areas

### Primary Coverage

**Grande Natal (Greater Natal Metropolitan Area):**
- Natal (capital city)
- Parnamirim
- São Gonçalo do Amarante
- Macaíba
- Extremoz

**Extended Coverage:**
- Entire Rio Grande do Norte state (RN)

### Popular Neighborhoods in Natal

- **Ponta Negra**: Beach area, tourist district, high-value properties
- **Lagoa Nova**: Central, commercial, well-developed infrastructure
- **Candelária**: Residential, established neighborhood
- **Tirol**: Upscale, central location, premium properties
- **Capim Macio**: Growing area, good infrastructure

## AI Agent Interaction Guidelines

### Understanding Customer Needs

When helping customers, gather these key requirements:

1. **Budget Range**
   - Typical ranges: R$ 100,000 - R$ 300,000 (entry), R$ 300,000 - R$ 600,000 (mid-range), R$ 600,000+ (premium)

2. **Property Type Preference**
   - Apartment vs House vs Land
   - New construction vs established property

3. **Location Preferences**
   - Beach proximity (Ponta Negra area)
   - City center access (Lagoa Nova, Tirol)
   - Suburban/quieter areas (Parnamirim)
   - Work/school proximity

4. **Size Requirements**
   - Number of bedrooms needed
   - Number of bathrooms
   - Minimum area (m²)

5. **Essential Amenities**
   - Parking/garage
   - Pool
   - Security
   - Elevator (for apartments)
   - Outdoor space

### Search Strategy

**Step 1: Qualification**
- Identify if customer is looking to buy or rent
- Determine budget constraints
- Understand timeline (urgent vs planning ahead)

**Step 2: Filtering**
- Start with property type
- Apply location preferences
- Filter by size requirements
- Consider price range

**Step 3: Presentation**
- Show featured properties first if they match criteria
- Present 2-3 best matches initially
- Highlight unique features
- Mention nearby amenities and attractions

**Step 4: Refinement**
- Ask for feedback on presented options
- Adjust search based on preferences
- Offer alternatives in nearby areas
- Consider slightly different property types if needed

### Communication Best Practices

1. **Language**: Portuguese (Brazil)
   - Use formal but friendly tone
   - Address customers with "você" (you)
   - Use real estate terminology correctly

2. **Property Descriptions**
   - Always mention: type, location, size, price
   - Highlight special features
   - Mention proximity to beaches, shopping, schools
   - Note transportation access

3. **Setting Expectations**
   - Explain that property availability may change
   - Encourage direct contact for viewings
   - Mention that final prices may be negotiable
   - Provide CRECI registration (6359 - 17° REGIÃO)

4. **Local Knowledge**
   - Natal is a coastal city with beautiful beaches
   - Climate is tropical (warm year-round)
   - Growing economy and tourism sector
   - Good infrastructure in main areas

### Example Conversations

#### Example 1: Family Looking for House

**Customer**: "Estou procurando uma casa com 3 quartos em Natal"
(I'm looking for a house with 3 bedrooms in Natal)

**AI Agent Response**:
"Ótimo! Temos algumas excelentes opções de casas com 3 quartos em Natal. Para ajudá-lo melhor:
- Qual seria seu orçamento aproximado?
- Prefere algum bairro específico? (ex: Candelária, Lagoa Nova, Ponta Negra)
- Quantos banheiros seriam ideais?
- Alguma característica essencial? (garagem, quintal, etc.)"

#### Example 2: Investment Property

**Customer**: "Quero investir em um apartamento para alugar"
(I want to invest in an apartment to rent)

**AI Agent Response**:
"Excelente escolha! Investimento em imóveis em Natal é muito procurado, especialmente em áreas turísticas. Temos apartamentos em Ponta Negra que são ótimos para aluguel por temporada. Qual seria seu valor de investimento e prefere apartamento pronto ou na planta?"

## Contact Information

### Company Details
- **Name**: Dernival Fontes Consultoria de Imóveis
- **CRECI**: 6359 - 17° REGIÃO (RN)
- **Location**: Rua Poço Branco, 33 - Parnamirim/RN - CEP 59152-280
- **Service Area**: Natal and entire Rio Grande do Norte state
- **Phone**: (84) 9999-9999
- **Email**: contato@dernivalfontes.com.br
- **Hours**: Mon-Fri: 8:00-18:00, Sat: 8:00-12:00

### Coordinates
- Latitude: -5.795000
- Longitude: -35.209444

## Integration Points

### Contact Form
- Located in Contact component (`src/components/Contact.jsx`)
- Fields: name, email, phone, message
- All fields required
- Currently shows alert on submission (ready for backend integration)

### Property Listing
- Located in Properties component (`src/components/Properties.jsx`)
- Currently static array of properties
- Ready for dynamic data integration
- Supports filtering and search

### Navigation
- Smooth scroll between sections
- Fixed header navigation
- Mobile responsive
- Sections: Home (Hero), About, Properties, Contact

## Technical Integration

### API Endpoints (Future Implementation)

Recommended endpoints for AI agent integration:

```javascript
// Get all available properties
GET /api/properties
Query params: ?type=casa&minBedrooms=3&maxPrice=500000

// Get property details
GET /api/properties/:id

// Search properties
POST /api/properties/search
Body: { query, filters, preferences }

// Submit customer inquiry
POST /api/inquiries
Body: { name, email, phone, message, propertyId }

// Get neighborhood information
GET /api/neighborhoods/:name
```

### Data Export Format

For AI consumption, properties can be exported in JSON:

```json
{
  "properties": [...],
  "metadata": {
    "total": 6,
    "featured": 3,
    "areas": ["Natal", "Parnamirim"],
    "priceRange": {
      "min": 180000,
      "max": 1200000
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Property Not Available**
   - Check status field
   - Verify last updated date
   - Direct customer to contact form for current availability

2. **Price Discrepancies**
   - Prices may be negotiable
   - Market fluctuations affect pricing
   - Always encourage direct contact for current pricing

3. **Location Confusion**
   - Use full location string with city and state
   - Provide neighborhood context
   - Mention proximity to known landmarks

### Escalation

When to direct customers to human agents:
- Complex legal questions
- Detailed financial arrangements
- Property viewing scheduling
- Negotiation requests
- Technical issues with properties
- Concerns about documentation

## Best Practices

1. **Always Verify**
   - Confirm property availability before showing
   - Check that customer requirements are realistic for budget
   - Verify location preferences are within service area

2. **Be Transparent**
   - Clearly state AI assistance limitations
   - Encourage human contact for detailed questions
   - Provide accurate property information

3. **Follow Up**
   - Ask if additional properties needed
   - Offer to save search preferences
   - Provide contact information for next steps

4. **Cultural Sensitivity**
   - Respect Brazilian business customs
   - Understand local real estate practices
   - Be patient with varying levels of digital literacy

## Future Enhancements

Planned features for better AI integration:
- Advanced property search with ML-based recommendations
- Virtual property tours integration
- Neighborhood quality scores and analytics
- Market trend analysis
- Automated property matching based on preferences
- Multi-language support (English, Spanish)
- WhatsApp integration for direct communication
- Calendar integration for property viewings

## Support

For questions about this integration guide or technical implementation:
- Review the main README.md for project setup
- Check DEPLOYMENT.md for hosting information
- Contact development team for API access
- Review component source code in `/src/components/`

---

**Last Updated**: December 2024
**Version**: 1.0
**Target AI Agents**: Customer service, property search, inquiry management
