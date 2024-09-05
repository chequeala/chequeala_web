<template>
  <div class="container-fluid green-section pt-5 pb-3">
    <div class="container" id="checklist-container">
      <h1 class="text-center mb-4">Checklist de Seguridad Web</h1>

      <!-- Botón para exportar PDF -->
      <div class="text-center mb-4">
        <button class="btn btn-primary" @click="exportarPDF">
          Exportar PDF de Tareas Pendientes
        </button>
      </div>

      <!-- Tarjetas con las Tareas -->
      <div class="row">
        <div v-for="tarea in tareasOrdenadas" :key="tarea.id" class="col-md-6 mb-3">
          <div
            class="card"
            :class="{
              'bg-light': tarea.completada,
              'border-secondary': tarea.completada,
              'border-2': !tarea.completada
            }"
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
                  <p>Más información adicional sobre la tarea.</p>
                  <h6>3 Tips:</h6>
                  <ul>
                    <li>Tip 1: Realiza esta acción primero.</li>
                    <li>Tip 2: No olvides verificar esto.</li>
                    <li>Tip 3: Consulta esta fuente para más detalles.</li>
                  </ul>
                  <h6>3 Enlaces Externos:</h6>
                  <ul>
                    <li>
                      <a href="https://example.com/link1" target="_blank">Enlace Externo 1</a>
                    </li>
                    <li>
                      <a href="https://example.com/link2" target="_blank">Enlace Externo 2</a>
                    </li>
                    <li>
                      <a href="https://example.com/link3" target="_blank">Enlace Externo 3</a>
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
      tareas: []
    }
  },
  computed: {
    tareasOrdenadas() {
      return [...this.tareas].sort((a, b) => a.completada - b.completada)
    }
  },
  methods: {
    exportarPDF() {
      const element = document.querySelector('#checklist-container')
      html2pdf(element)
    },
    updateTarea(tarea) {
      // Actualiza el estado de completada
      tarea.completada = !tarea.completada
      this.saveTareasToLocalStorage()
    },
    toggleCollapse(tarea) {
      // Alterna el estado de mostrar contenido adicional
      tarea.mostrarContenido = !tarea.mostrarContenido
      this.saveTareasToLocalStorage()
    },
    saveTareasToLocalStorage() {
      // Guarda el estado actualizado en localStorage
      localStorage.setItem('tareas', JSON.stringify(this.tareas))
    },
    loadTareasFromLocalStorage() {
      // Carga el estado guardado desde localStorage
      const tareasGuardadas = localStorage.getItem('tareas')
      if (tareasGuardadas) {
        this.tareas = JSON.parse(tareasGuardadas)
      } else {
        // Si no hay tareas en localStorage, inicializa con datos predeterminados
        this.tareas = [
          {
            id: 1,
            titulo: 'Usar HTTPS',
            descripcion: 'Asegúrate de que tu sitio use HTTPS para conexiones seguras.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 2,
            titulo: 'Cifrado de contraseñas',
            descripcion: 'Cifra las contraseñas con un algoritmo fuerte, como bcrypt.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 3,
            titulo: 'Backups regulares',
            descripcion: 'Realiza copias de seguridad periódicas de tu sitio web.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 4,
            titulo: 'Política de seguridad de contenido (CSP)',
            descripcion: 'Implementa CSP para mitigar ataques de cross-site scripting.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 5,
            titulo: 'Actualización de software',
            descripcion: 'Mantén el software de tu sitio siempre actualizado.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 6,
            titulo: 'Control de acceso',
            descripcion: 'Asegúrate de tener un buen control de acceso a las áreas restringidas.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 7,
            titulo: 'Firewall de aplicaciones web (WAF)',
            descripcion: 'Configura un WAF para protegerte contra ataques comunes.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 8,
            titulo: 'Protección contra fuerza bruta',
            descripcion: 'Implementa medidas para prevenir ataques de fuerza bruta.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 9,
            titulo: 'Seguridad en el correo electrónico',
            descripcion: 'Utiliza SPF, DKIM y DMARC para proteger los correos.',
            completada: false,
            mostrarContenido: false
          },
          {
            id: 10,
            titulo: 'Monitoreo de seguridad',
            descripcion: 'Monitorea tu sitio web para detectar y responder a incidentes.',
            completada: false,
            mostrarContenido: false
          }
        ]
        this.saveTareasToLocalStorage()
      }
    }
  },
  created() {
    this.loadTareasFromLocalStorage()
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
  border: 1px solid transparent; /* Para aplicar border color condicionalmente */
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 1rem;
}

.card.bg-light {
  background-color: var(--vt-green);
}

.card.border-secondary {
  border-color: var(--vt-purple-soft);
}

.card.border-2 {
  border-width: 2px;
  border-color: var(--vt-blue); /* Color del borde para tarjetas no completadas */
}

.btn-link {
  color: var(--vt-blue);
}

.btn-link:hover {
  text-decoration: underline;
}

.text-decoration-line-through {
  text-decoration: line-through;
}

/* Icono en el botón */
.bi-info-circle {
  font-size: 1.25rem;
}

/* Estilo personalizado para el checkbox */
.custom-checkbox {
  width: 24px; /* Tamaño del checkbox */
  height: 24px; /* Tamaño del checkbox */
  accent-color: var(--vt-purple); /* Color del check */
  border: 2px solid var(--vt-blue); /* Borde más visible cuando no está seleccionado */
}

/* Estilo para el estado marcado del checkbox */
.custom-checkbox:checked {
  background-color: var(--vt-purple);
  border-color: var(--vt-purple);
}

/* Alineación del checkbox con el texto */
.d-flex.align-items-center {
  display: flex;
  align-items: center;
}

/* Estilo del título */
.fw-bold {
  font-weight: bold;
  color: var(--vt-blue);
}
</style>
