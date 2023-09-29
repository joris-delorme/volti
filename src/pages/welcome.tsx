import { Button } from "@/components/ui/button";
import { appIcon, welcomeImage } from "@/lib/constants";
import { IonContent, IonPage } from "@ionic/react";
import { Link } from "react-router-dom";

export function Welcome() {
    return (
        <IonPage>
            <IonContent className="welcome" style={{backgroundImage: `url(${welcomeImage})`}}>
                <div className="h-full flex justify-end p-8 pb-12 flex-col">
                    <img src={appIcon} height={70} width={70} alt="app icon" />
                    <h1 className="text-white text-5xl mt-6 mb-10 font-black">
                        Rechargez<br />
                        Relaxez<br />
                        Redécouvrez
                    </h1>
                    <Button size='lg' asChild><Link to='/signup'>Commencer</Link></Button>
                </div>
            </IonContent>
        </IonPage>
    )
}