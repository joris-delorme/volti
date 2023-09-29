import { IonContent, IonPage, useIonToast } from "@ionic/react";
import { Heart, Loader2, MapPin, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/utils";
import { Loader } from "./ui/loader";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFavoris } from "@/context/FavorisContext";
import { AddFavorisModal } from "./add-favoris";


const CircleLoader = ({ size = 120, strokeWidth = 10, prc }: { size?: number, strokeWidth?: number, prc: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <svg width={size} height={size} className="-rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#252525"
                strokeWidth={strokeWidth}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#1573FF"
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * prc}
            />
        </svg>
    );
};

export function Borne({ bornes, selectedBorne, setIsOpen }: { bornes: IBorn[], selectedBorne: IBorn | null, setIsOpen: (st: boolean) => void }) {

    return (
        <IonPage>
            <IonContent>
                <div className="flex px-8 pt-12 flex-col justify-center items-center gap-4">
                    <div className="grid w-full">
                        <MapPin />
                        <h1 className="mt-2 text-[24px] max-w-[250px] font-black">{selectedBorne?.place_name}</h1>
                        <p className="text-[18px] text-muted-foreground font-bold">Paris</p>

                        <div className="flex justify-between mt-6">
                            <div className="relative bg-secondary flex items-center justify-center h-[150px] w-[150px] rounded-xl">
                                <CircleLoader prc={(bornes.length - bornes.filter(borne => borne.statut_pdc === "Disponible").length) / bornes.length} />
                                <div className="flex flex-col gap-1 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <h3>{bornes.filter(borne => borne.statut_pdc === "Disponible").length}/{bornes.length}</h3>
                                    <p className="text-[7px] text-muted-foreground">Bornes disponibles</p>
                                </div>
                            </div>
                            <Button onClick={() => setIsOpen(true)} className="relative flex-col gap-2 bg-secondary flex items-center justify-center h-[150px] w-[150px] rounded-xl">
                                <Heart className="text-accent" size={70} />
                                <p className="text-[9px] text-muted-foreground">Ajouter aux favoris</p>
                            </Button>
                        </div>
                    </div>
                    <Button size='lg' onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${selectedBorne?.center[1]},${selectedBorne?.center[0]}`, '_blank')}>Google Maps</Button>
                </div>
                <div className="mt-56"></div>
            </IonContent>
        </IonPage>
    )
}