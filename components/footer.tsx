import Link from "next/link";

export function Footer() {
  return (
    <footer className="page-container site-footer">
      <Link href="/" className="footer-name">Yousuf.</Link>
      <p>Software &amp; AI Engineering</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
