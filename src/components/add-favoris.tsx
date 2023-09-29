// AddTodoModal.jsx
import React, { useState } from 'react';
import {
    IonModal,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonInput,
    IonLabel,
    IonItem,
    useIonToast,
    IonHeader
} from '@ionic/react';
import { supabase } from '@/lib/utils';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { useBorn } from '@/context/BornContext';
import { useAuth } from '@/context/AuthContext';
import { useFavoris } from '@/context/FavorisContext';
import { SketchPicker } from 'react-color';


export const AddFavorisModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState('');
    const [loading, setLoading] = useState(false)
    const [present] = useIonToast()
    const { session } = useAuth()
    const { setSetData } = useFavoris()
    const { selectedBorn } = useBorn()
    const [color, setColor] = useState('#000000');

    const addToFavoris = async () => {

        setLoading(true)

        const { error } = await supabase
            .from('favoris')
            .insert([
                {
                    user_id: session?.user.id,
                    name: name,
                    icon: emoji,
                    color: color,
                    adresse: selectedBorn?.place_name,
                    longitude: selectedBorn?.center[0],
                    latitude: selectedBorn?.center[1]
                }
            ])

        const { data } = await supabase
            .from('favoris')
            .select('*')

        if (error) {
            present({
                message: error?.message,
                duration: 1500,
                position: 'top',
                color: 'danger'
            })
            setLoading(false)
        } else {
            present({
                message: 'Ajouté au favoris',
                duration: 1500,
                position: 'top',
                color: 'success'
            })
            onClose()
        }

        setLoading(false)
        setSetData(data as IFavoris[])
    }

    return (
        <IonModal isOpen={isOpen} className='ion-padding'>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Ajouté un favoris</IonTitle>
                    <IonButtons slot="start">
                        <IonButton onClick={onClose}>Annuler</IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton onClick={() => addToFavoris()}>Ajouté</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="p-4 grid gap-6">
                    <div className='grid gap-2'>
                        <Label>Emoji</Label>
                        <Input
                            value={emoji}
                            onChange={(e) => setEmoji(e.target.value)}
                            placeholder="🚀"
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Nom</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Travail"
                        />
                    </div>
                    <div className='grid gap-2'>
                        <Label>Couleur</Label>
                        <SketchPicker
                            color={color}
                            onChangeComplete={(colorResult) => setColor(colorResult.hex)}
                        />
                    </div>
                </div>
            </IonContent>
        </IonModal>
    );
};
