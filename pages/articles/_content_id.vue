<template lang="pug">
div
  pre {{ $data }}
  div(v-html="article.content")
</template>

<script>
import axios from 'axios'
export default {
  async asyncData (context) {
    const { data } = await axios.get(process.env.microCMS.url + '/blogs/' + context.params.content_id, {
      headers: { 'X-MICROCMS-API-KEY': process.env.microCMS.api_key },
      params: {
        // fields: ['id', 'title', 'createdAt'].join(',')
      }
    })

    const regexp = /src="(.*?)"/g
    const matches = []

    let match

    while (match = regexp.exec(data.content)) {
      const [ src, link ] = match
      matches.push({ src, link })
    }

    const imgData = await Promise.all(matches.map(img => new Promise(async (resolve, reject) => {
      const { data } = await axios.get(img.link, { responseType: 'arraybuffer' })
      img.buffer64 = Buffer.from(data, 'binary').toString('base64')
      // console.log(buffer64)

      img.fileType = ''
      switch (true){
        case /[jpg|jpeg]$/i.test(img.link):
          img.fileType = 'data:image/jpeg;base64,'
          break
        case /webp$/i.test(img.link):
          img.fileType = 'data:image/webp;base64,'
          break
        case /png$/i.test(img.link):
          img.fileType = 'data:image/png;base64,'
          break
        case /gif$/i.test(img.link):
          img.fileType = 'data:image/gif;base64,'
          break
        case /svg$/i.test(img.link):
          img.fileType = 'data:image/svg;base64,'
          break
        case /pdf$/i.test(img.link):
          img.fileType = 'data:image/pdf;base64,'
          break
      }

      resolve(img)
    })))

    const replacedContent = imgData.reduce((v, img) => {
      return v.replace(img.link, img.fileType + img.buffer64)
    }, data.content)

    data.content = replacedContent

    return { article: data }
  },
  methods: {
    // replaceImgToNuxtImg (content) {
    //   return content.replace(/<img src="(.*?)">/g, v => {
    //     const isExists = v.match(/src="(.*?)"/)
    //     const url = isExists ? isExists[1] : ''
    //     return `<nuxt-img src="${url}" sizes="sm:100vw md:50vw lg:400px" />`
    //   })
    // }
  }
}
</script>

<style lang="sass" scoped>
</style>
