interface IBorn {
    id: string | number | null,
    place_name: string,
    center: [number, number],
    statut_pdc: string
}

interface IFavoris {
    adresse: string,
    color: string,
    icon: string,
    id: number
    inserted_at: string,
    latitude: number
    longitude: number
    name: string,
    user_id: string
}