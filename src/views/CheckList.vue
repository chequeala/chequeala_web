<template>
  <div class="container-fluid green-section pt-5 pb-3">
    <div class="container" id="checklist-container">
      <h1 class="text-center mb-4">Checklist de Seguridad Web</h1>

      <!-- Contenedor para el botón de exportar y el switch -->
      <div class="d-flex justify-content-between mb-4">
        <!-- Botón para exportar PDF -->
        <button class="btn btn-light btn-sm d-flex align-items-center" @click="exportarPDF">
          <i class="bi bi-file-earmark-pdf me-2"></i> Exportar PDF
        </button>

        <!-- Checkbox para mostrar recomendaciones de WordPress -->
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="wordpressSwitch"
            v-model="mostrarWordpressTareas"
            @change="saveTareasToLocalStorage"
          />
          <label class="form-check-label" for="wordpressSwitch">
            Mostrar Recomendaciones de Seguridad para WordPress
          </label>
        </div>
      </div>

      <!-- Tarjetas con las Tareas -->
      <div class="row">
        <div v-for="tarea in tareasOrdenadas" :key="tarea.id" class="col-md-6 mb-3">
          <div
            :class="[
              'card',
              tarea.id > 10 ? 'wp-card' : '',
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
                <!-- Ícono para tareas de WordPress, movido a la derecha -->
                <div v-if="tarea.id > 10" class="wp-icon-container ms-auto">
                  <i class="bi bi-wordpress wp-icon"></i>
                </div>
              </div>
              <p class="card-text" :class="{ 'text-muted': tarea.completada }">
                {{ tarea.descripcion }}
              </p>

              <!-- Botón de despliegue para Material de Referencia con ícono -->
              <button class="btn btn-link" type="button" @click="toggleCollapse(tarea)">
                <i class="bi bi-info-circle me-2"></i> Mostrar Material de Referencia
              </button>

              <!-- Acordeón para contenido adicional -->
              <div
                :id="'collapse-' + tarea.id"
                class="collapse mt-3"
                :class="{ show: tarea.mostrarContenido }"
              >
                <div class="card card-body">
                  <div v-if="tarea.materialReferencia">
                    <h6>Material de Referencia:</h6>
                    <p>{{ tarea.materialReferencia.descripcion }}</p>
                    <ul>
                      <li v-for="(tip, index) in tarea.materialReferencia.tips" :key="index">
                        {{ tip }}
                      </li>
                    </ul>
                    <h6>Enlaces Externos:</h6>
                    <ul>
                      <li v-for="(enlace, index) in tarea.materialReferencia.enlaces" :key="index">
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
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'

export default {
  data() {
    return {
      mostrarWordpressTareas: false,
      tareas: [
        {
          id: 1,
          titulo: 'Actualizar Software',
          descripcion:
            'Asegúrate de que todo el software esté actualizado con los últimos parches de seguridad.',
          completada: false,
          mostrarContenido: false,
          materialReferencia: {
            descripcion: 'Actualiza todos los componentes del sistema',
            tips: [
              'Revisa la documentación del software',
              'Configura actualizaciones automáticas',
              'Consulta los boletines de seguridad'
            ],
            enlaces: [{ texto: 'Documentación de Actualización', url: 'https://example.com' }]
          }
        },
        {
          id: 2,
          titulo: 'Usar Contraseñas Fuertes',
          descripcion: 'Implementa contraseñas robustas y políticas de renovación.',
          completada: false,
          mostrarContenido: false,
          materialReferencia: {
            descripcion: 'Utiliza un gestor de contraseñas',
            tips: [
              'Evita contraseñas comunes',
              'Cambia las contraseñas periódicamente',
              'Usa autenticación de dos factores'
            ],
            enlaces: [{ texto: 'Guía de Contraseñas Seguras', url: 'https://example.com' }]
          }
        },
        // Tareas de WordPress
        {
          id: 11,
          titulo: 'Actualizar WordPress',
          descripcion: 'Asegúrate de que WordPress esté actualizado a la última versión.',
          completada: false,
          mostrarContenido: false,
          materialReferencia: {
            descripcion: 'Mantén tu WordPress al día',
            tips: [
              'Revisa actualizaciones regularmente',
              'Lee las notas de la versión',
              'Configura actualizaciones automáticas'
            ],
            enlaces: [{ texto: 'Guía de Actualización de WordPress', url: 'https://example.com' }]
          }
        },
        {
          id: 12,
          titulo: 'Revisar Plugins y Temas',
          descripcion:
            'Elimina plugins y temas no utilizados y asegúrate de que los instalados estén actualizados.',
          completada: false,
          mostrarContenido: false,
          materialReferencia: {
            descripcion: 'Gestiona plugins y temas con cuidado',
            tips: [
              'Elimina plugins y temas inactivos',
              'Actualiza los plugins y temas activos',
              'Revisa las reseñas y calificaciones'
            ],
            enlaces: [{ texto: 'Guía de Plugins y Temas', url: 'https://example.com' }]
          }
        }
      ]
    }
  },
  computed: {
    tareasOrdenadas() {
      const todasLasTareas = this.mostrarWordpressTareas
        ? [...this.tareas]
        : [...this.tareas.filter((t) => t.id <= 10)]
      return todasLasTareas.sort((a, b) => a.completada - b.completada)
    }
  },
  methods: {
    exportarPDF() {
      const element = document.querySelector('#checklist-container')
      const opt = {
        margin: [10, 10, 10, 10],
        filename: 'checklist-seguridad.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      html2pdf()
        .from(element)
        .set(opt)
        .toPdf()
        .get('pdf')
        .then(function (pdf) {
          const totalPages = pdf.internal.getNumberOfPages()
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)
            pdf.text('Página ' + i + ' de ' + totalPages, 15, 285)
          }
        })
        .save()
    },
    updateTarea(tarea) {
      tarea.completada = !tarea.completada
      if (tarea.completada) {
        tarea.mostrarContenido = false
      }
      this.saveTareasToLocalStorage()
    },
    toggleCollapse(tarea) {
      tarea.mostrarContenido = !tarea.mostrarContenido
      this.saveTareasToLocalStorage()
    },
    saveTareasToLocalStorage() {
      const todasLasTareas = this.tareas
      const tareasGuardadas = {
        mostrarWordpressTareas: this.mostrarWordpressTareas,
        tareas: todasLasTareas
      }
      localStorage.setItem('tareas', JSON.stringify(tareasGuardadas))
    },
    loadTareasFromLocalStorage() {
      const tareasGuardadas = localStorage.getItem('tareas')
      if (tareasGuardadas) {
        const datos = JSON.parse(tareasGuardadas)
        this.mostrarWordpressTareas = datos.mostrarWordpressTareas
        this.tareas = datos.tareas
      } else {
        // Inicializar tareas
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
  transition: background-color 0.3s;
  border-radius: 8px;
}
.bg-light {
  background-color: var(--vt-green) !important;
}
.wp-card {
  border: 2px solid var(--vt-blue);
}
.wp-icon-container {
  display: flex;
  align-items: center;
  background-color: var(--vt-blue);
  border-radius: 4px;
  padding: 0.5rem;
  color: var(--vt-green);
  position: absolute;
  right: 10px;
}
.wp-icon {
  font-size: 1.25rem;
}
.btn-light {
  background-color: #f8f9fa;
  color: #495057;
}
.btn-sm {
  font-size: 0.875rem;
}
.custom-checkbox:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.form-check-input {
  transform: scale(1.25);
}
.form-check-label {
  margin-bottom: 0;
}
.card-body {
  position: relative;
}
</style>
