<template>
  <div class="investment_report">
       <div class="investment_report_list">
           <ul>
             <li>
                  <p class="list_p">东南亚消费基金5月份报告</p>
                  <p class="list_p1">上传时间：2018-7-10</p>
             </li>
              <li>
                  <p class="list_p">东南亚消费基金5月份报告</p>
                  <p class="list_p1">上传时间：2018-7-10</p>
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
      title: '投资报告',
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
  .investment_report {
      height: 100%;
      background-color: #fff;
      .investment_report_list {
        margin-left: 30px;
        margin-right: 30px;
        ul {
          margin: 0;
          padding: 0;
          li {
            list-style: none;
            margin-bottom: 40px;
            .list_p {
              font-size: 32px;
              color: #000;
            }
            .list_p1 {
               font-size: 28px;
               color: #cdcdcd;
               margin-top: 15px;
            }
          }
        }
      }
  }
</style>
