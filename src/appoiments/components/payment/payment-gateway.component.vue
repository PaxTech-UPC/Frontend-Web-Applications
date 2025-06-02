<script>
export default {
  name: "payment-gateway.component",
  data() {
    return {
      metodoPago: "Tarjeta de credito o Debito",
      metodos: ["Tarjeta de credito o Debito", "Yape"],
      numeroTarjeta: '',
      expiracion: '',
      cvv: '',
    }
  },
}
</script>

<template>
  <section>
    <h2>{{ $t("payment.title") }}</h2>
    <pv-select-button v-model="metodoPago" :options="metodos" class="select-button" />

    <form v-if="metodoPago === $t('payment.methods.card')" class="form-container">
      <h3>{{ $t("payment.cardForm.title") }}</h3>

      <div class="form-group">
        <label for="numeroTarjeta">{{ $t("payment.cardForm.cardNumber") }}</label>
        <pv-input-mask
            id="numeroTarjeta"
            v-model="numeroTarjeta"
            mask="9999 9999 9999 9999"
            placeholder="____ ____ ____ ____"
        />
      </div>

      <div class="form-group">
        <label for="expiracion">{{ $t("payment.cardForm.expiration") }}</label>
        <pv-input-mask
            id="expiracion"
            v-model="expiracion"
            mask="99/99"
            placeholder="MM/AA"
        />
      </div>

      <div class="form-group">
        <label for="cvv">{{ $t("payment.cardForm.cvv") }}</label>
        <pv-input-text
            id="cvv"
            v-model="cvv"
            type="password"
            maxlength="4"
            placeholder="***"
        />
      </div>
    </form>

    <div v-if="metodoPago === $t('payment.methods.yape')" class="contenido">
      <h3>{{ $t("payment.yape.title") }}</h3>
      <p><strong>{{ $t("payment.yape.number") }}</strong></p>
      <p><strong>{{ $t("payment.yape.owner") }}</strong></p>
      <img src="../../../assets/img/qr-yape.png" alt="QR de Yape" width="200" />
    </div>
  </section>

</template>

<style scoped>
.select-button {
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
</style>