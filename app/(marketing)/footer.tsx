import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
    return(
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/HR-Croatia(Hrvatska).svg" alt="Croatian" height={32} width={40} className="mr-4 rounded-md"/>
                    Croatian
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/IN-India.svg" alt="India" height={32} width={40} className="mr-4 rounded-md"/>
                    Indian
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/ES-Spain.svg" alt="Spain" height={32} width={40} className="mr-4 rounded-md"/>
                    Spanish
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/DE-Germany.svg" alt="Germany" height={32} width={40} className="mr-4 rounded-md"/>
                    German
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/FR-France.svg" alt="France" height={32} width={40} className="mr-4 rounded-md"/>
                    French
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/IT-Italy.svg" alt="Italy" height={28} width={30} className="mr-4 rounded-md"/>
                    Italian
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="JP-Japan.svg" alt="Japan" height={32} width={40} className="mr-4 rounded-md"/>
                    Japanese
                </Button>
            </div>
            
        </footer>
    );
};