import { Component, registerComponent } from 'webact';

class LantmaterietKarta extends Component {
  constructor () {
    super(import.meta.url);

    this._loaded = false;
  }

  get leafletMap () {
    return this.map;
  }

  componentDidMount () {
    this.map = L.map(this.$('#map'), {
      center: [59.9573174, 15.4233244],
      zoom: 6,
      maxZoom: 14,
      minZoom: 0,
    });

    const apiKey = '34e74c1ea77e95deaceeee7864c5c83';

    const lantmateriet = L.tileLayer(`https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/${apiKey}/?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=topowebb&STYLE=default&TILEMATRIXSET=3857&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=image/png`, {
      maxZoom: 14,
      minZoom: 0,
      attribution: '<a href="https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/oppna-data/">Lantmäteriet</a>'
    });

    this.map.addLayer(lantmateriet);

    window.dispatchEvent(new Event('resize'));
    document.dispatchEvent(new CustomEvent('map:ready'));
  }

  render () {
    return `
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""/>
      <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css">
      <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css">
      <style>
      :host,
      #map {
        display: block;
        width: 100%;
        height: 100%;
      }
      </style>
      <div id="map" data-tap-disabled="true"></div>
    `;
  }
}

export default registerComponent(LantmaterietKarta, {
  name: 'lantmateriet-karta'
});
