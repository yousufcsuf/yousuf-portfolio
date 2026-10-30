export function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M42 9Q45 0 50 0T58 9L66 34L91 42Q100 45 100 50T91 58L66 66L58 91Q55 100 50 100T42 91L34 66L9 58Q0 55 0 50T9 42L34 34Z" />
    </svg>
  );
}
