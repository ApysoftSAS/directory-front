import { Button } from "../ui/button";
import { MessageSquare, Mail } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const DirectContact = () => {
  const { siteConfig } = useApp();

  return (
    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center">
      <p className="text-sm sm:text-base text-gray-600 mb-4">
        ¿Prefieres contactarnos directamente?
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">

        <a
          href={`https://wa.me/${siteConfig.whatsappNumber?.replace(/\s+/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto"
        >
          <Button className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20BA5A] border-0">
            <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
          </Button>
        </a>

        <a href="mailto:contacto@Local Points.com" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Mail className="w-4 h-4 mr-2" /> Email
          </Button>
        </a>

      </div>
    </div>
  );
};
