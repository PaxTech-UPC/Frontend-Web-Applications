<script>

export default {
  name: "subscription-plan-component",
}

function changePlan(plan) {
  confirm.require({
    message: 'Are you sure you want to change your subscription plan? This action will update your benefits and take effect immediately.',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    accept: () => {
      selectedPlan.value = plan;
      toast.add({ severity: 'success', summary: 'Plan Updated', detail: `You have selected the ${plan} plan.`, life: 3000 });
    }
  });
}
</script>

<template>
  <div>
    <h2>
      {{$t('subscription.currentPlan')}}
      <div class="plan-container">{{ selectedPlan || 'ProStyle' }}</div>
    </h2>

    <h3>{{$t('subscription.upgrade')}}</h3>
    <div class="plans">
      <div class="plan-card essential" @click="changePlan('Essential')">
        <h4>Essential</h4>
        <p>Free</p>
        <ul>
          <li><i class="pi pi-check"></i> Basic smart calendar</li>
          <li><i class="pi pi-check"></i> Client booking page</li>
          <li><i class="pi pi-check"></i> Reviews & ratings</li>
          <li><i class="pi pi-times"></i> Client database</li>
          <li><i class="pi pi-times"></i> Custom booking link</li>
          <li><i class="pi pi-times"></i> Advanced analytics</li>
        </ul>
        <Button label="Choose" class="p-button-sm" />
      </div>

      <div class="plan-card prostyle" @click="changePlan('ProStyle')">
        <h4>ProStyle</h4>
        <p>s/69.90 x month</p>
        <ul>
          <li><i class="pi pi-check"></i> Basic smart calendar</li>
          <li><i class="pi pi-check"></i> Client booking page</li>
          <li><i class="pi pi-check"></i> Reviews & ratings</li>
          <li><i class="pi pi-check"></i> Client database</li>
          <li><i class="pi pi-times"></i> Custom booking link</li>
          <li><i class="pi pi-times"></i> Advanced analytics</li>
        </ul>
        <Button label="Choose" class="p-button-sm" />
      </div>

      <div class="plan-card deluxe-studio" @click="changePlan('Deluxe Studio')">
        <h4>Deluxe Studio</h4>
        <p>s/129.90 x month</p>
        <ul>
          <li><i class="pi pi-check"></i> Basic smart calendar</li>
          <li><i class="pi pi-check"></i> Client booking page</li>
          <li><i class="pi pi-check"></i> Reviews & ratings</li>
          <li><i class="pi pi-check"></i> Client database</li>
          <li><i class="pi pi-check"></i> Custom booking link</li>
          <li><i class="pi pi-check"></i> Advanced analytics</li>
        </ul>
        <Button label="Choose" class="p-button-sm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.plans {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  text-align: center;
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
}

.plan-container {
  font-weight: bold;
  color: #2196F3;
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

.essential { background-color: #f9f9f9; }
.prostyle { background-color: #f9f9f9; }
.deluxe-studio { background-color: #f9f9f9; }
</style>
