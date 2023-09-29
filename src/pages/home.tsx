import { useEffect, useRef, useState } from 'react';
import { MainMap } from '@/components/map';
import { IonContent, IonModal } from '@ionic/react';
import { SearchBornes } from '@/components/search';
import { Loader } from '@/components/ui/loader';
import axios from 'axios';
import { Borne } from '@/components/borne';
import { useBorn } from '@/context/BornContext';
import { AddFavorisModal } from '@/components/add-favoris';
import { FavorisModal } from '@/components/favoris-modal';

export function Home() {

    const modal = useRef<HTMLIonModalElement>(null);
    const modal2 = useRef<HTMLIonModalElement>(null);
    const [isBornModal, setIsBornModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState<any[]>([])
    const { selectedBorn } = useBorn()
    const [isFavorisModal, setIsFavorisModal] = useState(false)
    const [isAddFavorisModal, setAddIsFavorisModal] = useState(false)
    

    const getBornesDisponibility = async (born: IBorn) => {
        setIsBornModal(true)
        setIsLoading(true)
        try {
            const response = await axios.get(
                `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/belib-points-de-recharge-pour-vehicules-electriques-disponibilite-temps-reel/records`,
                {
                    params: {
                        where: `adresse_station like "${born?.place_name}"`,
                        limit: 100
                    }
                }
            );
            modal2.current?.setCurrentBreakpoint(0.65)
            setResults(response.data.results)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.error('Error searching location:', error);
        }
    }

    useEffect(() => {
        if (modal.current) {
            modal.current.setCurrentBreakpoint(0.35)
        }
    }, [selectedBorn])

    return (
        <div className="">
            <MainMap getBornesDisponibility={getBornesDisponibility} />
            <IonModal
                ref={modal}
                trigger="open-modal"
                isOpen={true}
                initialBreakpoint={0.35}
                breakpoints={[0.35, 0.5, 0.75]}
                backdropDismiss={false}
                backdropBreakpoint={0.5}
                onIonBreakpointDidChange={(e) => {
                    setIsBornModal(e.detail.breakpoint === 0.85 && selectedBorn !== null)
                }}
            >
                <SearchBornes setIsOpen={(st) => setIsFavorisModal(st)} modal={modal} />
            </IonModal>
            <IonModal
                ref={modal2}
                isOpen={isBornModal}
                initialBreakpoint={0.65}
                breakpoints={[0, 0.65]}
                backdropDismiss={false}
                backdropBreakpoint={0.5}
                onDidDismiss={() => setIsBornModal(false)}
            >
                <IonContent>
                    {
                        isLoading ?
                            <div className="h-full w-full flex pt-20 justify-center">
                                <Loader />
                            </div>
                            :
                            <div className="p-8">
                                <Borne bornes={results} selectedBorne={selectedBorn} setIsOpen={(st) => setAddIsFavorisModal(st)}  />
                            </div>
                    }
                </IonContent>
            </IonModal>
            <FavorisModal isOpen={isFavorisModal} setIsOpen={(st: boolean) => setIsFavorisModal(st)} />
            <AddFavorisModal isOpen={isAddFavorisModal} onClose={() => setAddIsFavorisModal(false)} />
        </div>
    )
}