<template>
  <div>
    <b-select :value="perpage" size="is-small" @input="$emit('selected', $event)">
      <option value="">
        {{ lang('No pagination') }}
      </option>
      <option value="10">
        {{ lang('Per page', 10) }}
      </option>
      <option value="20">
        {{ lang('Per page', 20) }}
      </option>
      <option value="30">
        {{ lang('Per page', 30) }}
      </option>
      <option value="40">
        {{ lang('Per page', 40) }}
      </option>
      <option value="50">
        {{ lang('Per page', 50) }}
      </option>
      <option value="100">
        {{ lang('Per page', 100) }}
      </option>
    </b-select>
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: [ 'perpage' ]
}
</script>

