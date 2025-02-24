
const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDE1D3]/30 to-teal-600/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl animate-fade-up">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Connexion</h2>
        <form className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#FEC6A1]/50"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#FEC6A1]/50 hover:bg-[#FEC6A1]/60 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
