import { useEffect, useRef } from "react";
import mapboxgl, { Map } from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yaXNkZWxvcm1lIiwiYSI6ImNsbXU3MzEwZjBicHgycW1xNG1hN29ldXIifQ.ommqbzSD7Ey152shCR1ZIQ';

export function MainMap({ lng, lat, zoom }: { lng: number | null, lat: number | null, zoom: number }) {

    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<Map | null>(null);

    useEffect(() => {
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current as HTMLElement,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [2.35, 48.85],
                zoom: zoom
            })
            map.current.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            }))
            map.current.on('load', () => {
                if (!map.current) return
                map.current.addSource('earthquakes', {
                    type: 'geojson',
                    data: 'https://www.jorisdelorme.fr/dataset.geojson',
                    cluster: true,
                    clusterMaxZoom: 11,
                    clusterRadius: 50
                })

                map.current.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'earthquakes',
                    filter: ['has', 'point_count'],
                    paint: {
                        // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
                        // with three steps to implement three types of circles:
                        //   * Blue, 20px circles when point count is less than 100
                        //   * Yellow, 30px circles when point count is between 100 and 750
                        //   * Pink, 40px circles when point count is greater than or equal to 750
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#7DF37B',
                            100,
                            '#71E46F',
                            750,
                            '#48B146'
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40
                        ]
                    }
                });
        
                map.current.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'earthquakes',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }
                });
        
                map.current.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'earthquakes',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#81F87F',
                        'circle-radius': 10,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#fff'
                    }
                });

                map.current.on('click', 'clusters', (e) => {
                    if (!map.current) return
                    const features = map.current.queryRenderedFeatures(e.point, {
                        layers: ['clusters']
                    })

                    console.log(features[0].geometry)
                    
                    const clusterId = features[0].id
                    //@ts-ignore
                    map.current.getSource('earthquakes').getClusterExpansionZoom(
                        clusterId,
                        (err: Error, zoom: number) => {
                            if (err || !map.current) return
                            map.current.flyTo({
                                //@ts-ignore
                                center: features[0].geometry.coordinates,
                                zoom: zoom*1.1
                            });
                        })
                });

                map.current.on('click', 'unclustered-point', (e) => {
                    //@ts-ignore
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    //@ts-ignore
                    const mag = e.features[0].properties.mag;
                    //@ts-ignore
                    const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';
        
                    // Ensure that if the map is zoomed out such that
                    // multiple copies of the feature are visible, the
                    // popup appears over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
        
                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(
                            `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
                        )
                        //@ts-ignore
                        .addTo(map.current)
                });
        
                map.current.on('mouseenter', 'clusters', () => {
                    //@ts-ignore
                    map.current.getCanvas().style.cursor = 'pointer'
                });
                map.current.on('mouseleave', 'clusters', () => {
                    //@ts-ignore
                    map.current.getCanvas().style.cursor = ''
                });
            })
            } else {
                
                if(map.current && lat && lng) {
                map.current.flyTo({
                    //center: [lng, lat],
                    zoom: zoom
                })
            }
            
        }
    }, [lng, lat, zoom])

    return (
        <div className="fixed -z-10 top-0 h-screen w-screen">
            <div ref={mapContainer} className="h-screen w-full"></div>
        </div>
    )
}