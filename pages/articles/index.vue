<template lang="pug">
div
  h1 Articles
  v-card(
    v-for="content in contents" :key="content.id"
    :to="`/articles/${ content.id }`"
  )
    v-card-text.caption {{ new Date(content.createdAt).toLocaleString() }}
    v-card-title {{ content.title }}
    //- v-card-text(v-html="content.content")
</template>

<script>
import axios from 'axios'

export default {
  name: 'ArticlesPage',
  async asyncData (context) {
    // console.log(context.$config.microCMS.api_key)
    // console.log(context.$config.microCMS.url)

    // const { data } = await axios.get(context.$config.microCMS.url + '/blogs', {
    //   headers: { 'X-MICROCMS-API-KEY': context.$config.microCMS.api_key },
    //   params: {
    //     fields: ['id', 'title', 'createdAt'].join(',')
    //   }
    // })

    const { data } = await axios.get(process.env.microCMS.url + '/blogs', {
      headers: { 'X-MICROCMS-API-KEY': process.env.microCMS.api_key },
      params: {
        fields: ['id', 'title', 'createdAt'].join(',')
      }
    })

    return data
  },
  mounted () {
    // console.log(this.contents[0]);
  }
}
</script>

<style lang="sass" scoped>
</style>
