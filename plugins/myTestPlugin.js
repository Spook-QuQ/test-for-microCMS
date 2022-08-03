export default (context, inject) => {
  inject('myTestPlugin', { // injectにプラグイン名とプラグインの内容を注入できる
    sushi: neta => console.log(neta ? `${neta} sushi!` : 'shari...')
  })
}
