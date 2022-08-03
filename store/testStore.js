export const state = () => {
  someValue: ''
}

export const actions = {
  testAction ({ commit }) { // storeからもプラグインが呼び出せる
    this.$myTestPlugin.sushi('Stored Tsuna')
  }
}
