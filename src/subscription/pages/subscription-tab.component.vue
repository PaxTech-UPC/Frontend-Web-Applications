<script>
import SubscriptionPlan from '../../subscription/components/subscription-plan/subscription-plan.component.vue';
import {$t} from "@primeuix/styled";

export default {
  name: "subscription-tab-component",
  components: {SubscriptionPlan}
}

</script>

<template>
  <div class="subscription-tab">
    <h1>{{ $t('dashboard.subscription') }}</h1>
    <SubscriptionPlan />
  </div>
</template>

<style scoped>
.subscription-tab {
  padding: 1rem;
}

.subscription-tab h1 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
