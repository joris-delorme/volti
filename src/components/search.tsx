import { PARIS_BBOX } from "@/lib/constants";
import { IonContent, IonSearchbar } from "@ionic/react"
import axios from "axios";
import { MapPin } from "lucide-react"
import { RefObject, useState } from "react";
import { Profile } from "./profile";
import { useBorn } from "@/context/BornContext";

const LocationItem = ({ location }: { location: IBorn }) => (
    <div className="flex gap-4 items-center py-2 cursor-pointer">
        <div className="flex items-center justify-center h-[47px] w-[47px] bg-accent rounded-full">
            <MapPin color='#fff' size={20} />
        </div>
        <div className="grid">
            <p className="text-[18px]">{location.place_name.split(',')[0]}</p>
            <p className='text-muted-foreground'>{location.place_name.split(',')[1]}</p>
        </div>
    </div>
)

export function SearchBornes({ modal, setIsOpen }: { modal: RefObject<HTMLIonModalElement>, setIsOpen: (st: boolean) => void }) {
    const [results, setResults] = useState<IBorn[]>([])
    const { selectedBorn, setData } = useBorn()

    const searchLocation = async (query: string) => {
        try {
            const response = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`,
                {
                    params: {
                        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
                        limit: 10,
                        country: 'fr',
                        bbox: PARIS_BBOX.join(',')
                    }
                }
            );
            setResults(response.data.features)
        } catch (error) {
            console.error('Error searching location:', error);
        }
    }

    return (
        <IonContent >
            <div className="mt-4"></div>
            <IonSearchbar showCancelButton='focus' onClick={() => modal.current?.setCurrentBreakpoint(0.75)} placeholder="Search" type='text' onIonChange={(e) => {
                searchLocation(e.target.value as string)
            }}></IonSearchbar>
            {
                results.length ?
                    <IonContent>
                        <div className="gap-4 px-4">                            
                            {results.map((location) => (
                                <div key={location.id} onClick={() => {
                                    setData(location)
                                    modal.current?.setCurrentBreakpoint(0.25)
                                }}>
                                    <LocationItem location={location} />
                                    <div className="h-[1px] w-full bg-muted-foreground/20"></div>
                                </div>
                            ))}
                        </div>
                    </IonContent>
                    :
                    <Profile setIsOpen={setIsOpen} />
            }
        </IonContent>
    )
}