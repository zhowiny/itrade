<template>
  <div class="container">
    <div class="finance">
      <div class="finance_info">
        <figure class="finance_info_basic">
          <p class="finance_info_basic_logo"> <img class="finance_info_basic_logo" mode="scaleToFill" :src="product.logo" alt=""> </p>
          <p class="finance_info_basic_name">{{product.name || '---'}}</p>
        </figure>
        <div class="finance_info_read" @click="mustRead">
          <p class="finance_info_read_icon"> <img class="finance_info_read_icon" mode="aspectFit" src="/images/icon_bell.png" alt=""> </p>
          <p class="finance_info_read_text"> 风险提示 </p>
        </div>
      </div>
      <div class="finance_attr">
        <div class="finance_attr_item">
          <p class="finance_attr_item_value"> {{product.return_rate || '---'}} </p>
          <p class="finance_attr_item_label"> 预计年化 </p>
        </div>
        <div class="finance_attr_item" style="border-left: 1px solid #eeeeee;border-right: 1px solid #eeeeee;">
          <p class="finance_attr_item_value"> {{product.invest_term || '---'}} </p>
          <p class="finance_attr_item_label"> 投资期限 </p>
        </div>
        <div class="finance_attr_item">
          <p class="finance_attr_item_value"> {{product.commission || '---'}} </p>
          <p class="finance_attr_item_label"> 佣金 </p>
        </div>

      </div>
      <div class="finance_admin">
        <div class="finance_admin_item" @click="showShareBtn = true">
          <p class="finance_admin_item_icon"> <img class="finance_admin_item_icon" mode="scaleToFill" src="/images/icon_pdf.png" alt=""> </p>
          <p class="finance_admin_item_text"> 产品材料 </p>
          <div v-if="showShareBtn">
            <span @click="openFile" class="btn">查看</span>
            <navigator class="btn" hover-class="none" v-if="productBook.length > 0"
                       open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                       :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + productBook[0].document_name + '&filePath=' + productBook[0].document_url"
                       target="miniProgram"
                       version="trial"
            >分享</navigator><!--develop-->
          </div>
        </div>
        <div class="finance_admin_item" @click="toPage({url: '/pages/admin_details_page/main', data: { management_id: product.management_id,}})">
          <p class="finance_admin_item_icon"> <img class="finance_admin_item_icon" mode="scaleToFill" src="/images/icon_admin1.png" alt=""> </p>
          <p class="finance_admin_item_text"> 资管方介绍 </p>
        </div>
      </div>
      <div class="finance_points" v-if="isShowLight">
        <div class="finance_points_title">
          <div class="finance_points_title_name"> <p> <img class="finance_points_title_name_icon" mode="scaleToFill" src="/images/icon_adminTitle.png" alt=""> </p> <text class="finance_points_title_name_text"> {{product.highlights_title}} </text> </div>
          <div class="finance_points_title_copy" @click="copy">
            <p class="finance_points_title_copy_icon"> <img class="finance_points_title_copy_icon" mode="scaleToFill" src="/images/icon_copy.png" alt=""> </p>
            <p class="finance_points_title_copy_text"> 复制 </p>
          </div>
        </div>
        <div class="finance_points_content"> {{product.highlights_content}} </div>
      </div>
      <div class="finance_other">
        <div class="finance_other_tabs">
          <p class="finance_other_tabs_item" :class="{active: tabIndex === 0}" @click="tabIndex=0"> 相关资讯 </p>
          <p class="finance_other_tabs_item" :class="{active: tabIndex === 1}" @click="tabIndex=1"> 产品要素 </p>
          <p class="finance_other_tabs_item" :class="{active: tabIndex === 2}" @click="tabIndex=2"> 认购流程 </p>
          <p class="finance_other_tabs_item" :class="{active: tabIndex === 3}" @click="tabIndex=3"> 产品文件 </p>
        </div>
        <div class="finance_other_content">

          <div class="finance_other_content_information" v-if="tabIndex==0">
            <div class="finance_other_content_information_item" v-for="(item, index) in productArticle" :key="index" @click="goArticle(item.id)">
              <p class="finance_other_content_information_item_pic"> <img class="finance_other_content_information_item_pic" mode="scaleToFill" :src="item.head_img" alt=""> </p>
              <div class="finance_other_content_information_item_main">
                <p class="finance_other_content_information_item_main_name"> {{item.title}} </p>
                <p class="finance_other_content_information_item_main_other"> <span> {{item.created_at}} </span>|<span>{{item.pv}} 阅读量</span> </p>
              </div>
            </div>
          </div>

          <div class="finance_other_content_part" v-if="tabIndex==1">
            <div class="finance" v-if="productType==1">
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 产品名称 </p>
                  <p class="finance_other_content_part_item_value"> {{product.name}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 产品期限 </p>
                  <p class="finance_other_content_part_item_value"> {{product.invest_term}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 产品起息日 </p>
                  <p class="finance_other_content_part_item_value"> {{product.start_interest_day}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 托管银行 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.custodian_bank}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 审计机构 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.audit_authority}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 申购赎回 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.redeem_time}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 投资标的 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.invest_object}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 费用 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.fee}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 合格投资人 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.qualified_investor}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 行政管理 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.administration}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 派息方式 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.dividend_way}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 基金经理 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.fund_manager}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 其他 </p>
                  <p class="finance_other_content_part_item_value"> {{productInfoBasic.supplement}} </p>
                </div>
            </div>

            <div class="asnan" v-if="productType==4">
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 产品名称 </p>
                  <p class="finance_other_content_part_item_value"> {{product.name}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 办理周期 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.cycle_time}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 服务费 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.service_fee}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 投资金额 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.invest_amount_requirement}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 项目优势 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.introduction}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 项目优势 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.advantage}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 移民类型 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.immigration_type}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 居住要求 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.resident_requirement}} </p>
                </div>
                <div class="finance_other_content_part_item">
                  <p class="finance_other_content_part_item_label"> 更多介绍 </p>
                  <p class="finance_other_content_part_item_value"> {{immigrantInfoBasic.supplement}} </p>
                </div>
            </div>

            </div>
          </div>

          <div class="finance_other_content_process" v-if="tabIndex==2">
            <div  class="finance_other_content_process_item" v-for="(item, index) in salesProcess" :key="index">
              <p class="finance_other_content_process_item_pic"> <img class="finance_other_content_process_item_pic" mode="scaleToFill" :src="item.url" alt=""> </p>
              <p class="finance_other_content_process_item_text"> {{item.name}} </p>
            </div>
            <div class="finance_problem">
              <div class="finance_problem_title"> <p class="finance_problem_title_text"> 常见问题 </p> </div>
              <div class="finance_problem_content">
                <div class="finance_other_content_problem_item" v-for="(item, index) in questionList" :key="index">
                  <div class="finance_other_content_problem_item_question">
                    <p class="finance_other_content_problem_item_question_icon"> <img class="finance_other_content_problem_item_question_icon" mode="scaleToFill" src="/images/icon_question.png" alt=""> </p>
                    <p class="finance_other_content_problem_item_question_text"> {{item.question}} </p>
                  </div>
                  <div class="finance_other_content_problem_item_answer">
                    <p class="finance_other_content_problem_item_answer_icon"> <img class="finance_other_content_problem_item_answer_icon" mode="scaleToFill" src="/images/icon_answer.png" alt=""> </p>
                    <p class="finance_other_content_problem_item_answer_text">
                      <text>{{item.answer}}</text>
                      <span class="finance_other_content_problem_item_answer_text_time"> {{item.create_at}} </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="finance_other_content_file" v-if="tabIndex==3">
            <div class="finance_other_content_file_item">
              <div class="finance_other_content_file_item_title"> <p>产品介绍文件</p> </div>
              <div class="finance_other_content_file_item_content">
                <div class="finance_other_content_file_item_content_item" v-for="(item, index) in introductionDocuments" :key="index">
                  <span @click="$common.previewFile(item.document_url, 'pdf')">{{item.document_name}}</span>
                  <navigator class="file" hover-class="none"
                             open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                             :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.document_name + '&filePath=' + item.document_url"
                             target="miniProgram"
                             version="trial"
                  >
                    <img src="/images/icon_share.png" mode="aspectFit" style="width: 40rpx;height: 43rpx;">
                  </navigator><!--develop-->
                  <!--<p class="finance_other_content_file_item_content_item_text" @click="previewDoc" :data-url="item.document_url"> {{item.document_name}} <span>></span> </p>
                  <p class="finance_other_content_file_item_content_item_icon"> <img class="finance_other_content_file_item_content_item_icon" mode="scaleToFill" src="/images/icon_arrow_product.png" alt=""></p>-->
                </div>
              </div>
            </div>
            <div class="finance_other_content_file_item">
              <div class="finance_other_content_file_item_title"> <p>投资者认购文件</p> </div>
              <div class="finance_other_content_file_item_content">
                <p class="finance_other_content_file_item_content_title"> 仅供阅读 </p>
                <div class="finance_other_content_file_item_content_item" v-for="(item, index) in readDocuments" :key="index">
                  <span @click="$common.previewFile(item.document_url, 'pdf')">{{item.document_name}}</span>
                  <navigator class="file" hover-class="none"
                             open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                             :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.document_name + '&filePath=' + item.document_url"
                             target="miniProgram"
                             version="trial"
                  >

                    <img src="/images/icon_share.png" mode="aspectFit" style="width: 40rpx;height: 43rpx;">
                  </navigator><!--develop-->
                  <!--<p class="finance_other_content_file_item_content_item_text" @click="previewDoc" :data-url="item.document_url"> {{item.document_name}} </p>
                  <p class="finance_other_content_file_item_content_item_icon"> <img class="finance_other_content_file_item_content_item_icon" mode="scaleToFill" src="/images/icon_arrow_product.png" alt=""></p>-->
                </div>
              </div>
              <div class="finance_other_content_file_item_content">
                <p class="finance_other_content_file_item_content_title"> 签署文件 </p>
                <div class="finance_other_content_file_item_content_item" v-for="(item, index) in signDocuments" :key="index">
                  <span @click="$common.previewFile(item.document_url, 'pdf')">{{item.document_name}}</span>
                  <navigator class="file" hover-class="none"
                             open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                             :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.document_name + '&filePath=' + item.document_url"
                             target="miniProgram"
                             version="trial"
                  >
                    <img src="/images/icon_share.png" mode="aspectFit" style="width: 40rpx;height: 43rpx;">
                  </navigator><!--develop-->
                  <!--<p class="finance_other_content_file_item_content_item_text" @click="previewDoc" :data-url="item.document_url"> {{item.document_name}} </p>
                  <p class="finance_other_content_file_item_content_item_icon"> <img class="finance_other_content_file_item_content_item_icon" mode="scaleToFill" src="/images/icon_arrow_product.png" alt=""></p>-->
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="finance_footer">
      <div class="finance_footer_left">
        <div class="finance_footer_icon" @click="changeCollection">
          <img :src="product.is_favor ? '/images/icon_collection_active.png' : '/images/icon_collection.png'" />
          <span>{{product.is_favor ? '已收藏' : '收藏'}}</span>
        </div>
        <label class="finance_footer_icon" for="contact">
          <img src="/images/icon_advisory.png"/>
          <span>在线咨询</span>
        </label>
      </div>
      <div class="finance_footer_right">
        <div class="finance_footer_invest" @click="toMiniProgram"> 发送客户 </div>
        <div class="finance_footer_adviser" @click="showTip"> 生成合同 </div>
      </div>
    </div>
    <!--<div class="finance_footer">
      <div class="finance_footer_collection" @click="changeCollection">
        <img :src="product.is_favor ? '/images/icon_collection_active.png' : '/images/icon_collection.png'" class="finance_footer_collection_icon"/>
        <span>{{product.is_favor ? '已收藏' : '收藏'}}</span>
      </div>
      <div class="finance_footer_invest" @click="toMiniProgram"> 发送客户 </div>
      &lt;!&ndash; <navigator hover-class="none" class="finance_footer_invest" open-type="navigate" app-id="wxcd7c5762adbd3cf5" :path="path" target="miniProgram" :extra-data="deliverData" version="trial"> 发送客户 </navigator> &ndash;&gt;
      <label for="contact" class="finance_footer_adviser"> 在线咨询 </label>
    </div>-->
    <button id="contact" open-type="contact"></button>
    <div class="mask" v-if="showShareBtn" @click="showShareBtn = false"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      title: '金融产品',
      tabIndex: 0,
      productId: '',
      productType: '',
      introduceCode: '',
      deliverData: {
        product_id: '',
        product_type: '',
        introduce_code: '',
      },
      path: '',
      showShareBtn: false,
    }
  },
  created () {},
  async onShow () {
  },
  async mounted () {
    this.productId = this.$root.$mp.query.product_id || 2010700
    this.productType = this.$root.$mp.query.product_type || 1
    let status = await this.$http.get('/wx/itrade/channel/getAdvisorByLogin', {})
    this.introduceCode = status.code

    this.deliverData.product_id = this.productId
    this.deliverData.product_type = this.productType
    this.deliverData.introduce_code = status.code

    this.path = `/pages/finance_details_page/main?product_id=${this.deliverData.product_id}&product_type=${this.deliverData.product_type}&introduce_code=${this.deliverData.introduce_code}&source=itrade_wx`

    await this.$store.dispatch('getProductInfo', {
      id: this.productId,
      type: this.productType
    })
    await this.$store.dispatch('getProductArticle', {
      id: this.productId,
      type: this.productType
    })
    // 数据统计
    this.$auth.dataBuryPoint({
      eventName: 'product_detail:init:visit',
      eventDataId: this.productId,
      source: this.$root.$mp.query.source,
      utmSource: this.$root.$mp.query.utm_source,
      introduceCode: this.introduceCode,
      shareInvestorId: '',
      prePage: wx.getStorageSync('from')
    })
  },
  methods: {
    toMiniProgram () {
      let _this = this
      // 数据统计
      _this.$auth.dataBuryPoint({
        eventName: 'product_detail:share_button:click',
        eventDataId: this.productId,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduceCode,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
      wx.navigateToMiniProgram({
        appId: 'wxcd7c5762adbd3cf5',
        path: _this.path,
        extraData: {},
        envVersion: 'trial',
        success (res) {
          console.log('成功', res)
        },
        fail (res) {
          console.log('失败', res)
        },
        complete (res) {
          console.log('必然', res)
        },
      })
    },
    // 文章详情
    goArticle (id) {
      this.toPage({
        url: '/pages/article/main',
        data: {
          article_id: id,
          introduce_code: this.introduceCode
        }
      })
    },
    goInvest () {
      this.toPage({url: '/pages/invest_validate_page/main',
        data: {
          product_id: this.productId,
          partner_id: this.introduceCode,
        }
      })
    },
    contact () {
      let _this = this
      wx.showModal({
        title: '提示',
        content: `是否联系理财师:${_this.advisorInfo.name}`,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.makePhoneCall({
              phoneNumber: `${_this.advisorInfo.phone}`
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    previewDoc (e) {
      console.log(e)
      let url = e.currentTarget.dataset.url
      this.openDoc(url)
    },
    mustRead () {
      if (
        Object.prototype.toString.call(this.mustReadDoc) === '[object Array]' &&
        this.mustReadDoc.length > 0
      ) {
        console.log(this.mustReadDoc[0].document_url)
        wx.showLoading({
          title: '加载中'
        })
        wx.downloadFile({
          url: this.mustReadDoc[0].document_url,
          success: function (res) {
            if (res.statusCode === 200) {
              wx.hideLoading()
              console.log(res)
              var filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.log(res)
                  console.log('打开文档成功')
                }
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '暂无文件',
          icon: 'none',
          duration: 2000
        })
      }
    },
    downloadProductBook () {
      if (
        Object.prototype.toString.call(this.productBook) === '[object Array]' &&
        this.productBook.length > 0
      ) {
        console.log(this.productBook[0].document_url)
        wx.showLoading({
          title: '加载中'
        })
        wx.downloadFile({
          url: this.productBook[0].document_url,
          success: function (res) {
            if (res.statusCode === 200) {
              wx.hideLoading()
              console.log(res)
              var filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.log(res)
                  console.log('打开文档成功')
                }
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '暂无文件',
          icon: 'none',
          duration: 2000
        })
      }
    },
    openFile () {
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'product_detail:load_product_book:click',
        eventDataId: this.productId,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduceCode,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
      if (this.productBook.length > 0) {
        this.$common.previewFile(this.productBook[0].document_url, 'pdf')
      } else {
        wx.showToast({
          title: '暂无文件',
          icon: 'none'
        })
      }
    },
    copy () {
      wx.setClipboardData({
        data: this.copyText,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log(res)
            }
          })
        }
      })
    },
    openDoc (url) {
      console.log(url)
      wx.showLoading({
        title: '文件打开中'
      })
      wx.downloadFile({
        url: url,
        success: function (res) {
          if (res.statusCode === 200) {
            wx.openDocument({
              filePath: res.tempFilePath,
              fail: function () {
                wx.hideLoading()
                wx.showToast({
                  title: '打开失败',
                  icon: 'none'
                })
              }
            })
          } else {
            wx.hideLoading()
            wx.showToast({
              title: '文件名错误',
              icon: 'none'
            })
          }
        },
        fail: function () {
          wx.hideLoading()
          wx.showToast({
            title: '打开失败',
            icon: 'none'
          })
        }
      })
    },
    changeCollection () {
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'product_detail:collect:click',
        eventDataId: this.productId,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduceCode,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
      let params = {
        is_favor: !this.product.is_favor,
        product_id: this.productId,
        product_type: this.productType
      }
      this.$http.post('/wx/itrade/finance/favor', params).then(d => {
        this.product.is_favor = !this.product.is_favor
      })
    },
    showTip () {
      this.showModal({
        title: '您可以在"iTrade"APP上进行操作',
        content: `如何下载iTrade?
        IOS：App Store搜索 iTrade
        Android：应用商店搜索 iTrade`,
        showCancel: false,
        confirmText: '我知道了',
        confirmColor: '#306FF4',
        success (res) {
          if (res.confirm) {
          }
        }
      })
    },
  },
  computed: {
    ...mapGetters({
      product: 'productInfo',
      mustReadDoc: 'mustReadDoc',
      productBook: 'productBook',
      productInfoBasic: 'productInfoBasic',
      immigrantInfoBasic: 'immigrantInfoBasic',
      isShowLight: 'isShowLight',
      productArticle: 'productArticle',
      questionList: 'questionList',
      salesProcess: 'salesProcess',
      introductionDocuments: 'introductionDocuments',
      readDocuments: 'readDocuments',
      signDocuments: 'signDocuments',
      copyText: 'copyText',
    })
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.finance {
  &_info {
    margin-top: 20rpx;
    padding: $middle-space;
    background: #ffffff;
    @include flex(space-between, center);
    border-bottom: 1px solid $borderColor;
    &_basic {
      @include flex(space-between);
      &_logo {
        width: 88rpx;
        height: 88rpx;
      }
      &_name {
        margin: 0 20rpx;
        font-size: 32rpx;
        color: $deepColor;
        font-weight: 600;
      }
    }
    &_read {
      @include flex(space-between);
      padding: $small-space;
      border: 1px solid $borderColor;
      border-radius: $default-border-radius;
      &_icon {
        width: 28rpx;
        height: 28rpx;
      }
      &_text {
        margin-left: 10rpx;
        font-size: 20rpx;
        color: $lightColor;
      }
    }
  }
  &_attr {
    padding: $middle-space;
    background: #ffffff;
    @include flex(space-around, center);
    &_item {
      width: 33%;
      text-align: center;
      @include text-truncate();
      &_value {
        font-size: 36rpx;
        color: $mainColor;
      }
      &_label {
        font-size: 24rpx;
      }
    }
  }
  &_admin {
    padding: $middle-space;
    background: #ffffff;
    margin-top: 20rpx;
    @include flex(space-between);
    &_item {
      width: 330rpx;
      height: 120rpx;
      padding: $middle-space;
      background: #fafafa;
      border: 1px solid $borderColor;
      border-radius: $default-border-radius;
      @include flex(center, center);
      position: relative;
      &_icon {
        width: 70rpx;
        height: 80rpx;
      }
      &_text {
        margin-left: 40rpx;
        font-size: 25rpx;
        @include text-truncate();
      }
      >div {
        position: absolute;
        top: 120px;
        left: 0;
        z-index: 100;
        background: #fff;
        padding: $middle-space;
        @include flex();
        border-radius: 5px;
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          border: 10px solid transparent;
          border-bottom-color: #ffffff;
        }
        .btn {
          flex: 1;
          @include size(150px, 40px);
          @include flex();
          &:first-child {
            border-right: 1px solid $borderColor;
            color: $lightColor;
          }
        }
      }
    }
  }
  &_points {
    padding: $middle-space;
    background: #ffffff;
    margin-top: 20rpx;
    &_title {
      @include flex(space-between);
      border-bottom: 1px solid $borderColor;
      padding-bottom: 20rpx;
      &_name {
        font-size: 28rpx;
        font-weight: 600;
        width: 580rpx;
        @include text-truncate();
        @include flex(flex-start, center);
        &_icon{
          width: 31rpx;
          height: 32rpx;
        }
        &_text{
          margin-left: 10rpx;
        }
      }
      &_copy {
        padding: $small-space;
        display: flex;
        &_icon {
          width: 28rpx;
          height: 28rpx;
        }
        &_text {
          margin-left: 10rpx;
          font-size: 22rpx;
          color: $lightColor;
        }
      }
    }
    &_content {
      padding-top: 20rpx;
      font-size: 26rpx;
      font-weight: 400;
      line-height: 48rpx;
    }
  }
  &_other {
    margin-top: 20rpx;
    &_tabs {
      display: flex;
      &_item {
        background: #ffffff;
        padding: 20rpx 0;
        width: 25%;
        text-align: center;
        &.active {
          color: $mainColor;
          border-bottom: 5px solid $mainColor;
        }
      }
    }
    &_content {
      margin-bottom: 20rpx;
      &_information {
        margin-top: 20rpx;
        padding-bottom: 120rpx;
        &_item {
          background: #ffffff;
          padding: $middle-space;
          border-bottom: 1px solid $borderColor;
          display: flex;
          &_pic {
            width: 120rpx;
            height: 120rpx;
          }
          &_main {
            margin-left: 20rpx;
            @include flex(space-between, flex-start);
            flex-direction: column;
            &_name {
              font-size: 26rpx;
              font-weight: 600;
            }
            &_other {
              font-size: 24rpx;
              color: $lightColor;
            }
          }
        }
      }
      &_part {
        margin-top: 20rpx;
        padding-bottom: 120rpx;
        &_item {
          background: #ffffff;
          padding: $middle-space;
          margin-bottom: 20rpx;
          &_label {
            font-size: 26rpx;
            padding-bottom: $middle-space;
            border-bottom: 1px solid $borderColor;
          }
          &_value {
            padding-top: $middle-space;
            font-size: 26rpx;
            color: $lightColor;
          }
        }
      }
      &_process {
        margin-top: 20rpx;
        padding-bottom: 120rpx;
        &_item {
          background: #ffffff;
          padding: $big-space;
          margin-bottom: 20rpx;
          &_pic {
            width: 600rpx;
            height: 300rpx;
            margin: 0 auto;
          }
          &_text {
            padding-top: 40rpx;
            color: $lightColor;
          }
        }

        .finance_problem {
          &_title {
            padding: $middle-space;
            background: #ffffff;
            border-bottom: 1px solid $borderColor;
            &_text {
              padding-left: $small-space;
              border-left: 6px solid $mainColor;
            }
          }
          &_content {
            .finance_other_content_problem_item {
              background: #ffffff;
              padding: $middle-space;
              border-bottom: 1px solid $borderColor;
              &_question {
                @include flex(flex-start, center);
                &_icon {
                  width: 38rpx;
                  height: 38rpx;
                }
                &_text {
                  margin-left: 20rpx;
                  font-size: 26rpx;
                }
              }
              &_answer {
                margin-top: 20rpx;
                margin-left: 50rpx;
                border-radius: $default-border-radius;
                padding: $middle-space;
                background: #eeeeee;
                display: flex;
                &_icon {
                  width: 38rpx;
                  height: 38rpx;
                }
                &_text {
                  margin-left: 20rpx;
                  font-size: 26rpx;
                  color: $lightColor;
                  padding-bottom: 28rpx;
                  position: relative;
                  width:100%;
                  &_time {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    font-size: 24rpx;
                  }
                }
              }
            }
          }
        }
      }
      &_file {
        margin-top: 20rpx;
        padding-bottom: 120rpx;
        &_item {
          margin-bottom: 20rpx;
          &_title {
            background: #ffffff;
            padding: $middle-space;
            font-size: 26rpx;
            border-bottom: 1px solid $borderColor;
            p{
              padding-left: $middle-space;
              border-left: 6px solid $mainColor;
            }
          }
          &_content {
            &_title {
              background: #ffffff;
              padding: $middle-space;
              font-size: 26rpx;
              border-bottom: 1px solid $borderColor;
              color: $lightColor;
            }
            &_item {
              background: #ffffff;
              padding: $middle-space;
              font-size: 26rpx;
              border-bottom: 1px solid $borderColor;
              @include flex(space-between, center);
              &:last-child {
                border-bottom: 0;
              }
              &_text {
                width: 640rpx;
                color: $mainColor;
                @include text-truncate();
              }
              &_icon {
                width: 15rpx;
                height: 28rpx;
              }
              > span {
                color: $mainColor;
              }
            }
          }
        }
      }
    }
  }
  &_footer {
    width: 100%;
    height: 100rpx;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    &_adviser {
      flex: 1;
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
      background: $mainColor;
      color: #fff;
    }
    &_invest {
      flex: 1;
      height: 100rpx;
      background: #84A9F8;
      text-align: center;
      line-height: 100rpx;
      color: #ffffff;
    }
    &_left, &_right {
      @include flex();
      flex: 1;
      align-self: stretch;
      background: #fff;
    }
    &_right {
      flex: 2;
    }
    &_icon {
      flex: 1;
      @include flex();
      flex-direction: column;
      font-size: 24px;
      color: $deepColor;
      img {
        @include size(34px);
      }
      &:not(:last-child) {
        border-right: 1px solid $borderColor;
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  @include size(100vw, 100vh);
  background: rgba(0,0,0,.4);
}
.file {
  @include flex();
}
</style>


