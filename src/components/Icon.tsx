import { icons } from 'lucide-react';

//@ts-ignore
const Icon = ({ name, size }) => {
    //@ts-ignore
    const LucideIcon = icons[name];

    return <LucideIcon size={size} />;
};

export default Icon;