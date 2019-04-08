const listadoglobal = [];

Vue.component("comp-elementolista", {
  props: ["producto"],
  template: "#plantilla-com-elementolista",
  methods: {
    CambiarEstilo() {
      this.$emit("clickcheck");
    },
    EliminarElemento() {
      this.$emit("clickdelete");
    }
  }
});

Vue.component("barra-progreso", {
  template: "#plantilla-barra-progreso",
  props: ["porcentaje"],
  computed: {
    ...Vuex.mapState(["mititulo", "mitexto", "contador"])
  }
});

Vue.component("mensaje-error", {
  template: "#plantilla-mensaje-error"
});

const ListadoCompra = Vue.component("comp-listado-compra", {
  template: "#t-listado-compra",
  data() {
    return {
      //titulo: "Mi Lista de la Compra con Vue.js",
      //titulo: store.state.mititulo,
      articulo: "",
      cantidad: 0,
      prioridad: "Baja"
      //listado: this.listadostore
    };
  },
  computed: {
    ...Vuex.mapState(["mititulo", "mitexto", "listadostore"]),
    ComprasHechas() {
      return this.listadostore.filter(elemento => elemento.estado);
    },
    Porcentaje() {
      return (
        (this.ComprasHechas.length * 100) /
        this.listadostore.length
      ).toFixed(2);
    },
    PorcentajeEnTantoPorCien() {
      return this.Porcentaje.toString() + "%";
    }
  },
  methods: {
    Agregar() {
      elemento = {
        art: this.articulo,
        can: this.cantidad,
        pri: this.prioridad,
        estado: false,
        id: Math.random()
          .toString()
          .substring(2, 9)
      };
      this.listadostore.push(elemento);
      console.log(this.listadostore);
      this.ResetValores();
    },
    ResetValores() {
      this.articulo = "";
      this.cantidad = 0;
      this.prioridad = "Baja";
    },
    ...Vuex.mapMutations(["EliminarStore"]),
    /* Eliminar(item) {
      indice = this.listadostore.indexOf(item);
      this.listadostore.splice(indice, 1);
    }, */
    CambiarEstado(item) {
      item.estado = !item.estado;
    }
  }
});

const ListadoComprasHechas = Vue.component("comp-listado-comprashechas", {
  data() {
    return {
      titulo: "Lista de Compras Hechas"
      //listado: listadoglobal
    };
  },
  computed: {
    ...Vuex.mapState(["mititulo", "mitexto", "listadostore"]),
    ...Vuex.mapGetters(["listadoComprasHechasStore"]),
    ListadoHechas() {
      return this.listadostore.filter(item => item.estado);
    }
  },
  /*html*/
  template: `
  <div>
    <div class="row cabecera justify-content-center mt-5" id="cabecera">
    <h1 id="titulo1">
      <i class="material-icons" style="font-size: 1em">shopping_cart</i>
      {{ titulo }}
    </h1>
    </div>
    <comp-elementolista
      v-for="(articulo, index) in listadoComprasHechasStore" :key="index"
      :producto="articulo">
    </comp-elementolista>
  </div>
  `
});

const AcercaDe = Vue.component("comp-acercade", {
  data() {
    return {
      titulo: "Información del Sitio Web"
    };
  },
  /*html*/
  template: `
  <div>
    <div class="row cabecera justify-content-center mt-5" id="cabecera">
    <h1 id="titulo1">
      <i class="material-icons" style="font-size: 1em">shopping_cart</i>
      {{ titulo }}
    </h1>
    </div>
  </div>
  `
});

const misrutas = [
  { path: "/", component: ListadoCompra },
  { path: "/miscompras", component: ListadoComprasHechas },
  { path: "/info", component: AcercaDe }
];

const router = new VueRouter({
  routes: misrutas
});

const store = new Vuex.Store({
  state: {
    mititulo: "Mi Lista de la Compra con Vue.js",
    mitexto: "",
    contador: 0,
    listadostore: []
  },
  getters: {
    listadoComprasHechasStore(state) {
      return state.listadostore.filter(item => item.estado);
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    EliminarStore(state, item) {
      indice = state.listadostore.indexOf(item);
      state.listadostore.splice(indice, 1);
    }
  }
});

const miapp = new Vue({
  router,
  store,
  el: "#contenedor",
  data: {},
  computed: {},
  methods: {}
});
