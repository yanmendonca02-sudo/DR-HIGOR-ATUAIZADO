import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-strong">
        Erro 404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Página não encontrada.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
        O endereço que você procurou não existe ou foi movido. Volte para a
        página inicial e continue explorando.
      </p>
      <Button
        asChild
        size="lg"
        className="mt-8 rounded-full bg-taupe text-brown-deep hover:bg-gold hover:text-brown-deep"
      >
        <Link to="/">Voltar ao início</Link>
      </Button>
    </motion.div>
  );
}
