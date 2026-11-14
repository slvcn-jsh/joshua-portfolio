export type Walkthrough = {
  number: string
  title: string
  intro: string
  controls: [string, string]
  origin: string
  local: { title: string; text: string }
  remote: { title: string; text: string; states: [string, string] }
  results: [{ title: string; text: string }, { title: string; text: string }]
  limits: string
  evidence: { label: string; url: string }
}

export const walkthroughs: Record<string, Walkthrough> = {
  pcosina: {
    number: '01',
    title: 'What happens if the connection drops?',
    intro:
      'A saved week and a new plan take different paths. Explore why that matters.',
    controls: ['Connected', 'Connection lost'],
    origin: 'Android application',
    local: {
      title: 'Saved plans & groceries',
      text: 'Previously saved information stays available locally.',
    },
    remote: {
      title: 'Generate a new plan',
      text: 'Preferences go to the backend planning engine.',
      states: ['Requires connectivity', 'Unavailable without connection'],
    },
    results: [
      {
        title: 'Local continuity, remote generation.',
        text: 'Saving the returned plan separates everyday access from the availability of the planning service.',
      },
      {
        title: 'The connection stops. The saved week stays.',
        text: 'Viewing saved plans and groceries does not need a new API request. Creating a new plan still needs connectivity; this does not make the planner an offline service.',
      },
    ],
    limits:
      'With no connection, previously saved plans and groceries remain accessible; new generation is unavailable. An empty device has no saved week to show.',
    evidence: {
      label: 'Inspect the Android repository',
      url: 'https://github.com/slvcn-jsh/PCOSina/blob/1840999/app/src/main/java/com/pcosina/app/data/repository/MealPlanRepository.kt',
    },
  },
  barion: {
    number: '02',
    title: 'What happens if the AI service is unavailable?',
    intro:
      'Reviewing saved cards and generating new candidates are separate responsibilities.',
    controls: ['Service configured', 'AI service unavailable'],
    origin: 'Expo application',
    local: {
      title: 'Saved cards & reviews',
      text: 'SQLite and the local scheduler support the existing study loop.',
    },
    remote: {
      title: 'AI-assisted generation',
      text: 'An optional gateway requests source-grounded candidates.',
      states: ['Optional remote path', 'Remote generation unavailable'],
    },
    results: [
      {
        title: 'A service can help without owning the study loop.',
        text: 'Configured generation can request remote candidates. Reviewing cards already stored on the device does not depend on that service.',
      },
      {
        title: 'Keep studying. Change the generation path.',
        text: 'Saved-card review remains local. For supported source input, the generation code can fall back to local extractive candidates. Extraction is not an on-device language model, and its output still needs review.',
      },
    ],
    limits:
      'If the optional AI service is unavailable, saved-card review remains local. Generation can use the extractive fallback for valid, supported input; this does not guarantee a useful result for every source. Local review requires cards already on the device.',
    evidence: {
      label: 'Inspect generation & fallback',
      url: 'https://github.com/slvcn-jsh/barion/blob/7e83b70/src/ai/generate.ts',
    },
  },
}

export type Annotation = {
  label: string
  title: string
  text: string
  region: string
}

// Positions measured against the unchanged source captures. Text describes the
// pictured interface, not a claim about the current application release.
export const annotations: Record<
  string,
  { image: string; title: string; note: string; items: Annotation[] }
> = {
  pcosina: {
    image: '/images/pcosina-grocery.webp',
    title: 'A shopping list with context.',
    note: 'Existing PCOSina project capture. Highlighted regions explain this interface; displayed amounts are sample capture data, not measured outcomes.',
    items: [
      {
        label: 'What the user does',
        title: 'See what is still needed.',
        text: 'The grocery progress area separates remaining purchases from pantry matches. It gives the user a concrete next action: check the items still to buy.',
        region: 'grocery-progress',
      },
      {
        label: 'What the system handles',
        title: 'Keep estimates understandable.',
        text: 'The budget panel distinguishes the full shopping estimate from what remains to buy, and explains how pantry coverage affects the estimate.',
        region: 'grocery-budget',
      },
      {
        label: 'Why the decision matters',
        title: 'Put pantry context within reach.',
        text: 'The pantry entry point sits alongside the shopping workflow. The user can return to household ingredients without treating the grocery list as an isolated tool.',
        region: 'grocery-pantry',
      },
    ],
  },
  barion: {
    image: '/images/barion-review.webp',
    title: 'A card with a way back to its source.',
    note: 'Historical MedStudy interface from the Barion repository—not the current Barion branding. Annotations describe the visible capture only. Sample content is not medical advice.',
    items: [
      {
        label: 'What the user does',
        title: 'Recall before revealing.',
        text: 'The question is shown before the Reveal action. The interface gives the learner a moment to attempt recall instead of immediately displaying an answer.',
        region: 'review-reveal',
      },
      {
        label: 'What the system handles',
        title: 'Keep the source reference nearby.',
        text: 'A source label and page reference are displayed with the question. This capture shows how the review interface makes the original material discoverable.',
        region: 'review-source',
      },
      {
        label: 'Why the decision matters',
        title: 'Review one clear prompt.',
        text: 'The card gives the question the strongest emphasis, with the source immediately beneath it. The learning task stays readable while its evidence remains visible.',
        region: 'review-prompt',
      },
    ],
  },
}
