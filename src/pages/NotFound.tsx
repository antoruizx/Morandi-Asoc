import { Scale } from "lucide-react";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-4 text-center text-white">
    <Scale className="h-16 w-16 text-accent" strokeWidth={1} />
    <h1 className="mt-6 font-heading text-8xl font-semibold text-gold-gradient">404</h1>
    <p className="mt-4 text-lg text-white/60">Página no encontrada · Page not found</p>
    <a href="/" className="btn-gold mt-10">Volver al inicio</a>
  </div>
);

export default NotFound;
