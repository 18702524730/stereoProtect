<template>
  <input
    type="file"
    :name="$parent.name"
    :id="$parent.id || $parent.name"
    @change="change"
  />
</template>
<script>
export default {
  methods: {
    change(e) {
      this.$destroy()
      this.$parent.addInputFile(e.target)
    }
  }
}
</script>
