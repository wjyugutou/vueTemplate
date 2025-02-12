import autoprefixer from 'autoprefixer'
import PxToRem from 'postcss-pxtorem'

export default {
  plugins: [
    autoprefixer(),
    // PxToRem({
    //   rootValue: 37.5, // Vant 官方根字体大小是 37.5
    //   propList: ['*'],
    //   selectorBlackList: ['.norem', /.*px$/], // 过滤掉.norem-开头/px结尾 的class，不进行rem转换
    // }),
  ],
}
