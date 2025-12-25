import { useState, useEffect } from 'react'
import './Properties.css'
import { pluralizePT, sortProperties } from '../utils/propertyHelpers'
import PropertyDetails from './PropertyDetails'
import { getProperties } from '../utils/storage'

function Properties() {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [properties, setProperties] = useState([])

  useEffect(() => {
    // Load properties from storage and sort with featured first
    const loadedProperties = getProperties()
    const sortedProperties = sortProperties(loadedProperties, 'featured-first')
    setProperties(sortedProperties)
  }, [])

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
                    <div className="detail-item" aria-label={`${property.bedrooms} ${pluralizePT(property.bedrooms, 'quarto')}`}>
                      <span className="detail-icon" aria-hidden="true">🛏️</span>
                      <span>{property.bedrooms} {pluralizePT(property.bedrooms, 'quarto')}</span>
                    </div>
                  )}
                  {property.bathrooms > 0 && (
                    <div className="detail-item" aria-label={`${property.bathrooms} ${pluralizePT(property.bathrooms, 'banheiro')}`}>
                      <span className="detail-icon" aria-hidden="true">🚿</span>
                      <span>{property.bathrooms} {pluralizePT(property.bathrooms, 'banheiro')}</span>
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
                    aria-label={`Ver detalhes sobre ${property.type} em ${property.location}`}
                    onClick={() => setSelectedProperty(property)}
                  >
                    Ver Detalhes
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

      {selectedProperty && (
        <PropertyDetails 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}
    </section>
  )
}

export default Properties
