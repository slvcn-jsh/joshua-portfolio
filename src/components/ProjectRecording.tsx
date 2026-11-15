import type { Project } from '../content/projects'

export function ProjectRecording({
  video,
}: {
  video: NonNullable<Project['video']>
}) {
  return (
    <details className="recording-disclosure">
      <summary>
        Watch the actual review workflow{' '}
        <span className="small muted">Silent video</span>
      </summary>
      <div className="recording-layout">
        <video
          controls
          playsInline
          preload="none"
          width="390"
          height="844"
          poster={video.poster}
          aria-label="Barion sample review workflow"
          aria-describedby="recording-context"
        >
          <source src={video.src} type="video/webm" />
          Your browser cannot play this recording. Use the download link or read
          the walkthrough.
        </video>
        <div>
          <h3>What happens in the recording</h3>
          <ol>
            {video.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p id="recording-context" className="small muted">
            {video.caption}
          </p>
          <a className="text-link" href={video.src} download>
            Download recording (WebM, 760 KB)
          </a>
        </div>
      </div>
    </details>
  )
}
