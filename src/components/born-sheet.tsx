import React from 'react';
import { IonButton, IonModal } from '@ionic/react';

export function BornSheet () {
  const [showModal, setShowModal] = React.useState(false);
  
  return (
    <div>
      <IonButton onClick={() => setShowModal(true)}>Open Modal</IonButton>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <p>This is the content of the modal.</p>
        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
      </IonModal>
    </div>
  );
}

export default BornSheet
