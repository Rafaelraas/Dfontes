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
      featured: true,
      status: 'available',
      description: 'Moderno apartamento em Ponta Negra, próximo à praia'
    },
    {
      id: 2,
      type: 'Casa',
      location: 'Candelária - Natal/RN',
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      price: 'R$ 680.000',
      featured: true,
      status: 'available',
      description: 'Casa ampla em bairro estabelecido de Natal'
    },
    {
      id: 3,
      type: 'Apartamento',
      location: 'Lagoa Nova - Natal/RN',
      bedrooms: 2,
      bathrooms: 1,
      area: 65,
      price: 'R$ 320.000',
      featured: false,
      status: 'available',
      description: 'Apartamento aconchegante em área central'
    },
    {
      id: 4,
      type: 'Terreno',
      location: 'Parnamirim - Grande Natal/RN',
      bedrooms: 0,
      bathrooms: 0,
      area: 360,
      price: 'R$ 180.000',
      featured: false,
      status: 'available',
      description: 'Terreno pronto para construção'
    },
    {
      id: 5,
      type: 'Casa',
      location: 'Tirol - Natal/RN',
      bedrooms: 5,
      bathrooms: 4,
      area: 250,
      price: 'R$ 1.200.000',
      featured: true,
      status: 'available',
      description: 'Casa de luxo em localização premium'
    },
    {
      id: 6,
      type: 'Apartamento',
      location: 'Capim Macio - Natal/RN',
      bedrooms: 3,
      bathrooms: 2,
      area: 95,
      price: 'R$ 520.000',
      featured: false,
      status: 'available',
      description: 'Apartamento espaçoso em bairro em crescimento'
    }
  ]

  return (
    <section id="imoveis" className="properties section" aria-label="Listagem de imóveis disponíveis">
      <div className="container">
        <div className="properties-header">
          <h2 className="section-title">Nossos Imóveis</h2>
          <p className="section-subtitle">
            Confira nossa seleção de imóveis em Natal e RN
          </p>
        </div>

        <div className="properties-grid" role="list">
          {properties.map((property) => (
            <article 
              key={property.id} 
              className={`property-card ${property.featured ? 'featured' : ''}`}
              role="listitem"
              aria-label={`${property.type} em ${property.location}`}
              data-property-id={property.id}
              data-property-type={property.type}
              data-property-status={property.status}
              data-property-price={property.price}
            >
              {property.featured && <span className="badge" aria-label="Propriedade em destaque">Destaque</span>}
              
              <div className="property-image" aria-hidden="true">
                <div className="placeholder-image">
                  <span className="placeholder-icon">🏠</span>
                </div>
              </div>

              <div className="property-content">
                <div className="property-type" aria-label="Tipo de imóvel">{property.type}</div>
                <h3 className="property-location">{property.location}</h3>
                
                {property.description && (
                  <p className="property-description" aria-label="Descrição do imóvel">
                    {property.description}
                  </p>
                )}

                <div className="property-details" aria-label="Características do imóvel">
                  {property.bedrooms > 0 && (
                    <div className="detail-item" aria-label={`${property.bedrooms} quartos`}>
                      <span className="detail-icon" aria-hidden="true">🛏️</span>
                      <span>{property.bedrooms} quarto{property.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="detail-item" aria-label={`${property.bathrooms} banheiros`}>
                      <span className="detail-icon" aria-hidden="true">🚿</span>
                      <span>{property.bathrooms} banheiro{property.bathrooms > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  <div className="detail-item" aria-label={`Área de ${property.area} metros quadrados`}>
                    <span className="detail-icon" aria-hidden="true">📏</span>
                    <span>{property.area}m²</span>
                  </div>
                </div>

                <div className="property-footer">
                  <div className="property-price" aria-label={`Preço: ${property.price}`}>{property.price}</div>
                  <button 
                    className="btn-contact"
                    aria-label={`Saiba mais sobre ${property.type} em ${property.location}`}
                    onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Saiba Mais
                  </button>
                </div>
              </div>
            </article>
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
