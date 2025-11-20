import { useState, useEffect } from "react";
import {
  Send, User, Building2, Mail, MapPin, Globe,
  Tags, Trash2, Plus
} from "lucide-react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "../ui/select";

import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { City } from "../../services/customerService";
import { registerBusiness } from "../../services/BusinessRegistration";
import { useData } from "../../context/DataContext";

const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
  iconSize: [35, 35],
});

export const ContactForm = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [countriess, setCountriess] = useState<{ country_id: string; name: string; cities?: City[] }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableCities, setAvailableCities] = useState<City[]>([]);
  const { categoriesAndBusinesses, countries, loading: contextLoading, error } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    description: "",
    address: "",
    category_id: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    email: "",
    website: "",
    schedule: [] as any[],
    social_media: [] as any[],
    country_id: "",
    city_id: "",
    lat: null as number | null,
    lng: null as number | null,
  });

  const initialFormState = { ...formData };

  const [socialInput, setSocialInput] = useState({ platform: "", url: "" });
  const [scheduleInput, setScheduleInput] = useState({ day: "", open: "", close: "" });

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const socialPlatforms = [
    { label: "Facebook", value: "facebook" },
    { label: "Instagram", value: "instagram" },
    { label: "X (Twitter)", value: "x" },
    { label: "TikTok", value: "tiktok" },
    { label: "YouTube", value: "youtube" },
    { label: "Sitio Web", value: "web" },
    { label: "Otro", value: "other" },
  ];
  const platformPrefixes: Record<string, string> = {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    x: "https://twitter.com/",
    youtube: "https://youtube.com/",
    tiktok: "https://tiktok.com/@",
  };

  // Cargar categorías y países de manera segura
  useEffect(() => {
    if (!contextLoading) {
      setCategories(categoriesAndBusinesses?.data ?? []);
      setCountriess(countries ?? []);
      setIsLoading(false);
    }
    if (error) {
      console.error("Error al cargar categoriesAndBusinesses:", error);
      setIsLoading(false);
      toast.error("Hubo un error al cargar las categorías.");
    }
  }, [categoriesAndBusinesses, countries, contextLoading, error]);

  // Filtrar ciudades cuando cambia el país
  useEffect(() => {
    if (selectedCountry) {
      const country = countriess.find(c => c.country_id === selectedCountry);
      setAvailableCities(country?.cities?.map(c => ({ id: c.city_id ?? c.id, name: c.name })) ?? []);
      setFormData(prev => ({ ...prev, city_id: "" }));
    } else {
      setAvailableCities([]);
    }
  }, [selectedCountry, countriess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlatformChange = (p: string) => setSocialInput({ platform: p, url: platformPrefixes[p] ?? "" });

  const addSocial = () => {
    if (!socialInput.platform || !socialInput.url) return toast.error("Completa la red social");
    setFormData(prev => ({ ...prev, social_media: [...prev.social_media, socialInput] }));
    setSocialInput({ platform: "", url: "" });
  };

  const addSchedule = () => {
    if (!scheduleInput.day || !scheduleInput.open || !scheduleInput.close) return toast.error("Completa el horario");
    setFormData(prev => ({ ...prev, schedule: [...prev.schedule, scheduleInput] }));
    setScheduleInput({ day: "", open: "", close: "" });
  };

  const removeItem = (field: "schedule" | "social_media", index: number) =>
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_: any, i: number) => i !== index) }));

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setFormData(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng }));
      },
    });
    return formData.lat ? <Marker position={[formData.lat, formData.lng]} icon={markerIcon} /> : null;
  };

  const FlyToLocation = () => {
    const map = useMap();
    if (formData.lat && formData.lng) map.flyTo([formData.lat, formData.lng], 16);
    return null;
  };

  const handleLocateMe = () => {
    navigator.geolocation?.getCurrentPosition(
      pos => setFormData(prev => ({ ...prev, lat: pos.coords.latitude, lng: pos.coords.longitude })),
      () => toast.error("No se pudo obtener tu ubicación 🥲")
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.category_id) return toast.error("Debes seleccionar una categoría");
    if (!formData.city_id) return toast.error("Debes seleccionar una ciudad");
    if (!formData.lat || !formData.lng) return toast.error("Debes seleccionar una ubicación en el mapa");
    if (formData.schedule.length === 0) return toast.error("Debes agregar al menos un horario");

    setLoading(true);
    try {
      toast.info("Enviando información...");
      await registerBusiness(formData);
      toast.success("Negocio registrado correctamente");
      setFormData(initialFormState);
      setSelectedCountry("");
      setAvailableCities([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      console.error("Error registrando negocio:", error);
      toast.error(error?.response?.data?.message ?? error.message ?? "Error al registrar el negocio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 sm:p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-center">Registro de Negocio</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* NOMBRE / NEGOCIO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup icon={User} label="Tu Nombre *" name="name" required value={formData.name} onChange={handleInputChange} />
          <InputGroup icon={Building2} label="Nombre del Negocio *" name="businessName" required value={formData.businessName} onChange={handleInputChange} />
        </div>

        <TextareaGroup label="Descripción" name="description" value={formData.description} onChange={handleInputChange} />

        <InputGroup icon={MapPin} label="Dirección *" name="address" required value={formData.address} onChange={handleInputChange} />

        {/* CATEGORÍA */}
        <div>
          <Label>Categoría *</Label>
          <div className="flex gap-2 mt-1">
            <Select value={formData.category_id} onValueChange={v => setFormData({ ...formData, category_id: v })}>
              <SelectTrigger className="h-11 flex-1">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? categories.map(c => (
                  <SelectItem key={c.category_id} value={String(c.category_id)}>{c.name}</SelectItem>
                )) : <SelectItem disabled value="none">Cargando categorías...</SelectItem>}
              </SelectContent>
            </Select>
            <Tags className="text-gray-400 self-center" />
          </div>
        </div>

        {/* CONTACTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputGroup name="phone1" label="Teléfono Principal *" required value={formData.phone1} onChange={handleInputChange} />
          <InputGroup name="phone2" label="Teléfono Secundario" value={formData.phone2} onChange={handleInputChange} />
          <InputGroup name="whatsapp" label="WhatsApp *" required value={formData.whatsapp} onChange={handleInputChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup icon={Mail} label="Email *" name="email" required value={formData.email} onChange={handleInputChange} />
          <InputGroup icon={Globe} label="Sitio Web" name="website" value={formData.website} onChange={handleInputChange} />
        </div>

        {/* PAÍS */}
        <div>
          <Label>Selecciona tu país *</Label>
          <div className="flex gap-2 mt-2">
            <Select
              value={selectedCountry}
              onValueChange={v => {
                setSelectedCountry(v);
                setFormData(prev => ({ ...prev, country_id: v }));
              }}
            >
              <SelectTrigger className="flex-1 h-11">
                <SelectValue placeholder="Selecciona un país" />
              </SelectTrigger>
              <SelectContent>
                {countriess.length > 0 ? countriess.map(c => (
                  <SelectItem key={c.country_id} value={String(c.country_id)}>{c.name}</SelectItem>
                )) : <SelectItem disabled value="none">Cargando países...</SelectItem>}
              </SelectContent>
            </Select>
            <Globe className="w-6 h-6 text-gray-400 self-center" />
          </div>
        </div>

        {/* CIUDAD */}
        <div>
          <Label className="text-sm sm:text-base mb-2 block">Ciudad *</Label>
          <select
            className="border p-2 rounded-md w-full h-11"
            value={formData.city_id}
            onChange={e => setFormData({ ...formData, city_id: e.target.value })}
            disabled={availableCities.length === 0}
          >
            <option value="">Selecciona una ciudad</option>
            {availableCities.map(city => (
              <option key={city.id} value={String(city.id)}>{city.name}</option>
            ))}
          </select>
        </div>

        {/* HORARIO */}
        <Label className="font-medium">Horario *</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <select className="border p-2 rounded-md" value={scheduleInput.day} onChange={e => setScheduleInput({ ...scheduleInput, day: e.target.value })}>
            <option value="">Día</option>
            {daysOfWeek.map(d => <option key={d}>{d}</option>)}
          </select>
          <Input type="time" value={scheduleInput.open} onChange={e => setScheduleInput({ ...scheduleInput, open: e.target.value })} />
          <Input type="time" value={scheduleInput.close} onChange={e => setScheduleInput({ ...scheduleInput, close: e.target.value })} />
        </div>
        <Button type="button" variant="outline" onClick={addSchedule} className="flex gap-2"><Plus className="h-4" /> Agregar Horario</Button>
        {formData.schedule.length > 0 && (
          <div className="space-y-2 mt-2">
            {formData.schedule.map((s, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded flex justify-between">
                {s.day}: {s.open} - {s.close}
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => removeItem("schedule", i)} />
              </div>
            ))}
          </div>
        )}

        {/* REDES SOCIALES */}
        <Label className="font-medium">Redes Sociales</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select className="border p-2 rounded-md" value={socialInput.platform} onChange={e => handlePlatformChange(e.target.value)}>
            <option value="">Seleccionar plataforma</option>
            {socialPlatforms.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
          <Input placeholder="URL de la red social" value={socialInput.url} onChange={e => setSocialInput({ ...socialInput, url: e.target.value })} />
        </div>
        <Button type="button" variant="outline" onClick={addSocial} className="flex gap-2"><Plus className="h-4" /> Agregar Red</Button>
        {formData.social_media.length > 0 && (
          <div className="space-y-2 mt-2">
            {formData.social_media.map((item, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded flex justify-between">
                {item.platform} — {item.url}
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => removeItem("social_media", index)} />
              </div>
            ))}
          </div>
        )}

        {/* MAPA */}
        <Label className="font-medium">Ubicación en el mapa *</Label>
        <p className="text-sm text-gray-500">Haz clic en el mapa para marcar tu ubicación</p>
        <div className="relative">
          <MapContainer center={[18.7357, -70.1627]} zoom={7} style={{ height: "300px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker />
            <FlyToLocation />
          </MapContainer>
          <button type="button" onClick={handleLocateMe} className="absolute top-3 right-3 bg-white shadow-lg p-3 rounded-full z-[1000] border">📍</button>
        </div>
        {formData.lat && <p className="text-sm text-gray-500">Ubicación seleccionada ✓</p>}

        {/* BOTÓN SUBMIT */}
        <Button type="submit" disabled={loading} className="w-full h-12 flex items-center justify-center" style={{ backgroundColor: 'red' }}>
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Enviando...
            </div>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Enviar Registro
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

/* ------------------------------------------- */
/*               COMPONENTES                   */
/* ------------------------------------------- */
const InputGroup = ({ icon: Icon, label, ...rest }: any) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <div className="flex items-center gap-2 border rounded-md px-3 h-11 bg-white">
      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      <Input className="border-none focus-visible:ring-0" {...rest} />
    </div>
  </div>
);

const TextareaGroup = ({ label, ...rest }: any) => (
  <div className="space-y-1">
    <Label>{label}</Label>
    <Textarea rows={4} {...rest} />
  </div>
);
