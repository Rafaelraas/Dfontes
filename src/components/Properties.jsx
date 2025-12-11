import './Properties.css'

function Properties() {
  const properties = [
    {
      id: 1,
      type: 'Apartamento',
      location: 'Ponta Negra - Natal/RN',
      bedrooms: 3,
      bathrooms: 2,
      area: 85,
      price: 'R$ 450.000',
      featured: true
    },
    {
      id: 2,
      type: 'Casa',
      location: 'Candelária - Natal/RN',
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      price: 'R$ 680.000',
      featured: true
    },
    {
      id: 3,
      type: 'Apartamento',
      location: 'Lagoa Nova - Natal/RN',
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      price: 'R$ 320.000',
      featured: false
    },
    {
      id: 4,
      type: 'Terreno',
      location: 'Parnamirim - Grande Natal/RN',
      bedrooms: 0,
      bathrooms: 0,
      area: 360,
      price: 'R$ 180.000',
      featured: false
    },
    {
      id: 5,
      type: 'Casa',
      location: 'Tirol - Natal/RN',
      bedrooms: 5,
      bathrooms: 4,
      area: 250,
      price: 'R$ 1.200.000',
      featured: true
    },
    {
      id: 6,
      type: 'Apartamento',
      location: 'Capim Macio - Natal/RN',
      bedrooms: 3,
      bathrooms: 2,
      area: 95,
      price: 'R$ 520.000',
      featured: false
    }
  ]

  return (
    <section id="imoveis" className="properties section">
      <div className="container">
        <div className="properties-header">
          <h2 className="section-title">Nossos Imóveis</h2>
          <p className="section-subtitle">
            Confira nossa seleção de imóveis em Natal e RN
          </p>
        </div>

        <div className="properties-grid">
          {properties.map((property) => (
            <div key={property.id} className={`property-card ${property.featured ? 'featured' : ''}`}>
              {property.featured && <span className="badge">Destaque</span>}
              
              <div className="property-image">
                <div className="placeholder-image">
                  <span className="placeholder-icon">🏠</span>
                </div>
              </div>

              <div className="property-content">
                <div className="property-type">{property.type}</div>
                <h3 className="property-location">{property.location}</h3>

                <div className="property-details">
                  {property.bedrooms > 0 && (
                    <div className="detail-item">
                      <span className="detail-icon">🛏️</span>
                      <span>{property.bedrooms} quartos</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="detail-item">
                      <span className="detail-icon">🚿</span>
                      <span>{property.bathrooms} banheiros</span>
                    </div>
                  )}
                  <div className="detail-item">
                    <span className="detail-icon">📏</span>
                    <span>{property.area}m²</span>
                  </div>
                </div>

                <div className="property-footer">
                  <div className="property-price">{property.price}</div>
                  <button className="btn-contact">Saiba Mais</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="properties-cta">
          <p>Não encontrou o que procura?</p>
          <button 
            className="btn btn-primary"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Entre em Contato
          </button>
        </div>
      </div>
    </section>
  )
}

export default Properties
