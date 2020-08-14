<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add post</div>
      <q-space />
      <q-btn v-close-popup flat dense round icon="close" />
    </q-card-section>

    <q-card-section
      class="q-pt-none"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.</q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Publish" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {};
</script>

<style>
</style>