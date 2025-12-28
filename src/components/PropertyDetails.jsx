import { pluralizePT } from '../utils/propertyHelpers'
import './PropertyDetails.css'

function PropertyDetails({ property, onClose }) {
  if (!property) return null

  const handleQuoteRequest = () => {
    // Scroll to contact section and pre-fill with property info
    const contactSection = document.getElementById('contato')
    if (contactSection) {
      onClose()
      contactSection.scrollIntoView({ behavior: 'smooth' })
      
      // Try to fill contact form if inputs exist
      setTimeout(() => {
        const messageInput = document.querySelector('#contato textarea')
        if (messageInput) {
          messageInput.value = `Olá, gostaria de realizar uma proposta para o ${property.type} localizado em ${property.location} (${property.price}). Aguardo retorno.`
          messageInput.focus()
        }
      }, 800)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('property-details-overlay')) {
      onClose()
    }
  }

  return (
    <div 
      className="property-details-overlay" 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-details-title"
    >
      <div className="property-details-modal">
        <button 
          className="close-button" 
          onClick={onClose}
          aria-label="Fechar detalhes do imóvel"
        >
          ×
        </button>

        <div className="property-details-content">
          {property.featured && (
            <span className="badge-details" aria-label="Propriedade em destaque">
              Destaque
            </span>
          )}

          <div className="property-details-image">
            <div className="placeholder-image-large">
              <span className="placeholder-icon-large">🏠</span>
            </div>
          </div>

          <div className="property-details-info">
            <div className="property-type-details">{property.type}</div>
            <h2 id="property-details-title" className="property-location-details">
              {property.location}
            </h2>
            
            {property.description && (
              <p className="property-description-details">
                {property.description}
              </p>
            )}

            <div className="property-specs">
              <h3 className="specs-title">Características</h3>
              <div className="specs-grid">
                {property.bedrooms > 0 && (
                  <div className="spec-item">
                    <span className="spec-icon" aria-hidden="true">🛏️</span>
                    <div>
                      <div className="spec-label">Quartos</div>
                      <div className="spec-value">{property.bedrooms} {pluralizePT(property.bedrooms, 'quarto')}</div>
                    </div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="spec-item">
                    <span className="spec-icon" aria-hidden="true">🚿</span>
                    <div>
                      <div className="spec-label">Banheiros</div>
                      <div className="spec-value">{property.bathrooms} {pluralizePT(property.bathrooms, 'banheiro')}</div>
                    </div>
                  </div>
                )}
                <div className="spec-item">
                  <span className="spec-icon" aria-hidden="true">📏</span>
                  <div>
                    <div className="spec-label">Área</div>
                    <div className="spec-value">{property.area}m²</div>
                  </div>
                </div>
                <div className="spec-item">
                  <span className="spec-icon" aria-hidden="true">📍</span>
                  <div>
                    <div className="spec-label">Status</div>
                    <div className="spec-value">Disponível</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="property-details-footer">
              <div className="property-price-details">
                <div className="price-label">Preço</div>
                <div className="price-value">{property.price}</div>
              </div>
              <button 
                className="btn-quote"
                onClick={handleQuoteRequest}
                aria-label="Efetuar proposta para este imóvel"
              >
                Efetuar Proposta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails
