initMap();

async function initMap() {
    await ymaps3.ready;

    const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapFeature
    } = ymaps3;

    const map = new YMap(document.getElementById('map'), {
        location: {
            center: [43.6346, 43.8414],
            zoom: 10.1,
        },
        mode: 'vector'
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const cities = [
        {
            name: 'Новопавловск',
            colorFill: '#51c25188',
            colorStroke: '#51c251',
            coords: [43.631910, 43.957369],
            polygon: [
                [43.603635, 43.97453],
                [43.619256, 43.982588],
                [43.632045, 43.972237],
                [43.642344, 43.983827],
                [43.654447, 43.978187],
                [43.659425, 43.978559],
                [43.660626, 43.978001],
                [43.651614, 43.96827],
                [43.664403, 43.957916],
                [43.666549, 43.952336],
                [43.673415, 43.9506],
                [43.666549, 43.946507],
                [43.664231, 43.94291],
                [43.648782, 43.946073],
                [43.631101, 43.943903],
                [43.632388, 43.930071],
                [43.610415, 43.938817],
                [43.611016, 43.941546],
                [43.598657, 43.94628],
                [43.611628, 43.963492],
                [43.603635, 43.97453]  
            ]
        },
        {
            name: 'Прохладный',
            colorFill: '#2c65d675',
            colorStroke: '#2C64D6',
            coords: [44.009983, 43.759045],
            polygon: [
                [43.970775, 43.75813],
                [43.972835, 43.768146],
                [43.98159, 43.773992],
                [43.970088, 43.784494],
                [43.973779, 43.787105],
                [43.99352, 43.778586],
                [43.993778, 43.78381],
                [44.019012, 43.774481],
                [44.018239, 43.769692],
                [44.047508, 43.764592],
                [44.056777, 43.769754],
                [44.093255, 43.771061],
                [44.093942, 43.763596],
                [44.09377, 43.751403],
                [44.081411, 43.737154],
                [44.062785, 43.732984],
                [44.050426, 43.725266],
                [43.989915, 43.745865],
                [43.970271, 43.738235],
                [43.947097, 43.743213],
                [43.962547, 43.754911],
                [43.94847, 43.755782],
                [43.947784, 43.758892],
                [43.970775, 43.75813]  
            ]
        },
        {
            name: 'Алтуд',
            coords: [43.870300, 43.720871],
            colorFill: '#2c65d675',
            colorStroke: '#2C64D6',
            polygon: [
                [43.8462, 43.724498],   
                [43.860705, 43.730474], 
                [43.895467, 43.72954],  
                [43.895037, 43.725494], 
                [43.901131, 43.724374], 
                [43.887313, 43.719145], 
                [43.888772, 43.711301], 
                [43.852551, 43.706195], 
                [43.847916, 43.711737], 
                [43.865168, 43.717869], 
                [43.864181, 43.723673], 
                [43.8462, 43.724498]
            ]
        }
    ];

    for (const city of cities) {
        // Создаем маркер
        const markerElement = document.createElement('div');
        markerElement.classList.add('map-marker');
        markerElement.setAttribute('style', `outline: 4px solid ${city.colorStroke}; background-color:  ${city.colorStroke};`)
        markerElement.innerHTML = `<span class="name">${city.name}</span>`;
        markerElement.title = city.name;

        const marker = new YMapMarker({ coordinates: city.coords }, markerElement);
        map.addChild(marker);

        // Создаем полигон
        const polygon = new YMapFeature({
            geometry: {
                type: 'Polygon',
                coordinates: [city.polygon] 
            },
            style: {
                stroke: [{ width: 2, color: city.colorStroke }],
                fill: city.colorFill 
            },
            properties: { title: city.name }
        });
        map.addChild(polygon);
    }
}