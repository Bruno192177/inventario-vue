<template>
  <button
    class="text-red-500 hover:text-red-700 font-semibold"
    @click="handleDelete"
  >
    Eliminar
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['deleted'])

const handleDelete = () => {
  const confirmDelete = confirm('¿Seguro que quieres eliminar este producto?')
  if (confirmDelete) {
    emit('deleted', props.id) // notifica al padre que se eliminó
  }
}
</script>
