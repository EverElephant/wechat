var G = window.global_conf
console.log(G)
if (G == null) {
  G = {
    baseurl: 'http://test.agtzf.cn-jfqp.nbigame.com/withdraw/',
    kefu: '街坊游戏平台',
    kefuhao: 'myqgm16',
    wxAppId: 'wxeb2dce949fc4f58c',
    wxRedirectURI: 'http://test.agtzf.cn-jfqp.nbigame.com',
    title: '微信公众号'
  }
}
const config = {
  baseurl: G.baseurl,
  kefu: G.kefu,
  kefuhao: G.kefuhao,
  wxAppId: G.wxAppId,
  wxRedirectURI: G.wxRedirectURI
}
document.title = G.title
export {config}
