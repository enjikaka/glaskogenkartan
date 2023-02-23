import{Component as s,registerComponent as r}from"webact";class o extends s{constructor(){super(import.meta.url),this._loaded=!1}get leafletMap(){return this.map}componentDidMount(){this.map=L.map(this.$("#map"),{center:[59.9573174,15.4233244],zoom:6,maxZoom:14,minZoom:0});const e="34e74c1ea77e95deaceeee7864c5c83",t=L.tileLayer.wms(`https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/${e}/?`,{layers:"topowebb",maxZoom:14,minZoom:0,attribution:'<a href="https://www.lantmateriet.se/sv/Kartor-och-geografisk-information/oppna-data/">Lantm\xE4teriet</a>'});this.map.addLayer(t),this.map.on("zoomlevelschange",a=>console.log(a)),window.dispatchEvent(new Event("resize")),document.dispatchEvent(new CustomEvent("map:ready"))}render(){return`
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
    `}}var l=r(o,{name:"lantmateriet-karta"});export{l as default};
