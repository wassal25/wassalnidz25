
import { Copyright } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1B75BC] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-white/80">
              Wassalni est une plateforme de transport collaboratif qui connecte les voyageurs à travers l'Algérie.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Comment ça marche</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Contactez-nous</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/80">
              <li>Email: contact@wassalni.com</li>
              <li>Téléphone: +213 123 456 789</li>
              <li>Adresse: Constantine, Algérie</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 flex items-center justify-center text-white/60">
          <Copyright size={20} className="mr-2" />
          <p>2024 Wassalni. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
