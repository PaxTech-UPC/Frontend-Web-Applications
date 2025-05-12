<script>
import { ref, onMounted } from 'vue';
import Button from "primevue/button";

export default {
  name: "AppointmentsComponent",
  components: { Button },
  setup() {
    const appointments = ref([]);
    const lastVisited = ref(null);
    const userReview = ref('');
    const userRating = ref(0);
    const workers = ref([]);
    const services = ref([]);

    // Format date (dd/mm)
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    // Format time (HH:MM - HH:MM)
    const formatTimeSlot = (start, end) => {
      const startTime = new Date(start);
      const endTime = new Date(end);

      const formatTime = (time) => {
        return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
      };

      return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    };

    // Find worker by name
    const findWorkerByName = (name) => {
      return workers.value.find(worker => worker.nombre.includes(name)) || null;
    };

    // Load data from JSON
    const loadData = () => {
      // In production this would be an API call
      // For demo, we use the JSON data directly

      // Fetch and load the JSON data (simulated)
      fetch('/api/data')
          .then(response => response.json())
          .then(data => {
            // Store workers and services
            workers.value = data.workers || [];
            services.value = data.services || [];

            // Process reservations to create appointments
            if (data.reservationDetails && data.reservationDetails.length > 0) {
              appointments.value = data.reservationDetails.map(reservation => {
                // Find worker image by name (if it exists)
                const workerData = findWorkerByName(reservation.worker?.name) || {};

                return {
                  id: reservation.reservationId,
                  type: reservation.tipo,
                  date: formatDate(reservation.timeSlot.start),
                  time: formatTimeSlot(reservation.timeSlot.start, reservation.timeSlot.end),
                  workerName: reservation.worker?.name || "Not assigned",
                  location: reservation.salon?.location || "Unknown",
                  workerImage: workerData.fotoUrl || "https://randomuser.me/api/portraits/lego/1.jpg",
                  isPaid: reservation.payment?.status || false
                };
              });

              // Sort appointments by date
              appointments.value.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
              });
            }

            // Set last visited stylist (could be from most recent appointment or reviews)
            // For demo, we'll use the first worker
            if (workers.value.length > 0) {
              lastVisited.value = {
                workerName: workers.value[0].nombre,
                specialization: workers.value[0].especializacion,
                workerImage: workers.value[0].fotoUrl,
                rating: 4.8 // Could get this from reviews
              };
            }
          })
          .catch(error => {
            console.error("Error loading data:", error);

            // Fallback to sample data in case of error
            createSampleData();
          });
    };

    // Create sample data if API fails
    const createSampleData = () => {
      // Use worker data from the JSON
      workers.value = [
        {
          "workerId": "1",
          "nombre": "Javier Herrera",
          "especializacion": "Bridal hair stylist",
          "fotoUrl": "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          "workerId": "2",
          "nombre": "Lili Díaz",
          "especializacion": "Hair extension specialist",
          "fotoUrl": "https://randomuser.me/api/portraits/women/44.jpg"
        }
      ];

      // Create appointments
      const today = new Date();

      appointments.value = [
        {
          id: "1",
          type: "Keratin treatment",
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)),
          time: "17:30 - 18:30",
          workerName: "Javier Herrera",
          location: "Downtown",
          workerImage: workers.value[0].fotoUrl,
          isPaid: true
        },
        {
          id: "2",
          type: "Simple haircut",
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)),
          time: "17:30 - 18:00",
          workerName: "Lili Díaz",
          location: "Midtown",
          workerImage: workers.value[1].fotoUrl,
          isPaid: true
        },
        {
          id: "3",
          type: "Hair styling",
          date: formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)),
          time: "17:30 - 18:00",
          workerName: "Javier Herrera",
          location: "Downtown",
          workerImage: workers.value[0].fotoUrl,
          isPaid: false
        }
      ];

      // Last visited stylist
      lastVisited.value = {
        workerName: workers.value[0].nombre,
        specialization: workers.value[0].especializacion,
        workerImage: workers.value[0].fotoUrl,
        rating: 4.8
      };
    };

    // Set rating
    const setRating = (rating) => {
      userRating.value = rating;
    };

    // Submit review
    const submitReview = () => {
      // Here would be the code to send the review
      alert('Review submitted!');
      userReview.value = '';
      userRating.value = 0;
    };

    // Helper to get today, tomorrow, and this week's appointments
    const getAppointmentsByTime = () => {
      const today = new Date();
      const todayStr = formatDate(today);
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      const tomorrowStr = formatDate(tomorrow);

      const nextWeekStart = new Date();
      nextWeekStart.setDate(today.getDate() + 2);
      const nextWeekEnd = new Date();
      nextWeekEnd.setDate(today.getDate() + 7);

      return {
        today: appointments.value.filter(app => app.date === todayStr),
        tomorrow: appointments.value.filter(app => app.date === tomorrowStr),
        nextWeek: appointments.value.filter(app => {
          const appDate = new Date(app.date.split('/').reverse().join('-'));
          return appDate >= nextWeekStart && appDate <= nextWeekEnd;
        })
      };
    };

    onMounted(() => {
      loadData();
    });

    return {
      appointments,
      lastVisited,
      userReview,
      userRating,
      setRating,
      submitReview,
      getAppointmentsByTime
    };
  }
}
</script>

<template>
  <div class="appointments-container">
    <!-- Left section -->
    <div class="appointment-list">
      <h2 class="appointment-header">Appointments</h2>

      <!-- Tomorrow's appointments -->
      <h4 class="section-title">Tomorrow</h4>
      <div v-if="getAppointmentsByTime().tomorrow.length > 0">
        <div v-for="app in getAppointmentsByTime().tomorrow" :key="app.id" class="appointment-card">
          <div class="image-placeholder">
            <img :src="app.workerImage" alt="Stylist" class="worker-image">
          </div>
          <div class="appointment-info">
            <div class="appointment-header-info">
              <strong>{{ app.type }} ({{ app.date }})</strong>
              <span class="payment-status" :class="{ 'paid': app.isPaid, 'unpaid': !app.isPaid }">
                {{ app.isPaid ? 'Paid' : 'Unpaid' }}
              </span>
            </div>
            <p>{{ app.time }}</p>
            <p>{{ app.location }}</p>
            <p>{{ app.workerName }}</p>
            <div class="icons">
              <Button icon="pi pi-pencil" class="icon-button" />
              <Button icon="pi pi-calendar" class="icon-button" />
              <Button icon="pi pi-trash" class="icon-button" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>No appointments for tomorrow</p>
      </div>

      <!-- Next week's appointments -->
      <h4 class="section-title">Next week</h4>
      <div v-if="getAppointmentsByTime().nextWeek.length > 0">
        <div v-for="app in getAppointmentsByTime().nextWeek" :key="app.id" class="appointment-card">
          <div class="image-placeholder">
            <img :src="app.workerImage" alt="Stylist" class="worker-image">
          </div>
          <div class="appointment-info">
            <div class="appointment-header-info">
              <strong>{{ app.type }} ({{ app.date }})</strong>
              <span class="payment-status" :class="{ 'paid': app.isPaid, 'unpaid': !app.isPaid }">
                {{ app.isPaid ? 'Paid' : 'Unpaid' }}
              </span>
            </div>
            <p>{{ app.time }}</p>
            <p>{{ app.location }}</p>
            <p>{{ app.workerName }}</p>
            <div class="icons">
              <Button icon="pi pi-pencil" class="icon-button" />
              <Button icon="pi pi-calendar" class="icon-button" />
              <Button icon="pi pi-trash" class="icon-button" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-state">
        <p>No appointments for next week</p>
      </div>

      <!-- Show other appointments if available -->
      <h4 v-if="appointments.length > (getAppointmentsByTime().tomorrow.length + getAppointmentsByTime().nextWeek.length)"
          class="section-title">
        Future appointments
      </h4>
      <div v-if="appointments.length > (getAppointmentsByTime().tomorrow.length + getAppointmentsByTime().nextWeek.length)">
        <div v-for="app in appointments.slice(getAppointmentsByTime().tomorrow.length + getAppointmentsByTime().nextWeek.length)"
             :key="app.id"
             class="appointment-card">
          <div class="image-placeholder">
            <img :src="app.workerImage" alt="Stylist" class="worker-image">
          </div>
          <div class="appointment-info">
            <div class="appointment-header-info">
              <strong>{{ app.type }} ({{ app.date }})</strong>
              <span class="payment-status" :class="{ 'paid': app.isPaid, 'unpaid': !app.isPaid }">
                {{ app.isPaid ? 'Paid' : 'Unpaid' }}
              </span>
            </div>
            <p>{{ app.time }}</p>
            <p>{{ app.location }}</p>
            <p>{{ app.workerName }}</p>
            <div class="icons">
              <Button icon="pi pi-pencil" class="icon-button" />
              <Button icon="pi pi-calendar" class="icon-button" />
              <Button icon="pi pi-trash" class="icon-button" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right section -->
    <div class="last-visited">
      <div class="image-placeholder large">
        <img v-if="lastVisited?.workerImage" :src="lastVisited.workerImage" alt="Last visited stylist" class="worker-image">
      </div>
      <h4>{{ lastVisited?.workerName }}</h4>
      <p class="role">{{ lastVisited?.specialization }}</p>
      <p class="rating">⭐ {{ lastVisited?.rating }}</p>

      <div class="rating-icons">
        <span class="thumbs">👍</span>
        <span class="thumbs">👎</span>
      </div>

      <p class="review-prompt">Do you want to leave a review?</p>

      <div class="stars">
        <span
            v-for="star in 5"
            :key="star"
            class="star-rating"
            :class="{ 'selected': star <= userRating }"
            @click="setRating(star)"
        >
          ⭐
        </span>
      </div>

      <textarea v-model="userReview" placeholder="Type your review here"></textarea>
      <button class="submit-button" @click="submitReview">Submit Review</button>
    </div>
  </div>
</template>

<style scoped>
.appointments-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #f7f7f7;
  font-family: sans-serif;
  min-height: 600px;
}

.appointment-list {
  flex: 2;
}

.appointment-header {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.section-title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #444;
}

.appointment-card {
  display: flex;
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.appointment-card:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.image-placeholder {
  width: 70px;
  height: 70px;
  background: #eee;
  border-radius: 8px;
  margin-right: 15px;
  overflow: hidden;
  flex-shrink: 0;
}

.image-placeholder.large {
  width: 100%;
  height: 150px;
  margin-bottom: 15px;
}

.worker-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.appointment-info {
  flex: 1;
}

.appointment-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.payment-status {
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 600;
}

.payment-status.paid {
  background-color: #d4edda;
  color: #155724;
}

.payment-status.unpaid {
  background-color: #f8d7da;
  color: #721c24;
}

.appointment-info p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.icons {
  margin-top: 10px;
  display: flex;
  gap: 5px;
}

.icon-button {
  padding: 0.4rem;
  font-size: 1rem;
}

.last-visited {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.last-visited h4 {
  margin: 10px 0 5px;
  font-size: 18px;
  font-weight: 600;
}

.last-visited .role {
  color: #666;
  margin: 5px 0;
  font-size: 14px;
}

.rating {
  font-size: 16px;
  font-weight: 600;
  color: #f8b400;
}

.rating-icons {
  display: flex;
  gap: 15px;
  margin: 15px 0;
}

.thumbs {
  font-size: 22px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.thumbs:hover {
  opacity: 1;
  transform: scale(1.1);
}

.review-prompt {
  font-size: 16px;
  margin: 10px 0;
  color: #444;
}

.stars {
  font-size: 18px;
  margin: 10px 0;
  display: flex;
}

.star-rating {
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.2s ease;
  padding: 0 2px;
}

.star-rating:hover {
  transform: scale(1.2);
}

.star-rating.selected {
  opacity: 1;
}

textarea {
  width: 100%;
  height: 100px;
  resize: none;
  margin: 15px 0;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: inherit;
  transition: border 0.2s ease;
}

textarea:focus {
  outline: none;
  border-color: #888;
}

.submit-button {
  background-color: #4a4a4a;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  transition: all 0.2s ease;
}

.submit-button:hover {
  background-color: #333;
}

.empty-state {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  color: #888;
  font-style: italic;
  margin-bottom: 15px;
}
</style>