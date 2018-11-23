<template>
  <div class="my_flie">
      <div class="my_flie_text">
          <p>签署文件</p>
          <ul>
            <li>
                <span>231414141</span>
                <img src="/images/icon_download.png" alt="">
            </li>
            <li>
                <span>231414141</span>
                <img src="/images/icon_download.png" alt="">
            </li>
          </ul>
          <p>确认文件</p>
      </div>
      <div class="my_flie_text">
          <ul>
            <li>
                <span>231414141</span>
                <img src="/images/icon_download.png" alt="">
            </li>
            <li>
                <span>231414141</span>
                <img src="/images/icon_download.png" alt="">
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
import mxSelect from '@/components/select'
export default {
  data () {
    return {
      title: '投资文件',
    }
  },

  methods: {
  },

  created () {
  },
  components: {
    mxSelect,
  },
}
</script>
<style scoped lang="scss">
 .my_flie {
   height: 100%;
   background-color: #fff;
   .my_flie_text {
       margin-left: 30px;
       margin-right: 30px;
       border-top: 1px solid #cdcdcd;
       p {
         font-size: 30px;
         margin-top: 20px;
         margin-bottom: 20px;
       }
       ul {
         margin: 0;
         padding: 0;
         li {
           list-style: none;
           height: 80px;
           line-height: 80px;
           border-bottom: 1px solid #cdcdcd;
           span {
             color: blue;
           }
           img {
             float: right;
             width: 50px;
             height: 50px;
             margin-top: 15px;
           }
         }
       }
   }
 }
</style>
