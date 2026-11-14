import { useState } from 'react'

const choices = [
  {
    label: 'Pause all study until the service returns',
    response:
      'That would couple everyday review to a service it does not need. Barion keeps saved cards and scheduling local.',
  },
  {
    label: 'Keep reviewing cards saved on the device',
    response:
      'That is the implemented separation: existing cards and review state live locally. Optional generation is a different path.',
  },
  {
    label: 'Regenerate every card locally',
    response:
      'Existing cards do not need to be regenerated. Local extraction is a fallback for new candidates, not a replacement for the saved study library.',
  },
]

export function DecisionChallenge() {
  const [choice, setChoice] = useState<number | null>(null)
  return (
    <details className="decision-challenge">
      <summary>
        <span className="eyebrow">Your call</span>
        <span>A small engineering decision. No timer.</span>
      </summary>
      <div className="challenge-body">
        <h3>
          The AI service is unavailable. What should happen to saved cards?
        </h3>
        <p className="small muted">
          An optional design question based on Barion’s architecture—not a live
          application test.
        </p>
        <div
          className="challenge-options enhanced-only"
          role="group"
          aria-label="Choose a design decision"
        >
          {choices.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={choice === index}
              onClick={() => setChoice(index)}
            >
              <span className="node-number">0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div
          className="challenge-feedback"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {choice !== null ? (
            <>
              <h4>
                {choice === 1
                  ? 'The network took a break. Your flashcards didn’t.'
                  : 'Follow the dependency.'}
              </h4>
              <p>
                {choices[choice]?.response ??
                  'Barion keeps saved-card review local; AI-assisted generation is optional. An unavailable service does not have to interrupt that existing study loop.'}
              </p>
              <p className="small muted">
                This assumes valid cards are already stored on the device. It is
                not a guarantee that every other application feature works
                offline.
              </p>
            </>
          ) : (
            <p className="small muted">
              Choose an approach, or read the decision directly. Nothing is
              scored or recorded.
            </p>
          )}
        </div>
        <button
          type="button"
          className="text-link small enhanced-only"
          onClick={() => setChoice(3)}
        >
          Read the decision →
        </button>
        <noscript>
          <p>
            Barion stores cards and review events locally. Saved-card review
            does not depend on the optional AI service; local extraction is a
            separate fallback for generating new candidates.
          </p>
        </noscript>
      </div>
    </details>
  )
}
