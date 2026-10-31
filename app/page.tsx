import { Hero } from "@/components/hero";
import { SelectedWork } from "@/components/selected-work";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <SelectedWork />
    </main>
  );
}
