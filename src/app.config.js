/**
 * 此文件修改后需重启生效 yarn dev
 **/
module.exports = {
  'pages': [
    'pages/index/main',
    'pages/landing_page/main', // landingpage
    'pages/article_details_page/main',
    'pages/legalize_info_page/main',
    'pages/legalize_page/main',     // 认证改造新(开发中。。。。)
    'pages/product_list_page/main',
    'pages/logs/main',
    'pages/counter/main',
    'pages/school/main',
    'pages/finance_details_page/main',
    'pages/estate_details_page/main',
    'pages/estate_map_page/main',
    'pages/insurance_details_page/main',
    'pages/admin_details_page/main',
    'pages/admin_team_page/main',
    'pages/estate_information_page/main',
    'pages/login_vcode/main',
    'pages/login_psd/main',
    'pages/reset_psd_one/main',
    'pages/reset_psd_two/main',
    'pages/register_invite_code/main',
    'pages/register_phone/main',
    'pages/register_complete/main',
    'pages/web_view_page/main',
    'pages/personal_Center/main', // 我的模块页面
    'pages/product_collection/main', // 产品收藏页面
    'pages/collection_of_articles/main', // 文章收藏页面
    'pages/my_Order/main', // 订单页面
    'pages/order_detail_other/main', // 其他订单详情
    'pages/my_activity/main', // 活动
    'pages/reimbursement/main', // 回款记录
    'pages/investment_report/main', // 投资报告
    'pages/order_investment_report/main', // 订单投资报告
    'pages/order_detail_file/main', // 订单文件
    'pages/my_file/main', // 投资文件
    'pages/share/main', // 分享页面
    'pages/qrcode/main', // 二维码页面
    'pages/new_prospectus/main', // 新建保险计划书
    'pages/article/main', // 资讯详情
    'pages/choose_product/main', // 选择产品
    'pages/plan/main', // 我的计划书
    'pages/share_file/main', // 分享文件页
    'pages/trusteeship/main', // 托管服务
    'pages/house_trust/main', // 房屋托管
    'pages/insurance_landing_page/main',  // 保单分享页
  ],
  'window': {
    'backgroundTextStyle': 'light',
    'navigationBarBackgroundColor': '#fff',
    'navigationBarTitleText': '美信',
    'navigationBarTextStyle': 'black',
    'backgroundColor': '#f5f5f5'
  },
  'tabBar': {
    'color': '#cccccc',
    'selectedColor': '#306FF4',
    'borderStyle': 'white',
    'backgroundColor': '#fff',
    'list': [
      {
        'pagePath': 'pages/index/main',
        'text': '首页',
        'iconPath': 'images/tab_home.png',
        'selectedIconPath': 'images/tab_home_active.png'
      },
      {
        'pagePath': 'pages/school/main',
        'text': '发现',
        'iconPath': 'images/tab_find.png',
        'selectedIconPath': 'images/tab_find_active.png'
      },
      {
        'pagePath': 'pages/personal_Center/main',
        'text': '我的',
        'iconPath': 'images/tab_mine.png',
        'selectedIconPath': 'images/tab_mine_active.png',
      }
    ]
  },
  'navigateToMiniProgramAppIdList': [
    'wxcd7c5762adbd3cf5',
    'wx5621a217daf101a6',
  ]
}
