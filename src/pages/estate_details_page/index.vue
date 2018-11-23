<template>
  <div class="container">
    <div class="banner_box">
      <swiper autoplay @change="changeCurrent">
        <block v-for="(item,index) in detail.images" :key="index">
          <swiper-item>
            <img :src="item" class="banner_img" @click="previewImage(item)"/>
            <!-- <video :src="item.url" class="banner_video" v-if="item.type == 2"></video> -->
          </swiper-item>
        </block>
      </swiper>
      <cover-image src="/images/icon_video.png" v-if="type == 2" class="video_icon"/>
      <cover-image src="/images/icon_pic.png" class="pic_icon"/>
      <div class="banner_page">{{current}}/{{totleLength}}</div>
    </div>

    <div class="product_simple">
      <P class="product_title">{{detail.name || '---'}}</P>
      <div class="product_address">
        <img src="/images/icon_map.png" class="map_icon" />
        <span>{{estateDetail.address}}</span>
        <div class="border_small">|</div>
        <div>佣金：<span class="commision">{{detail.commission}}</span></div>
      </div>
      <div class="product_feature">
        <!-- <block v-for="(item,index) in featureList" :key="index"> -->
          <div class="feature_li">
            <p class="amount"><span class="admin_small_size">¥</span><span>{{estateDetail.amount || '---'}}</span><span class="admin_small_size">万起</span>
            </p>
            <p class="feature_name">总价</p>
          </div>
          <div class="border_big"></div>
          <div class="feature_li">
            <p class="amount">{{estateDetail.down_payment || '---'}}</p>
            <p class="feature_name">首付</p>
          </div>
          <div class="border_big"></div>
          <div class="feature_li">
            <p class="amount">{{estateDetail.increase || '---'}}</p>
            <p class="feature_name">近一年的涨幅</p>
          </div>
          <div class="border_big"></div>
          <div class="feature_li">
            <p class="amount">{{estateDetail.year_rent_return_rate || '---'}}</p>
            <p class="feature_name">年均租金</p>
          </div>
        <!-- </block> -->
      </div>
    </div>

    <div class="admin">
      <!-- <img :src="detail.logo" class="admin_logo"/>
      <div class="admin_info">
        <p class="admin_name">{{detail.description}}</p>
        <div class="admin_tag">
          <div class="admin_official" v-if="detail.is_legalize">官方通道</div>
          <block v-for="(item,index) in management_tag" :key="index">
            <div class="admin_feater">{{item}}</div>
          </block>
        </div>
      </div>
      <img src="/images/icon_arrow_product.png" class="arrow_icon"/> -->
      <div class="admin_item"  @click="showShareBtn = true">
        <img src="/images/icon_pdf.png" class="admin_pdf_icon" />
        <span>项目材料</span>
        <div v-if="showShareBtn">
          <span @click="openFile" class="btn">查看</span>
          <navigator class="btn" hover-class="none" v-if="detail.product_book_documents.length > 0"
                     open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                     :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + detail.product_book_documents[0].document_name + '&filePath=' + detail.product_book_documents[0].document_url"
                     target="miniProgram"
                     version="trial"
          >分享</navigator><!--develop-->
        </div>
      </div>
      <div class="admin_item" @click="toPage('/pages/admin_details_page/main?management_id=' + detail.management_id)">
        <img src="/images/icon_admin1.png" class="admin_icon"/>
        <span>开发商介绍</span>
      </div>
    </div>

    <div class="common_detail">
      <div class="common_top" @click="toPage({url: '/pages/estate_information_page/main', data: {product_id: product_id}})">
        <img src="/images/icon_adminTitle.png" class="bitmap_icon"/>
        <span class="common_label">项目信息</span>
        <img src="/images/icon_arrow_product.png" class="arrow_icon"/>
      </div>
      <div class="detail_introduction" v-if="estateDetail.project_intro">{{estateDetail.project_intro}}</div>
      <ul class="detail_option">
        <li>
          <p>产权年限：<span>{{estateDetail.property_years}}</span></p>
          <p>物业类型：<span>{{estateDetail.property_type}}</span></p>
          <p>规划面积：<span>{{estateDetail.project_area}}</span></p>
        </li>
        <li>
          <p>交房日期：<span>{{estateDetail.delivery_date}}</span></p>
          <p>项目户数：<span>{{estateDetail.house_num}}</span></p>
          <p>能否贷款：<span>{{estateDetail.support_loans ? '是' : '否'}}</span></p>
        </li>
      </ul>
    </div>

    <!-- <div class="common_detail" @click="toPage({url: '/pages/estate_map_page/main', data: {product_id: product_id}})"> -->
    <div class="common_detail">
      <div class="common_top">
        <img src="/images/icon_adminTitle.png" class="bitmap_icon"/>
        <span class="common_label">周边配套</span>
        <!-- <img src="/images/icon_arrow_product.png" class="arrow_icon"/> -->
      </div>
      <div class="detail_address">
        <p>{{estateDetail.address}}</p>
        <img :src="estateDetail.map_image" class="map_img"/>
      </div>
    </div>

    <!-- <div class="common_detail" v-if="schoolList && schoolList.length > 0">
      <div class="common_top">
        <img src="/images/icon_adminTitle.png" class="bitmap_icon"/>
        <span class="common_label">周边学校</span>
        <img src="/images/icon_arrow_product.png" class="arrow_icon"/>
      </div>
      <div class="detail_school">
        <div class="school_tags">
          <block v-for="(item,index) in schoolTagList" :key="index">
            <p :class="selectedSchool == item.value ? 'school_tag_active' : 'school_tag'" @click="changeSchoolTag(item.value)">{{item.name}}</p>
          </block>
        </div>
        <div :class="index == schoolList.length -1 ? 'school_name_box school_name_box_none' : 'school_name_box'" v-for="(item,index) in schoolList" :key="index">
          <p class="school_name_symbol">8</p>
          <span class="school_name">{{item.name}}</span>
          <div>
            <p class="school_distance">{{item.dist}}</p>
            <p class="school_distance">千米</p>
          </div>
        </div>
        <div class="school_name_box school_name_box_none">
          <p class="school_name_symbol">8</p>
          <span class="school_name">Chauwafgsu Istanbul Turkey  Question niversity niversity niversity</span>
          <div>
            <p class="school_distance">480</p>
            <p class="school_distance">公里</p>
          </div>
        </div>
      </div>
    </div> -->

    <div class="common_detail" v-if="apratmentList && apratmentList.length > 0">
      <div class="common_top">
        <img src="/images/icon_adminTitle.png" class="bitmap_icon"/>
        <span class="common_label">在售户型</span>
        <!-- <img src="/images/icon_arrow_product.png" class="arrow_icon"/> -->
      </div>
      <div class="house_type">
        <scroll-view scroll-x>
          <div class="type_scroll">
            <div class="type_scroll_option" v-for="(item,index) in apratmentList" :key="index">
              <img :src="item.image" class="house_img" @click="openTypeImg(item.image)"/>
              <p>{{item.name}} · {{item.area}}㎡ · ¥{{item.amount}}万</p>
            </div>
          </div>
        </scroll-view>
      </div>
    </div>

    <div class="image_and_text">
      <div class="img_text_tags">
        <block v-for="(item,index) in houseTagList" :key="index">
          <p :class="selectedHouse == item.value ? 'img_text_tag_active' : 'img_text_tag'" @click="changeHouseTag(item.value)">{{item.name}}</p>
        </block>
      </div>
      <div class="text_detail" v-if="selectedHouse == 1">
        <wxParse :content="article" :imageProp="imageProp" noData="数据加载中。。。" className="wx_parse_box"/>
      </div>
      <div class="content_information" v-if="selectedHouse == 2">
        <div :class="index == productArticle.length - 1 ? 'border_none content_information_item' : 'content_information_item'" v-for="(item, index) in productArticle" :key="index" @click="goArticle(item.id)">
          <img mode="scaleToFill" :src="item.head_img" alt="" class="CI_img"/>
          <div class="content_information_item_main">
            <p class="content_information_item_main_name"> {{item.title}} </p>
            <p class="content_information_item_main_other"> <span> {{item.created_at}} </span>|<span>{{item.pv}} 阅读量</span> </p>
          </div>
        </div>
      </div>
      <div class="purchase_notice" v-if="selectedHouse == 3">
        <div class="purchase_process" v-if="detail.sales_process.length > 0">
          <p class="process_label">交易流程</p>
          <block v-for="(item,index) in detail.sales_process" :key="index">
            <img :src="item.url" class="process_img" />
            <p class="img_title">{{item.name}}</p>
          </block>
        </div>

        <div class="border_block" v-if="detail.sales_process.length > 0"></div>
        <div class="question" v-if="detail.finance_question_list.length > 0">
          <p class="question_label">问题解答</p>
          <block v-for="(item,index) in detail.finance_question_list" :key="index">
            <div class="question_answer">
              <div class="question_box">
                <img class="question_icon" src="/images/icon_question.png" />
                <p class="question_title">{{item.question}}</p>
              </div>
              <div class="answer_box">
                <div class="question_box">
                  <img class="question_icon" src="/images/icon_answer.png" />
                  <p class="question_title">{{item.answer}}</p>
                </div>
                <p class="answer_time">{{item.update_at ? item.update_at : item.create_at}}</p>
              </div>
            </div>
          </block>
        </div>
      </div>
      <div class="project_documents" v-if="selectedHouse == 4">
        <div v-if="detail.introduction_documents && detail.introduction_documents.length > 0">
          <div class="doc_type_name">产品介绍文件</div>
          <ul class="docs_list">
            <li :class="index == detail.introduction_documents.length -1 ? 'doc border_none' : 'doc'" v-for="(item,index) in detail.introduction_documents" :key="index" >
              <!--<span class="doc_name">{{item.document_name}}</span>
              <img src="/images/icon_arrow_product.png" class="download_icon"/>-->
              <span @click="$common.previewFile(item.document_url, 'pdf')">{{item.document_name}}</span>
              <navigator class="file" hover-class="none"
                         open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                         :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.document_name + '&filePath=' + item.document_url"
                         target="miniProgram"
                         version="trial"
              >
                <img src="/images/icon_share.png" mode="aspectFit" style="width: 40rpx;height: 43rpx;">
              </navigator><!--develop-->
            </li>
          </ul>
          <div class="border_block"></div>
        </div>
        <div v-if="(onlyReadDocs && onlyReadDocs.length > 0) || (signDocs && signDocs.length > 0)">
          <div class="doc_type_name">投资者认购文件</div>
          <div v-if="onlyReadDocs && onlyReadDocs.length > 0">
            <div class="read_only">仅供阅读</div>
            <ul class="docs_list">
              <li :class="index == onlyReadDocs.length -1 ? 'doc border_none' : 'doc'" v-for="(item,index) in onlyReadDocs" :key="index" >
               <!-- <span class="doc_name">{{item.document_name}}</span>
                <img src="/images/icon_arrow_product.png" class="download_icon"/>-->
                <span @click="$common.previewFile(item.document_url, 'pdf')">{{item.document_name}}</span>
                <navigator class="file" hover-class="none"
                           open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                           :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.document_name + '&filePath=' + item.document_url"
                           target="miniProgram"
                           version="trial"
                >
                  <img src="/images/icon_share.png" mode="aspectFit" style="width: 40rpx;height: 43rpx;">
                </navigator><!--develop-->
              </li>
            </ul>
          </div>
          <div v-if="signDocs && signDocs.length > 0">
            <div class="read_only sign">签署文件</div>
            <ul class="docs_list">
              <li class="index == signDocs.length -1 ? 'doc border_none ' : 'doc'" v-for="(item,index) in signDocs" :key="index">
                <!--<span class="doc_name">{{item.document_name}}</span>
                <img src="/images/icon_arrow_product.png" class="download_icon"/>-->
                <span @click="$common.previewFile(item.document_url, 'pdf')">{{item.document_name}}</span>
                <navigator class="file" hover-class="none"
                           open-type="navigate" app-id="wxcd7c5762adbd3cf5"
                           :path="'/pages/investment_report_file/main?fileType=pdf&source=itrade_wx&title=' + item.document_name + '&filePath=' + item.document_url"
                           target="miniProgram"
                           version="trial"
                >
                  <img src="/images/icon_share.png" mode="aspectFit" style="width: 40rpx;height: 43rpx;">
                </navigator><!--develop-->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="finance_footer">
      <div class="finance_footer_left">
        <div class="finance_footer_icon" @click="changeCollection">
          <img :src="detail.is_favor ? '/images/icon_collection_active.png' : '/images/icon_collection.png'" />
          <span>{{detail.is_favor ? '已收藏' : '收藏'}}</span>
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
      <div class="collection" @click="changeCollection">
        <img :src="detail.is_favor ? '/images/icon_collection_active.png' : '/images/icon_collection.png'" class="collection_icon"/>
        <span>{{detail.is_favor ? '已收藏' : '收藏'}}</span>
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
import wxParse from 'mpvue-wxparse'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      title: '海外房产',
      product_id: '',
      bannerList: [
        // {id: 1, url: 'https://file.meixinglobal.com/media/20180703/409c2f20-1da7-476b-a7c0-9060b0da0cbc.mp4', type: 2},
        {id: 2, url: 'https://doc.meixinglobal.com/docs/20180704/1530636659626/29/5.png', type: 2},
        {id: 3, url: 'https://doc.meixinglobal.com/docs/20180704/1530636623485/30/4.jpg', type: 1},
        {id: 4, url: 'https://doc.meixinglobal.com/docs/20180704/1530636670707/26/6.jpg', type: 1}
      ],
      featureList: [
        {name: '总价', amount: 52},
        {name: '总价总价', amount: 52},
        {name: '总价', amount: 525252},
      ],
      schoolTagList: [
        {name: '附近大学', value: 1},
        {name: '附近中学', value: 2},
        {name: '附近小学', value: 3}
      ],
      houseTagList: [
        {name: '图文特色', value: 1},
        {name: '相关资讯', value: 2},
        {name: '购房须知', value: 3},
        {name: '项目资料', value: 4}
      ],
      selectedSchool: 1,
      selectedHouse: 1,
      current: 1,
      type: 1,
      detail: {},
      estateDetail: {},
      totleLength: 0,
      management_tag: [],
      schoolList: [],
      apratmentList: [],
      onlyReadDocs: [],
      signDocs: [],
      article: '',
      introduce_code: '',
      product_type: '',
      deliverData: {},
      path: '',
      imageProp: {
        'mode': 'widthFix',
      },
      showShareBtn: false,
    }
  },
  methods: {
    toMiniProgram () {
      let _this = this
      // 数据统计
      _this.$auth.dataBuryPoint({
        eventName: 'product_detail:share_button:click',
        eventDataId: this.product_id,
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
    // 选学校 tag
    changeSchoolTag (value) {
      this.selectedSchool = value
    },
    // 选图文 文件 tag
    changeHouseTag (value) {
      this.selectedHouse = value
    },
    // banner 切换 current index
    changeCurrent (e) {
      let index = e.target.current
      // this.type = this.bannerList[index].type
      this.current = index + 1
    },
    // 获取产品详情
    getEstateDetail (id) {
      this.$http.post('/wx/itrade/finance/detail?finance_id=' + id, {finance_id: id}).then((res) => {
        this.detail = res
        this.estateDetail = res.finance_estate_desc
        this.totleLength = res.images.length
        let newDescs = res.finance_estate_desc.descs.replace(/<o:p>|&nbsp;/ig, '')
        this.article = newDescs
        if (res.management_tag) {
          this.management_tag = res.management_tag.split(',')
        }
        if (JSON.parse(res.map_json)) {
          this.schoolList = JSON.parse(res.map_json).neighborhood_facilities.school
        }
        let intl = res.legal_documents_intl || []
        let usa = res.legal_documents_usa || []
        let allDocuments = [...intl, ...usa]
        allDocuments.map((item) => {
          if (item.need_mapped) {
            this.signDocs.push(item)
          } else {
            this.onlyReadDocs.push(item)
          }
        })
      })
    },
    // 获取户型图
    getApratmentList (id) {
      this.$http.get('/wx/itrade/estate/apratment/list', {finance_id: id}).then((res) => {
        this.apratmentList = res.list
      })
    },
    // 预览文件
    openDocument (url) {
      let that = this
      this.$http.get('/wx/investor/is/auth').then(res => {
        console.log(res + '=======isauth')
        if (!res) {
          wx.showModal({
            title: '合格投资者认定',
            content: '根据相关法律法规要求，美信平台上的产品仅开放给特定的合格投资者。如您有意在美信平台进行投资，请确认您的个人净资产（除主要住宅外）超过100万美元。1.我的个人净资产（除主要住宅外）超过100万美元。2.我同意，如果我的个人净资产（除主要住宅外）在此次确认后，变成低于100万美元，我将及时通知美信。由于未及时通知美信导致的法律后果由我个人承担。',
            confirmText: '我同意',
            success: function (res) {
              if (res.confirm) {
                that.$http.post('/wx/investor/auth').then(d => {
                  that.openDoc(url)
                })
              }
            }
          })
        } else {
          that.openDoc(url)
        }
      })
    },
    openFile () {
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'product_detail:load_product_book:click',
        eventDataId: this.product_id,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduceCode,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
      if (this.detail.product_book_documents.length > 0) {
        this.$common.previewFile(this.detail.product_book_documents[0].document_url, 'pdf')
      } else {
        wx.showToast({
          title: '暂无文件',
          icon: 'none'
        })
      }
    },
    openDoc (url) {
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
              },
              success: function (res) {
                wx.hideLoading()
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
    // 保存文件
    saveDocument (url) {
      wx.downloadFile({
        url: url,
        success: function (res) {
          if (res.statusCode === 200) {
            wx.saveFile({
              tempFilePath: res.tempFilePath,
              success: function (d) {
                console.log(d)
              },
              fail: function () {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          } else {
            wx.showToast({
              title: '文件名错误',
              icon: 'none'
            })
          }
        },
        fail: function () {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
        }
      })
    },
    // 联系理财师
    // contact () {
    //   let _this = this
    //   wx.showModal({
    //     title: '提示',
    //     content: `是否联系理财师:${_this.advisorInfo.name}`,
    //     success: function (res) {
    //       if (res.confirm) {
    //         console.log('用户点击确定')
    //         wx.makePhoneCall({
    //           phoneNumber: `${_this.advisorInfo.phone}`
    //         })
    //       } else if (res.cancel) {
    //         console.log('用户点击取消')
    //       }
    //     }
    //   })
    // },
    // 打开产品书
    openProductDoc () {
      let url = ''
      wx.showLoading({
        title: '文件打开中'
      })
      if (this.detail.product_book_documents.length > 0) {
        url = this.detail.product_book_documents[0].document_url
        wx.downloadFile({
          url: url,
          success: function (res) {
            if (res.statusCode === 200) {
              wx.openDocument({
                filePath: res.tempFilePath,
                success: function () {
                  wx.hideLoading()
                },
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
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '暂无文件',
          icon: 'none'
        })
      }
    },
    // 立即投资
    sharecCustom () {
      // this.toPage({
      //   url: '/pages/estate/product/choose_house/main',
      //   data: {
      //     product_id: this.product_id,
      //     introduce_code: this.introduce_code,
      //   }
      // })
      wx.navigateToMiniProgram({
        appId: 'wxcd7c5762adbd3cf5',
        path: '/pages/estate/product/product_detail/main'
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
    // 图片预览banner
    previewImage (url) {
      wx.previewImage({
        urls: this.detail.images,
        current: url
      })
    },
    // 户型图
    openTypeImg (url) {
      console.log(this.apratmentList)
      let list = []
      this.apratmentList.forEach(item => {
        list.push(item.image)
      })
      wx.previewImage({
        urls: list,
        current: url
      })
    },
    changeCollection () {
      // 数据统计
      this.$auth.dataBuryPoint({
        eventName: 'product_detail:collect:click',
        eventDataId: this.product_id,
        source: this.$root.$mp.query.source,
        utmSource: this.$root.$mp.query.utm_source,
        introduceCode: this.introduceCode,
        shareInvestorId: '',
        prePage: wx.getStorageSync('from')
      })
      let params = {
        is_favor: !this.detail.is_favor,
        product_id: this.product_id,
        product_type: this.product_type
      }
      this.$http.post('/wx/itrade/finance/favor', params).then(d => {
        this.detail.is_favor = !this.detail.is_favor
        // this.$store.dispatch('getProductInfo', {
        //   id: this.productId,
        //   type: this.productType
        // })
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
  async onLoad (option) {
    console.log(option)
    // await this.$auth.login()
    this.product_id = option.product_id
    this.product_type = option.product_type || 2
    let status = await this.$http.get('/wx/itrade/channel/getAdvisorByLogin', {})
    this.introduceCode = status.code

    this.deliverData.product_id = this.product_id
    this.deliverData.product_type = this.product_type
    this.deliverData.introduce_code = status.code

    this.path = `/pages/estate/product/product_detail/main?product_id=${this.deliverData.product_id}&product_type=${this.deliverData.product_type}&introduce_code=${this.deliverData.introduce_code}&source=itrade_wx`
    // await this.$auth.login(this.$root.$mp.query)
    // let disclosure = await this.$http.get('/wx/investor/isshow/disclosure')
    // if (!disclosure) {
    //   this.toPage('/pages/share_platform_leak/main')
    // }
    // let id = this.$root.$mp.query.product_id
    // this.introduce_code = this.$root.$mp.query.introduce_code
    // let productType = this.$root.$mp.query.product_type || 2
    // this.$store.dispatch('getProductAdvisor', {
    //   channel_advisor_code: this.introduce_code,
    // })
    await this.$store.dispatch('getProductArticle', {
      id: this.product_id,
      type: this.product_type
    })
    // this.product_id = id
    this.getEstateDetail(option.product_id)
    this.getApratmentList(option.product_id)
    // 数据统计
    this.$auth.dataBuryPoint({
      eventName: 'product_detail:init:visit',
      eventDataId: this.product_id,
      source: this.$root.$mp.query.source,
      utmSource: this.$root.$mp.query.utm_source,
      introduceCode: this.introduceCode,
      shareInvestorId: '',
      prePage: wx.getStorageSync('from')
    })
  },
  components: {
    wxParse
  },
  computed: {
    ...mapGetters({
      productArticle: 'productArticle'
    })
  },
}
</script>

<style scoped lang="scss">
  .container{
    overflow: hidden;
    font-size: 24rpx;
    color: #555;
    padding-bottom: 200px;
  }
  .banner_box{
    position: relative;
  }
  swiper{
    height: 450rpx;
  }
  cover-image {
    position: absolute;
    bottom: 22rpx;
  }
  .banner_img{
    width: 100%;
    height: 450rpx;
  }
  .video_icon{
    left: 20rpx;
    z-index: 100;
    width: 50rpx;
    height: 30rpx;
  }
  .pic_icon{
    right: 100rpx;
    width: 40rpx;
    height: 32rpx;
  }
  .banner_page{
    position: absolute;
    bottom: 20rpx;
    right: 30rpx;
    color: #fff;
    font-size: 28rpx;
  }
  .banner_video{
    width: 100%;
    height: 450rpx;
  }
  .product_simple{
    background: #fff;
    padding-bottom: 35rpx;
  }
  .product_title{
    font-size: 34rpx;
    text-align: center;
    padding: 28rpx 20rpx;
  }
  .product_address{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
  }
  .map_icon{
    width: 30rpx;
    height: 33rpx;
    margin-right: 20rpx;
  }
  .border_small{
    color: #ddd;
    margin: 0 40rpx;
  }
  .commision{
    color: $mainColor;
  }
  .product_feature{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20rpx;
    margin-top: 45rpx;
  }
  .amount{
    color: $mainColor;
    font-size: 38rpx;
    text-align: center;
    margin-bottom: 12rpx;
  }
  .feature_name{
    text-align: center;
  }
  .border_big{
    width: 0;
    height: 60rpx;
    border-left: 1rpx solid #ddd;
  }

  .admin{
    height: 180rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 0 30rpx;
    margin: 20rpx 0;
  }
  .admin_logo{
    width: 106rpx;
    height: 106rpx;
    margin-right: 28rpx;
  }
  .admin_info{
    flex: 1;
  }
  .admin_tag{
    display: flex;
  }
  .admin_name{
    font-weight: bold;
    margin-bottom: 14rpx;
  }
  .admin_official{
    width: 106rpx;
    height: 36rpx;
    color: #fff;
    font-size: 20rpx;
    line-height: 36rpx;
    text-align: center;
    background-image: linear-gradient(39deg, #E1A678 0%, #EBC07F 100%);
    border-radius: 6rpx;
  }
  .admin_feater{
    color: #EA8165;
    font-size: 20rpx;
    line-height: 34rpx;
    border-radius: 6rpx;
    border: 1rpx solid #EA8165;
    padding: 0 16rpx;
    margin-left: 10rpx;
  }
  .admin_item{
    width: 330px;
    height: 120px;
    display: flex;
    align-items: center;
    background: #FAFAFA;
    border: 1px solid #C8C8C8;
    border-radius: 4px;
    padding: 0 30px;
    box-sizing: border-box;
    position: relative;
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
  .admin_down_pdf{
    justify-content: center;
  }
  .admin_pdf_icon{
    width: 60px;
    height: 66px;
    margin-right: 42px;
  }
  .admin_icon{
    width: 62px;
    height: 63px;
    margin-right: 26px;
  }
  .admin_small_size{
    font-size: 24px;
  }
  .arrow_icon{
    width: 15rpx;
    height: 28rpx;
  }

  .common_detail{
    background: #fff;
    margin-bottom: 20rpx;
  }
  .common_top{
    height: 90rpx;
    display: flex;
    align-items: center;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #ddd;
  }
  .bitmap_icon{
    width: 27rpx;
    height: 28rpx;
    margin-right: 20rpx;
  }
  .common_label{
    flex: 1;
    font-size: 30rpx;
  }
  .detail_introduction{
    font-size: 26rpx;
    line-height: 48rpx;
    padding: 30rpx 0 30rpx;
    margin: 0 20px;
    border-bottom: 1rpx dashed #ddd;
  }
  .detail_option{
    display: flex;
    padding: 40rpx 0rpx 25rpx;
    margin: 0 20rpx;
  }
  .detail_option li{
    flex: 1;
  }
  .detail_option p{
    color: #999;
    font-size: 26rpx;
    margin-bottom: 20rpx;
  }
  .detail_option span{
    color: #666;
  }
  .detail_address{
    font-size: 26rpx;
    padding: 30rpx 20rpx 36rpx;
  }
  .map_img{
    width: 100%;
    height: 400rpx;
    margin-top: 30rpx;
  }
  .detail_school{
    padding: 30rpx 22rpx 10rpx;
  }
  .school_tags{
    display: flex;
    justify-content: space-around;
  }
  .school_tag{
    font-size: 26rpx;
    padding: 0 8rpx 15rpx;
    border-bottom: 4rpx solid transparent;
  }
  .school_tag_active{
    color: $mainColor;
    font-size: 26rpx;
    padding: 0 8rpx 15rpx;
    border-bottom: 4rpx solid $mainColor;
  }
  .school_name_box{
    display: flex;
    align-items: center;
    padding-bottom: 30rpx;
    margin-top: 30rpx;
    border-bottom: 1rpx solid #ddd;
  }
  .school_name_box_none{
    border: none;
  }
  .school_name_symbol{
    width: 80rpx;
    height: 80rpx;
    color: $mainColor;
    font-size: 48rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 50%;
    border: 1rpx dashed $mainColor;
    margin-right: 30rpx;
  }
  .school_name{
    flex: 1;
    max-width: 476rpx;
    font-size: 26rpx;
    line-height: 38rpx;
    margin-right: 45rpx;
  }
  .school_distance{
    color: #999;
    font-size: 26rpx;
    text-align: right;
  }

  .type_scroll{
    width: 100%;
    display: flex;
    font-size: 26rpx;
    padding: 20rpx 20rpx 30rpx;
  }
  .type_scroll_option{
    max-width: 454rpx;
    margin-right: 20rpx;
  }
  .house_img{
    width: 454rpx;
    height: 296rpx;
    border: 1px solid #ddd;
    margin-bottom: 20rpx;
  }

  .image_and_text{
    min-height: 100px;
    background: #fff;
    margin-bottom: 100rpx;
  }
  .img_text_tags{
    display: flex;
    justify-content: space-around;
    padding-top: 24rpx;
    border-bottom: 1rpx solid #ddd;
  }
  .img_text_tag{
    font-size: 30rpx;
    // color: #999;
    padding: 0 24rpx 15rpx;
    border-bottom: 4rpx solid transparent;
  }
  .img_text_tag_active{
    font-size: 30rpx;
    color: $mainColor;
    padding: 0 24rpx 15rpx;
    border-bottom: 4rpx solid $mainColor;
  }
  .text_detail{
    font-size: 26rpx;
    color: #666;
    line-height: 48rpx;
    padding: 40rpx 20rpx 30rpx;
  }
  // .detail_img{
  //   width: 100%;
  //   height: 473rpx;
  //   margin: 30rpx 0;
  // }
  .content_information{
    padding: 0 30px;
  }
  .content_information_item{
    display: flex;
    padding: 24px 0;
    border-bottom: 1px solid #cccccc;
  }
  .content_information_item_main{
    flex: 1;
  }
  .content_information_item_main_name{
    font-weight: bold;
    font-size: 26px;
    line-height: 38px;
    margin-bottom: 15px;
  }
  .content_information_item_main_other{
    color: #999;
    font-size: 22px;
  }
  .CI_img{
    width: 132px;
    height: 116px;
    margin-right: 20px;
  }
  .purchase_process,.question{
    padding: 20rpx 20rpx 25rpx;
  }
  .process_label,.question_label{
    font-size: 28rpx;
    color: #999;
  }
  .process_img{
    width: 100%;
    height: 379rpx;
    margin: 30rpx 0 26rpx;
    border: 1rpx solid #E7E7E7;
  }
  .img_title{
    font-size: 28rpx;
    color: #999;
    text-align: center;
  }
  .border_block{
    width: 100%;
    height: 20rpx;
    background: $backgroundColor;
  }

  .question_label{
    margin-bottom: 10rpx;
  }
  .question_box{
    display: flex;
  }
  .question_answer{
    padding: 22rpx 0;
    margin-bottom: 18rpx;
  }
  .question_icon{
    width: 38rpx;
    height: 41rpx;
    vertical-align: middle;
    margin-right: 20rpx;
  }
  .question_title{
    flex: 1;
    font-size: 26rpx;
    line-height: 42rpx;
  }
  .answer_box{
    font-size: 24rpx;
    color: #787878;
    line-height: 38rpx;
    background: #F5F5F5;
    padding: 20rpx;
    margin-left: 55rpx;
    margin-top: 10rpx;
  }
  .answer_time{
    font-size: 20rpx;
    color: #646464;
    text-align: right;
    margin-top: 10rpx;
  }
  .doc_type_name{
    position: relative;
    font-size: 26rpx;
    color: #5A5A5A;
    font-weight: bold;
    line-height: 80rpx;
    padding-left: 30rpx;
    border-bottom: 1rpx solid #ddd;
  }
  .doc_type_name::after{
    content: '';
    width: 0;
    height: 30px;
    position: absolute;
    left: 14px;
    top: 25px;
    border: 3rpx solid $mainColor;
  }
  .docs_list{
    padding: 0 30rpx;
    > li {
      @include flex(space-between);
      span {
        flex: 1;
        color: $mainColor;
      }
    }
  }
  .doc{
    height: 78rpx;
    @include flex(space-between,center);
    border-bottom: 1rpx dashed #ddd;
  }
  .doc_name{
    color: $mainColor;
  }
  .download_icon{
    width: 15rpx;
    height: 28rpx;
  }
  .read_only{
    font-size: 26rpx;
    color: #999;
    padding: 20rpx 30rpx 18rpx;
  }
  .sign{
    border-top: 1rpx solid #ddd;
  }
  .border_none{
    border: none
  }
  .finance_footer {
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
<style lang="scss">
  .wx_parse_box{
    margin: 0 20px;
    overflow: hidden;
    image{
      max-width: 710px !important;
    }
  }
</style>
