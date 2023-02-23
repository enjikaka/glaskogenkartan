import{Component as t,registerComponent as a}from"webact";class s extends t{constructor(){super(import.meta.url),this._loaded=!1}get leafletMap(){return this.map}componentDidMount(){this.map=L.map(this.$("#map"),{crs:L.CRS.EPSG3857,continuousWorld:!0,center:[59.9573174,15.4233244],zoom:6});const l="34e74c1ea77e95deaceeee7864c5c83",e=L.tileLayer.wms("https://mapslantmateriet.havochvatten.se/topowebb/wms/v1?",{layers:"topowebbkartan",detectRetina:!0});this.map.addLayer(e),window.dispatchEvent(new Event("resize")),document.dispatchEvent(new CustomEvent("map:ready"))}render(){return`
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
    `}}var i=a(s,{name:"lantmateriet-karta"});export{i as default};
