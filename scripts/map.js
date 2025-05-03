initMap();

async function initMap() {
    await ymaps3.ready;

    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
    } = ymaps3;

    const map = new YMap(document.getElementById('map'), {
        location: {
            center: [43.8346 ,43.8414 ],
            zoom: 10
        },
       
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const cities = [
        { name: 'Новопавловск', coords: [ 43.631910 ,43.957369] },
        { name: 'Прохладный', coords: [44.009983,  43.759045] },
        { name: 'Алтуд', coords: [43.870300,  43.720871] }
    ];

    for (const city of cities) {
        const markerElement = document.createElement('div');
        markerElement.classList.add('map-marker');
        markerElement.innerHTML = `
        <span class="name">${city.name}</span>
        `
        markerElement.title = city.name;

        const marker = new YMapMarker({ coordinates: city.coords }, markerElement);
        map.addChild(marker);
    }



}