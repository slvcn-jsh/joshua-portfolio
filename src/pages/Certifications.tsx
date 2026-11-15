import { Download, Expand } from 'lucide-react'
import { PageIntro, ExternalLink } from '../components/Layout'
import { ImageViewer } from '../components/ImageViewer'
import { certificates } from '../content/certificates'

export function Certifications() {
  return (
    <div className="container page-bottom">
      <PageIntro title="Certifications">
        <p>
          Credentials in programming and enterprise technology, with the
          original documents available to inspect.
        </p>
      </PageIntro>
      <div className="certificate-list">
        {certificates.map((certificate) => {
          const image = {
            src: `/certificates/${certificate.slug}.webp`,
            width: 1584,
            height: 1224,
            alt: `${certificate.title} certificate awarded to Joshua Salvacion`,
            caption: `${certificate.title}. Original document issued ${certificate.issued}.`,
          }
          return (
            <article className="certificate" key={certificate.slug} data-reveal>
              <div className="certificate-copy">
                <p className="eyebrow">{certificate.category}</p>
                <h2>{certificate.title}</h2>
                <p className="certificate-issuer">{certificate.issuer}</p>
                <p className="muted">{certificate.description}</p>
                <dl className="certificate-facts">
                  <div>
                    <dt>Issued</dt>
                    <dd>{certificate.issued}</dd>
                  </div>
                  <div>
                    <dt>Validity on document</dt>
                    <dd>{certificate.validity}</dd>
                  </div>
                  {certificate.credentialId && (
                    <div>
                      <dt>Verification code</dt>
                      <dd>{certificate.credentialId}</dd>
                    </div>
                  )}
                </dl>
                <div className="certificate-actions">
                  <a
                    className="button button-secondary"
                    href={`/certificates/${certificate.slug}.pdf`}
                    download
                  >
                    Download PDF <Download size={16} aria-hidden="true" />
                  </a>
                  <ExternalLink href={`/certificates/${certificate.slug}.pdf`}>
                    Open original PDF
                  </ExternalLink>
                </div>
                <ExternalLink href={certificate.verification}>
                  {certificate.verificationLabel}
                </ExternalLink>
              </div>
              <figure className="certificate-preview">
                <ImageViewer
                  image={image}
                  label="Certificate preview"
                  className="certificate-image-link"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                  />
                  <span className="certificate-enlarge">
                    <Expand size={15} aria-hidden="true" /> Enlarge certificate
                  </span>
                </ImageViewer>
                <figcaption>
                  Preview of the original document. Download the PDF for full
                  detail.
                </figcaption>
              </figure>
            </article>
          )
        })}
      </div>
    </div>
  )
}
