<template>
  <div class="container-fluid green-section pt-5 pb-3">
    <div class="container" id="checklist-container">
      <h1 class="text-center mb-4">{{ $t('title') }}</h1>

      <div class="d-flex justify-content-between mb-4">
        <div class="btn-group" role="group" aria-label="Basic example">
          <button
            class="btn btn-light btn-sm d-flex align-items-center"
            @click="exportarPDF"
            :title="$t('exportPdfTooltip')"
          >
            <i class="bi bi-file-earmark-pdf me-2"></i> {{ $t('exportPdf') }}
          </button>
          <button
            class="btn btn-light btn-sm d-flex text-start"
            @click="reiniciarTareas"
            :title="$t('resetTooltip')"
          >
            <i class="bi bi-arrow-counterclockwise me-2"></i> {{ $t('reset') }}
          </button>
        </div>

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

      <transition-group name="fade" tag="div" class="row">
        <div v-for="tarea in tareasOrdenadas" :key="tarea.id" class="col-md-6 mb-3 fade-item">
          <div
            :class="[
              'card',
              tarea.isWordpress ? 'wp-card' : '',
              tarea.completada ? 'bg-light' : ''
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

              <div v-if="tarea.mostrarContenido" class="extra-info-card">
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
      </transition-group>
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
      const opt = {
        margin: 1,
        filename: 'Lista de Tareas de Seguridad Web.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }

      html2pdf().from(element).set(opt).save()
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
    },
    // Método para reiniciar las tareas sin confirmación
    reiniciarTareas() {
      // Elimina las tareas del localStorage
      localStorage.removeItem('tareas')

      // Recarga las tareas desde la fuente original y restablece el estado local
      this.tareas = this.$i18n.messages[this.$i18n.locale].recommendations.map((tarea) => ({
        ...tarea,
        completada: false, // Resetea el estado de completado
        mostrarContenido: false // Colapsa el contenido adicional
      }))

      // Reinicia también el switch de tareas de Wordpress
      this.mostrarWordpressTareas = false
    }
  },
  mounted() {
    this.loadTareasFromLocalStorage()
  }
}
</script>

<style scoped>
.card {
  transition: background-color 0.3s;
  border-radius: 8px;
}
.card-body {
  padding: 1.25rem;
}
.bg-light {
  background-color: var(--vt-green) !important;
}
.wp-card {
  border: 2px solid var(--vt-blue);
}
.wp-icon-container {
  border-radius: 4px;
  padding: 5px;
  color: white;
  background-color: var(--vt-blue); /* Fondo del icono */
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
.extra-info-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}
.extra-info-card p {
  margin: 0.5rem 0;
}
.fade-item {
  transition:
    transform 0.5s,
    opacity 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
