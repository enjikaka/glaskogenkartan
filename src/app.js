import './components/lantmateriet-karta.js';
import './components/glaskogencard-buy.js';

if (document.location.href.includes('folkminnen')) {
  import('./components/folklore-article.js');

  document.body.classList.add('folkminnen');
}

const overnightCabinIcon = L.icon({
  iconUrl: 'img/overnight-cabin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20]
});

const farmIcon = L.icon({
  iconUrl: 'img/farm.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20]
});

const leanToIcon = L.icon({
  iconUrl: 'img/lean-to.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20]
});

const layByIcon = L.icon({
  iconUrl: 'img/lay-by.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20]
});

const folklorePlaceIcon = L.icon({
  iconUrl: 'img/folklore-place.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20]
});

const undefinedIcon = L.icon({
  iconUrl: 'img/undefined.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20]
});

function isApple (userAgent = navigator.userAgent) {
  const iPad = userAgent.match(/iPad/i);
  const iPhone = userAgent.match(/iPhone/i);
  const Safari = userAgent.match(/Safari/i);

  return Boolean(iPad || iPhone || Safari);
}

function getIconForFeature (feature) {
  if (feature.properties.type === 'FARM') {
    return farmIcon;
  }

  if (feature.properties.type === 'OVERNIGHT_CABIN') {
    return overnightCabinIcon;
  }

  if (feature.properties.type === 'LEAN_TO') {
    return leanToIcon;
  }

  if (feature.properties.type === 'LAY_BY') {
    return layByIcon;
  }

  if (feature.properties.type === 'FOLKLORE_PLACE') {
    return folklorePlaceIcon;
  }

  return undefinedIcon;
}

async function onEachFeature(feature, layer) {
  if (feature.properties) {
    const popupContent = [];

    if ('data' in feature.properties) {
      layer.on('click', () => {
        console.log('layer click');

        document.dispatchEvent(new CustomEvent('folklore:display', {
          detail: {
            url: 'data/' + feature.properties.data
          }
        }));
      }, false);
      return;
    }

    if (feature.properties.title) {
      popupContent.push(`<b>${feature.properties.title}</b>`);
    }

    if (feature.properties.type !== 'FARM') {
      popupContent.push(`Glaskogennummer: ${feature.properties.glaskogenNumber || 'okänt'}`);
    }

    if (feature.properties.bedCount) {
      popupContent.push(`Bäddar: ${feature.properties.bedCount}`);
    }

    if (feature.properties.desc) {
      popupContent.push(`${feature.properties.desc}`);
    }

    // popupContent.push(feature.geometry.coordinates.join(', '));

    layer.bindPopup(popupContent.join('<br>'));
  }
}

async function loadMarkersFromJSON({ map, path, color, fillColor }) {
  const response = await fetch(path);
  const json = await response.json();

  const pointToLayer = (feature, latlng) => L.marker(latlng, { icon: getIconForFeature(feature) });

  const markers = L.markerClusterGroup();

  L.geoJSON(json, { pointToLayer, onEachFeature }).addTo(markers);

  markers.addTo(map);
}

const loadLayBys = map => loadMarkersFromJSON({
  map,
  path: 'data/layBy.json'
});

const loadLeanTos = map => loadMarkersFromJSON({
  map,
  path: 'data/leanTo.json'
});

const loadOvernightCabins = map => loadMarkersFromJSON({
  map,
  path: 'data/overnightCabins.json'
});

const loadFolklorePlaces = map => loadMarkersFromJSON({
  map,
  path: 'data/folklorePlace.json'
});

async function loadMarkers (map) {
  if (
    document.location.pathname === '/folkminnen' ||
    document.location.hash === '#folkminnen'
  ) {
    loadFolklorePlaces(map);
  } else {
    loadOvernightCabins(map);
    loadLeanTos(map);
    loadLayBys(map);
  }
}

document.querySelector('header button').addEventListener('click', () => {
  const buyWindow = document.querySelector('glaskogencard-buy');
  const open = buyWindow.getAttribute('open');

  if (open) {
    buyWindow.removeAttribute('open');
  } else {
    buyWindow.setAttribute('open', '');
  }
})

document.addEventListener('map:ready', () => {
  const { leafletMap: map } = document.querySelector('lantmateriet-karta');

  const glaskogenBounds = new L.LatLngBounds([
    [59.61628, 12.21927], // Top left
    [59.36161, 12.60455] // Bottom right
  ]);

  const polylinePoints = [
    glaskogenBounds.getNorthWest(),
    glaskogenBounds.getNorthEast(),
    glaskogenBounds.getSouthEast(),
    glaskogenBounds.getSouthWest(),
    glaskogenBounds.getNorthWest()
  ];

  L.polyline(polylinePoints, { color: '#BC5800' }).addTo(map);

  loadMarkers(map);

  map.setView(glaskogenBounds.getCenter(), 11);

  map.on('click', function(ev){
    const { lat, lng } = map.mouseEventToLatLng(ev.originalEvent);
    console.log(JSON.stringify([lng, lat]));
  });
});
