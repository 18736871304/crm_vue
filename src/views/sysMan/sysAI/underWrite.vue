<template>
    <div class="templateAI">
        <!-- <h1>核保</h1> -->
      <Chatbot />
    </div>
  </template>
  
  <script>
  import Chatbot from '../../../components/Chatbot.vue';
  
  export default {
    components: {
      Chatbot
    }
  };
  </script>
  
  <style>
  .templateAI {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    padding: 0.15rem 0.3rem;
  }
  </style>
  