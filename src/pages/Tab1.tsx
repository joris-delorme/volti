import { useEffect, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { MainMap } from '../components/map'
import { Geolocation } from '@capacitor/geolocation'

const Tab1: React.FC = () => {

  const [mapSetting, setMapSetting] = useState<{
    lat: null | number,
    lng: null | number,
    zoom: number
  }>({
    lat: null,
    lng: null,
    zoom: 5
  })

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition()
    setMapSetting({
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
      zoom: 10
    })
  }

  useEffect(() => {
    getCurrentPosition()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <MainMap lat={mapSetting.lat} lng={mapSetting.lng} zoom={mapSetting.zoom} />
      </IonContent>
    </IonPage>
  )
}

export default Tab1
