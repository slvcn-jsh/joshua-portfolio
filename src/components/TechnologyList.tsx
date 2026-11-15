import { BrandIcon } from './BrandIcon'

const evidence: Record<string, string> = {
  Kotlin: '/projects/pcosina#architecture',
  Python: '/projects/pcosina#engineering',
  TypeScript: '/projects/barion#architecture',
}

export function TechnologyList({
  items,
  primary = false,
}: {
  items: string[]
  primary?: boolean
}) {
  return (
    <ul
      className={`technology-list${primary ? ' primary-technologies' : ''}`}
      aria-label={
        primary ? 'Primary languages — explore project evidence' : undefined
      }
    >
      {items.map((name) => (
        <li key={name}>
          {primary ? (
            <a href={evidence[name]}>
              <BrandIcon name={name} />
              <span>{name}</span>
            </a>
          ) : (
            <span className="technology-item">
              <BrandIcon name={name} />
              <span>{name}</span>
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
