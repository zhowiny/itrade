<template>
  <div class="reimbursement">
      <div class="reimbursement_list">
          <ul>
            <li>
                <div class="text">
                    <p class="text_p">还本付息</p>
                    <p class="text_p1">+200,200,200</p>
                </div>
                <p>到账时间：2018-7-10</p>
            </li>
            <li>
                <div class="text">
                    <p class="text_p">还本付息</p>
                    <p class="text_p1">+200,200,200</p>
                </div>
                <p>到账时间：2018-7-10</p>
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
      title: '回款记录',
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
  .reimbursement {
     height: 100%;
     background-color: #fff;
     .reimbursement_list {
         margin-left: 30px;
         margin-right: 30px;
         ul {
           margin: 0;
           padding: 0;
           li {
             list-style: none;
             margin-top: 30px;
             .text {
               height: 40px;
                .text_p {
                  float: left;
                  color: #000;
                }
                .text_p1 {
                  float: right;
                  color: #000;
                }
             }
             p {
               color: #cdcdcd;
             }
           }
         }
     }
  }
</style>
