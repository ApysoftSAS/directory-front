import { Card } from '../ui/card';

interface Props {
  icon: React.ReactNode;
  title: string;
  text: string;
  bgColor: string;
}

export const BenefitCard: React.FC<Props> = ({ icon, title, text, bgColor }) => (
  <Card className="p-4 sm:p-6 text-center">
    <div
      className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${bgColor}20` }}
    >
      {icon}
    </div>
    <h3 className="text-base sm:text-lg lg:text-xl mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{text}</p>
  </Card>
);
