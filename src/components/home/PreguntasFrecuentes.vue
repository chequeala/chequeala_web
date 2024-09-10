<template>
  <section id="faq" class="container text-center">
    <div class="row">
      <div class="col-md-4 text-start fw-light">
        <h3>{{ $t('home.faqTitle') }}</h3>
        <p>{{ $t('home.faqDescription') }}</p>
      </div>
      <div class="col-md-8 text-start">
        <div class="accordion accordion-flush" id="accordionExample">
          <div class="accordion-item" v-for="(faqItem, index) in faqItems" :key="index">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                :data-bs-toggle="'collapse'"
                :data-bs-target="'#collapse' + index"
                :aria-controls="'collapse' + index"
                :aria-expanded="index === 0"
              >
                {{ faqItem.question }}
              </button>
            </h2>
            <div
              :id="'collapse' + index"
              class="accordion-collapse collapse"
              :class="{ show: index === 0 }"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <ul>
                  <li v-for="(answer, answerIndex) in faqItem.answer" :key="answerIndex">
                    {{ answer }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    faqItems() {
      let faq = this.$i18n.messages[this.$i18n.locale].home.faq
      return faq
    }
  }
}
</script>

<style scoped>
#faq .accordion-header button {
  font-weight: bold;
}
#faq .accordion-button:not(.collapsed) {
  background-color: transparent;
  color: var(--vt-blue);
}
#faq .accordion-button:focus {
  box-shadow: none;
}
</style>
