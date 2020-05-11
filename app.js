import './components/lantmateriet-karta.js';
import './components/reko-page.js';

const overnightCabinIcon = L.icon({
  iconUrl: 'img/overnight-cabin.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [32, 0]
});

const leanToIcon = L.icon({
  iconUrl: 'img/lean-to.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [32, 0]
});

const layByIcon = L.icon({
  iconUrl: 'img/lay-by.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [32, 0]
});

const undefinedIcon = L.icon({
  iconUrl: 'img/undefined.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [32, 0]
});

function getIconForFeature (feature) {
  if (feature.properties.type === 'OVERNIGHT_CABIN') {
    return overnightCabinIcon;
  }

  if (feature.properties.type === 'LEAN_TO') {
    return leanToIcon;
  }

  if (feature.properties.type === 'LAY_BY') {
    return layByIcon;
  }

  return undefinedIcon;
}

async function loadMarkersFromJSON({ map, path, color, fillColor }) {
  const response = await fetch(path);
  const json = await response.json();

  const pointToLayer = (feature, latlng) => L.marker(latlng, { icon: getIconForFeature(feature) });

  const markers = L.markerClusterGroup();

  L.geoJSON(json, { pointToLayer }).addTo(markers);

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

async function loadMarkers (map) {
  loadOvernightCabins(map);
  loadLeanTos(map);
  loadLayBys(map);
}

async function loadPage (event) {
  const rekoPage = document.querySelector('reko-page');

  rekoPage.setAttribute('page-id', event.detail.pageId);
}

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

  map.setView([59.48048673863045, 12.404165267944338], 11);

  loadMarkers(map);

  map.on('click', function(ev){
    const { lat, lng } = map.mouseEventToLatLng(ev.originalEvent);
    console.log(JSON.stringify([lng, lat]));
  });
});

document.addEventListener('show:page', event => loadPage(event));
document.addEventListener('DOMContentLoaded', () => {
  if (document.location.hash.includes('/page/')) {
    loadPage({
      detail: {
        pageId: document.location.hash.split('/page/')[1]
      }
    });
  }
});
