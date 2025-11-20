import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Footer } from "../footer/footer";
import { resetPassword, validateResetToken } from "../../services/recoveryService";

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || !email) {
        navigate("/");
        return;
      }

      try {
        await validateResetToken(email, token);
        setIsValidToken(true);
      } catch (err: any) {
        setIsValidToken(false);
        setError(err.message || "El enlace de recuperación no es válido o ha expirado.");
        setTimeout(() => navigate("/"), 3000);
      }
    };

    verifyToken();
  }, [token, email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(email!, token!, password, confirmPassword);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err: any) {
      setError(err.message || "Error al restablecer la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600">
        <p>🔄 Verificando enlace de recuperación...</p>
      </div>
    );
  }

  if (isValidToken === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center p-4">
        <div className="text-red-600 font-medium">
          ❌ {error || "El enlace de recuperación no es válido o ha expirado."}
          <p className="mt-2 text-gray-500 text-sm">Serás redirigido al inicio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-md border border-gray-100 bg-white">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-3">
              <div className="bg-blue-600 text-white p-3 rounded-full shadow-md">
                <i className="fas fa-lock text-lg"></i>
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Restablecer contraseña
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Ingresa y confirma tu nueva contraseña
            </p>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <div className="text-center text-green-600 font-medium py-4">
                ✅ Contraseña actualizada correctamente. <br />
                Redirigiendo al inicio de sesión...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password">Nueva contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="border-2 border-white border-t-transparent rounded-full w-5 h-5"
                      />
                      Procesando...
                    </>
                  ) : (
                    "Cambiar contraseña"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <Footer />
      </motion.div>
    </div>
  );
};
