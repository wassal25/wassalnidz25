
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContainer from "@/components/auth/AuthContainer";
import FormField from "@/components/auth/FormField";
import SubmitButton from "@/components/auth/SubmitButton";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(email, password, firstName, lastName);
      toast.success("Inscription réussie ! Vous êtes maintenant connecté.");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de l'inscription. Veuillez réessayer.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer
      title="Créer un compte"
      subtitle="Rejoignez notre communauté et commencez à voyager ensemble."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          id="firstName"
          label="Prénom"
          type="text"
          placeholder="Entrez votre prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        
        <FormField
          id="lastName"
          label="Nom"
          type="text"
          placeholder="Entrez votre nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="Entrez votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <FormField
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="Créez un mot de passe sécurisé"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <SubmitButton isLoading={isLoading}>Créer un compte</SubmitButton>
      </form>
      
      <div className="mt-6">
        <p className="text-center text-white/70">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-white hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
      
      <div className="mt-6">
        <p className="text-center text-white/70">
          Vous êtes un conducteur ?{" "}
          <Link to="/register-driver" className="text-white hover:underline">
            Inscrivez-vous en tant que conducteur
          </Link>
        </p>
      </div>
    </AuthContainer>
  );
};

export default Register;
