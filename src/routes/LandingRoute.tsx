import { useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { LandingPage } from "../components/LandingPage";

export default function LandingRoute() {
  const { slug } = useParams();
  const { landings } = useApp();

  const landing = landings.find(l => l.slug === slug && l.published);

  if (!landing) return <>Landing no encontrada</>;

  return <LandingPage landing={landing} />;
}
