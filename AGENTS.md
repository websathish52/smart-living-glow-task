> [!IMPORTANT]
> Avoid rewriting published git history — force pushing, or rebasing/amending/squashing
> commits that are already pushed — as this may cause the user to lose project history.
>
> Keep the connected branch in a working state.

- Keep the React + Vite bootstrap and the single-page experience in a focused browser-safe component.
- Keep page metadata in `index.html`.
- Use GSAP contexts and reduced-motion checks for animation, and revert contexts on unmount to prevent stale scroll triggers.
- Store downloaded reference media as imported asset pointers to keep binary files out of the repository.
