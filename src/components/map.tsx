import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import mapboxgl, { Map } from 'mapbox-gl';
import { useDarkMode } from "@/hook/useDarkMode";
import { markerImage } from "@/lib/constants";
import { useBorn } from "@/context/BornContext";

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yaXNkZWxvcm1lIiwiYSI6ImNsbXU3MzEwZjBicHgycW1xNG1hN29ldXIifQ.ommqbzSD7Ey152shCR1ZIQ';

export function MainMap({ getBornesDisponibility}: { getBornesDisponibility: (born: IBorn) => {} }) {

    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<Map | null>(null)
    const { selectedBorn, setData } = useBorn()
    const { isDarkMode} = useDarkMode()

    useEffect(() => {
        if (!map.current) return
        if (isDarkMode) {
            map.current.setStyle('mapbox://styles/mapbox/navigation-night-v1?optimize=true')
        } else {
            map.current.setStyle('mapbox://styles/mapbox/navigation-day-v1?optimize=true')
        }
    }, [isDarkMode])

    useEffect(() => {
        if (!map.current) {

            map.current = new mapboxgl.Map({
                container: mapContainer.current as HTMLElement,
                style: isDarkMode ? 'mapbox://styles/mapbox/navigation-night-v1?optimize=true' : 'mapbox://styles/mapbox/navigation-day-v1?optimize=true',
                center: [2.35, 48.85],
                zoom: 10,
                antialias: true
            })

            map.current.on('style.load', () => {
                if (!map.current) return
                map.current.resize()
                
                map.current.addSource('earthquakes', {
                    type: 'geojson',
                    data: 'https://www.jorisdelorme.fr/dataset.geojson',
                })

                map.current.loadImage(markerImage, (error, image) => {
                    if (error || !map.current) throw error
                    
                    console.log('Image:', image)
                    //@ts-ignore
                    map.current.addImage('icon-url', image)

                    map.current.addLayer({
                        id: 'unclustered-point',
                        type: 'symbol',
                        source: 'earthquakes',
                        filter: ['!', ['has', 'point_count']],
                        layout: {
                            'icon-image': 'icon-url',
                            'icon-size': 0.3
                        }
                    })
                })

                map.current.on('click', 'unclustered-point', (e) => {
                    //@ts-ignore
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    map.current?.flyTo({
                        center: [coordinates[0], coordinates[1] - (0.8 * window.innerHeight * (1 / (512 * Math.pow(2, 16))))],
                        zoom: 16
                    })
                    if (e.features) {
                        getBornesDisponibility({
                            id: e.features[0].id as string,
                            //@ts-ignore
                            place_name: e.features[0].properties.adresse_station,
                            //@ts-ignore
                            center: e.features[0].geometry.coordinates.slice(),
                            statut_pdc: ""
                        })
                        setData({
                            id: e.features[0].id as string,
                            //@ts-ignore
                            place_name: e.features[0].properties.adresse_station,
                            //@ts-ignore
                            center: e.features[0].geometry.coordinates.slice(),
                            statut_pdc: ""
                        })
                    }
                })
            })
        }
    }, [])

    useEffect(() => {
        if (selectedBorn) {
            map.current?.flyTo({
                center: selectedBorn.center,
                zoom: 16
            })
            
        }
    }, [selectedBorn])

    return (
        <div ref={mapContainer} className="absolute -z-10 top-0 bottom-0 w-full">
        </div>
    )
}