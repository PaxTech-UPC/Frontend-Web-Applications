<script>
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

export default {
  name: "subscription-plan-component",
  data() {
    return {
      selectedPlan: ''
    };
  },
  methods: {
    changePlan(plan) {
      const toast = useToast();
      const confirm = useConfirm();

      confirm.require({
        message: 'Are you sure you want to change your subscription plan? This action will update your benefits and take effect immediately.',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => {
          this.selectedPlan = plan;
          toast.add({
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
          <li><i class="pi pi-check"></i> Basic smart calendar</li>
          <li><i class="pi pi-check"></i> Client booking page</li>
          <li><i class="pi pi-check"></i> Reviews & ratings</li>
          <li><i class="pi pi-times"></i> Client database</li>
          <li><i class="pi pi-times"></i> Custom booking link</li>
          <li><i class="pi pi-times"></i> Advanced analytics</li>
        </ul>
        <Button label="Choose" class="choose-btn">Choose</Button>
      </div>

      <div class="plan-card prostyle" @click="changePlan('ProStyle')">
        <h2 class="title">ProStyle</h2>
        <h3 class="subtitle">s/69.90 x month</h3>
        <ul>
          <li><i class="pi pi-check"></i> Basic smart calendar</li>
          <li><i class="pi pi-check"></i> Client booking page</li>
          <li><i class="pi pi-check"></i> Reviews & ratings</li>
          <li><i class="pi pi-check"></i> Client database</li>
          <li><i class="pi pi-times"></i> Custom booking link</li>
          <li><i class="pi pi-times"></i> Advanced analytics</li>
        </ul>
        <Button label="Choose" class="choose-btn">Choose</Button>
      </div>

      <div class="plan-card deluxe-studio" @click="changePlan('Deluxe Studio')">
        <h2 class="title">Deluxe Studio</h2>
        <h3 class="subtitle">s/129.90 x month</h3>
        <ul>
          <li><i class="pi pi-check"></i> Basic smart calendar</li>
          <li><i class="pi pi-check"></i> Client booking page</li>
          <li><i class="pi pi-check"></i> Reviews & ratings</li>
          <li><i class="pi pi-check"></i> Client database</li>
          <li><i class="pi pi-check"></i> Custom booking link</li>
          <li><i class="pi pi-check"></i> Advanced analytics</li>
        </ul>
        <Button label="Choose" class="choose-btn">Choose</Button>
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
