<template>
  <div class="container-fluid green-section pt-5 pb-3">
    <div class="container" id="checklist-container">
      <h1 class="text-center mb-4">{{ $t('title') }}</h1>

      <div class="d-flex justify-content-between mb-4">
        <button
          class="btn btn-light btn-sm d-flex align-items-center"
          @click="exportarPDF"
          title="{{ $t('exportPdfTooltip') }}"
        >
          <i class="bi bi-file-earmark-pdf me-2"></i> {{ $t('exportPdf') }}
        </button>

        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="wordpressSwitch"
            v-model="mostrarWordpressTareas"
            @change="saveTareasToLocalStorage"
          />
          <label class="form-check-label" for="wordpressSwitch">{{ $t('wordpressSwitch') }}</label>
        </div>
      </div>

      <div class="row">
        <div v-for="tarea in tareasOrdenadas" :key="tarea.id" class="col-md-6 mb-3">
          <div
            :class="[
              'card',
              tarea.isWordpress ? 'wp-card' : '',
              tarea.completada ? 'bg-light border-secondary' : 'border-2'
            ]"
          >
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <input
                  class="form-check-input me-2 custom-checkbox"
                  type="checkbox"
                  :checked="tarea.completada"
                  :id="'tarea-' + tarea.id"
                  @change="updateTarea(tarea)"
                />
                <label class="form-check-label" :for="'tarea-' + tarea.id">
                  <span
                    :class="{ 'text-muted': tarea.completada }"
                    class="fw-bold"
                    :style="{ color: tarea.completada ? 'inherit' : 'var(--vt-blue)' }"
                  >
                    {{ tarea.titulo }}
                  </span>
                </label>
                <div v-if="tarea.isWordpress" class="wp-icon-container ms-auto">
                  <i class="bi bi-wordpress wp-icon"></i>
                </div>
              </div>
              <p class="card-text" :class="{ 'text-muted': tarea.completada }">
                {{ tarea.descripcion }}
              </p>

              <button class="btn btn-link" @click="toggleExtraInfo(tarea)">
                <i :class="tarea.mostrarContenido ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                {{ tarea.mostrarContenido ? $t('hideInfo') : $t('showInfo') }}
              </button>

              <div v-if="tarea.mostrarContenido">
                <p class="fw-bold">{{ $t('details') }}:</p>
                <p class="card-text">{{ tarea.detalles }}</p>
                <div v-if="tarea.tips.length > 0">
                  <p class="fw-bold">{{ $t('tips') }}:</p>
                  <ul>
                    <li v-for="tip in tarea.tips" :key="tip">{{ tip }}</li>
                  </ul>
                </div>
                <div v-if="tarea.enlaces.length > 0">
                  <p class="fw-bold">{{ $t('links') }}:</p>
                  <ul>
                    <li v-for="enlace in tarea.enlaces" :key="enlace.url">
                      <a :href="enlace.url" target="_blank">{{ enlace.texto }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'

export default {
  data() {
    return {
      mostrarWordpressTareas: false,
      tareas: []
    }
  },
  computed: {
    tareasOrdenadas() {
      const tareasFiltradas = this.tareas.filter(
        (t) => !t.isWordpress || this.mostrarWordpressTareas
      )
      return [
        ...tareasFiltradas.filter((t) => !t.completada),
        ...tareasFiltradas.filter((t) => t.completada)
      ]
    }
  },
  methods: {
    exportarPDF() {
      const element = document.querySelector('#checklist-container')
      html2pdf(element)
    },
    updateTarea(tarea) {
      tarea.completada = !tarea.completada
      if (!tarea.completada) {
        tarea.mostrarContenido = false // Colapsar el contenido extra si la tarea no está completada
      }
      this.saveTareasToLocalStorage()
    },
    toggleExtraInfo(tarea) {
      tarea.mostrarContenido = !tarea.mostrarContenido
    },
    saveTareasToLocalStorage() {
      const tareasGuardadas = {
        mostrarWordpressTareas: this.mostrarWordpressTareas,
        tareas: this.tareas.map((t) => ({
          id: t.id,
          completada: t.completada,
          isWordpress: t.isWordpress
        }))
      }
      localStorage.setItem('tareas', JSON.stringify(tareasGuardadas))
    },
    loadTareasFromLocalStorage() {
      const tareasGuardadas = localStorage.getItem('tareas')
      if (tareasGuardadas) {
        const datos = JSON.parse(tareasGuardadas)
        this.mostrarWordpressTareas = datos.mostrarWordpressTareas
        this.tareas = this.$i18n.messages[this.$i18n.locale].recommendations.map((tarea) => {
          const guardada = datos.tareas.find((t) => t.id === tarea.id)
          return {
            ...tarea,
            completada: guardada ? guardada.completada : tarea.completada,
            mostrarContenido: false
          }
        })
      } else {
        this.tareas = this.$i18n.messages[this.$i18n.locale].recommendations
      }
    }
  },
  mounted() {
    this.loadTareasFromLocalStorage()
  }
}
</script>

<style scoped>
.card {
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.card-body {
  padding: 1.25rem;
}
.bg-light {
  background-color: var(--vt-green) !important;
}
.border-2 {
  border: 2px solid var(--vt-blue);
}
.wp-card {
  border: 2px solid var(--vt-blue);
}
.wp-icon-container {
  border: 2px solid var(--vt-blue);
  border-radius: 4px;
  padding: 5px;
  color: white;
  background-color: var(--vt-blue);
  display: flex;
  align-items: center;
  justify-content: center;
}
.wp-icon {
  font-size: 1.25rem;
}
.custom-checkbox {
  transform: scale(1.25);
}
.form-check-label {
  margin-bottom: 0;
}
.btn-link {
  color: var(--vt-blue);
  font-weight: 500;
}
.btn-link:hover {
  color: var(--vt-purple);
}
.card-text a {
  color: var(--vt-blue);
}
.card-text a:hover {
  text-decoration: underline;
}
</style>
