import { useState } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, useIonToast } from '@ionic/react';
import { useFavoris } from '@/context/FavorisContext';
import Icon from './Icon';
import { Trash } from 'lucide-react';
import { supabase } from '@/lib/utils';
import { Loader } from './ui/loader';


const FavoriItem = ({ favori }: { favori: IFavoris }) => {

    const { setDeleteData } = useFavoris()
    const [present] = useIonToast()
    const [loading, setLoading] = useState(false)

    const handler = async () => {
        setLoading(true)
        const { error } = await supabase
            .from('favoris')
            .delete()
            .match({ id: favori.id, user_id: favori.user_id })

        if (error) {
            present({
                message: error?.message,
                duration: 1500,
                position: 'top',
                color: 'danger'
            })
            setLoading(false)
        } else {
            setDeleteData(favori.id)
        }
    }

    return (

        <div className="flex justify-between w-full">
            <div className="flex gap-4 items-center py-2 cursor-pointer">
                <div className="flex items-center justify-center h-[47px] w-[47px] bg-accent rounded-full" style={{ background: favori.color }}>
                    <span className="text-xl">{favori.icon}</span>
                </div>
                <div className="grid">
                    <p className="text-[18px] font-bold">{favori.name}</p>
                    <p className='text-muted-foreground text-xs'>{favori.adresse}</p>
                </div>
            </div>
            <button disabled={loading} onClick={() => handler()}>
                {loading ? <Loader /> : <Trash size={20} className='text-destructive' />}
            </button>
        </div>
    )
}

export function FavorisModal({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (st: boolean) => void}) {
    
    const { favoris } = useFavoris()
    return (
        <>
            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Favoris</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div className="gap-4 px-4">
                        {favoris.map((favori) => (
                            <div key={favori.id}>
                                <FavoriItem favori={favori} />
                                <div className="h-[1px] w-full bg-muted-foreground/20"></div>
                            </div>
                        ))}
                    </div>
                </IonContent>
            </IonModal>
        </>
    );
}
