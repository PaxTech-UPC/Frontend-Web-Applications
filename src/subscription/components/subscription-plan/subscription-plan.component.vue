<script>
import { useConfirm } from 'primevue/useconfirm';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ConfirmDialog from 'primevue/confirmdialog';

export default {
  name: "subscription-plan-component",
  data() {
    return {
      selectedPlan: ''
    };
  },
  methods: {
    changePlan(plan) {
      this.selectedPlan = plan;


      this.$confirm.require({
        message: 'Are you sure you want to change your subscription plan? This action will update your benefits and take effect immediately.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.selectedPlan = plan;
          this.$toast.add({
            severity: 'success',
            summary: 'Plan Updated',
            detail: `You have selected the ${plan} plan.`,
          });
        }
      });
    }
  }
};
</script>

<template>
  <div>
    <h1></h1>
    <h2 class="header">
      {{$t('subscription.currentPlan')}}
      <div class="plan-container">{{ selectedPlan || 'ProStyle' }}</div>
    </h2>

    <h3 class="subheader">{{$t('subscription.upgrade')}}</h3>
    <div class="plans">
      <div class="plan-card essential" @click="changePlan('Essential')">
        <h2 class="title">Essential</h2>
        <h3 class="subtitle">Free</h3>
        <ul>
          <li><i class="pi pi-check"></i> {{ $t('subs.ba') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.cli') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.re') }}</li>
          <li><i class="pi pi-times"></i> {{ $t('subs.dat') }}</li>
          <li><i class="pi pi-times"></i> {{ $t('subs.cus') }}</li>
          <li><i class="pi pi-times"></i> {{ $t('subs.ad') }}</li>
        </ul>
        <Button label="Choose" class="choose-btn">{{ $t('subs.choose') }}</Button>
      </div>

      <div class="plan-card prostyle" @click="changePlan('ProStyle')">
        <h2 class="title">ProStyle</h2>
        <h3 class="subtitle">s/69.90 x month</h3>
        <ul>
          <li><i class="pi pi-check"></i> {{ $t('subs.ba') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.cli') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.re') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.dat') }}</li>
          <li><i class="pi pi-times"></i> {{ $t('subs.cus') }}</li>
          <li><i class="pi pi-times"></i> {{ $t('subs.ad') }}</li>
        </ul>
        <Button label="Choose" class="choose-btn">{{ $t('subs.choose') }}</Button>
      </div>

      <div class="plan-card deluxe-studio" @click="changePlan('Deluxe Studio')">
        <h2 class="title">Deluxe Studio</h2>
        <h3 class="subtitle">s/129.90 x month</h3>
        <ul>
          <li><i class="pi pi-check"></i> {{ $t('subs.ba') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.cli') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.re') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.dat') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.cus') }}</li>
          <li><i class="pi pi-check"></i> {{ $t('subs.ad') }}</li>
        </ul>
        <Button label="Choose" class="choose-btn">{{ $t('subs.choose') }}</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.subheader {
  padding-left: 3rem;
  text-align: left;
}
.header {
  padding-left: 3rem;
  text-align: left;
}

.title{
  text-align: center;
  font-size: 1.4rem;
  font-weight: 700;
}
.subtitle{
  text-align: center;
  font-size: 1rem;
  margin-top: 4px;
  color: #2A2C53;
}
.plans {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.plan-card {
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  cursor: pointer;
}

.plan-card:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .choose-btn {
    background-color: #927EA8;
  }
}

.plan-container {
  font-size: medium;
  color: #FFFFFF;
  background-color: #7D6498; /* Color de fondo */
  border-radius: 10px; /* Radio para las esquinas redondeadas */
  padding: 10px; /* Espacio entre el texto y el borde */
  display: inline-block; /* Permite que el fondo rodee el texto */
}

ul {
  list-style: none;
  padding-left: 0;
}

li {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.choose-btn {
  margin-top: 2rem;
  padding: 0.6rem 1.2rem;
  background-color: #B6AFB9;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: white;
  font-weight: bold;
}
.choose-btn:hover {
  background-color: #927EA8;
}

.pi-check{
  color: #61A679;
}
.pi-times{
  color: #858786;
}

.essential { background-color: #f9f9f9; }
.prostyle { background-color: #f9f9f9; }
.deluxe-studio { background-color: #f9f9f9; }
</style>
