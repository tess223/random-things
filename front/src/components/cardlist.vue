<template>
  <div>
    <h1 class="title">Hover over the cards</h1>
    <div class="container">
      <HoverCard v-for="(card, index) in cards" :key="index" :dataImage="card.image">
        <template #header>
          <h1>{{ card.title }}</h1>
        </template>
        <template #content>
          <p>{{ card.text }}</p>
        </template>
      </HoverCard>
    </div>
  </div>
</template>

<script setup>
import HoverCard from './hovercard.vue'

const cards = [
  {
    title: 'Canyons',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://images.unsplash.com/photo-1479660656269-197ebb83b540?auto=compress,format&fit=crop&w=1199&h=798&q=80'
  },
  {
    title: 'Beaches',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://images.unsplash.com/photo-1479659929431-4342107adfc1?auto=compress,format&fit=crop&w=1199&h=799&q=80'
  },
  {
    title: 'Trees',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://images.unsplash.com/photo-1479644025832-60dabb8be2a1?auto=compress,format&fit=crop&w=1199&h=799&q=80'
  },
  {
    title: 'Lakes',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'https://images.unsplash.com/photo-1479621051492-5a6f9bd9e51a?auto=compress,format&fit=crop&w=1199&h=811&q=80'
  }
]
</script>

<style scoped>
.title {
  font-family: "Raleway", sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #3b82f6;
  text-align: center;
  margin-top: 20px;
}

.container {
  padding: 40px 80px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-items: center;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
    padding: 20px 40px;
  }
}
</style>