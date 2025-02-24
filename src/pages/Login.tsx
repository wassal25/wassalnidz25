
const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Image d'arrière-plan représentant le covoiturage */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1469041797191-50ace28483c3?q=80&w=2070")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Overlay gradient pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/50 via-transparent to-[#45B39D]/50 z-0" />
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl animate-fade-up border border-white/20 relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          WASSALNI
        </h2>
        <p className="text-white/90 text-center mb-8 text-sm">
          Voyagez ensemble, en toute sécurité
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="text-white/90 text-sm font-medium mb-2 block">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Entrez votre email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white/90 text-sm font-medium mb-2 block">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50 transition-all duration-300"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-white/90">
              <input type="checkbox" className="mr-2 rounded bg-white/10 border-white/20" />
              Se souvenir de moi
            </label>
            <a href="#" className="text-white/90 hover:text-white transition-colors">
              Mot de passe oublié ?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#FEC6A1]/80 to-[#45B39D]/80 hover:from-[#FEC6A1]/90 hover:to-[#45B39D]/90 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm font-medium text-lg"
          >
            Se connecter
          </button>
          <p className="text-center text-white/90 mt-4">
            Vous n'avez pas de compte ?{" "}
            <a href="#" className="text-white hover:underline font-medium">
              S'inscrire
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
