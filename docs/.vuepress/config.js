module.exports = {
  base: '/blog/', //部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 "/bar/"，它的值应当总是以斜杠开始，并以斜杠结束。
  dest: './dist',
  title: 'jinjun',
  description: '身体不是认知的外在，而是认知本身；语言不是思考的外在，而是思考本身。', //网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中,还显示在首页的文章列表上面
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }
    ]
  ],
  // theme: 'indigo-material',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'jinjun',
      description: '前端开发 JavaScript webpack 金俊 jinjun '
    }
  },
  markdown: {
    lineNumbers: true //是否开启文章代码左边的行号显示
  },
  themeConfig: {
    placeholder: '搜搜看', //搜索框的默认文章
    searchReply: '什么都没搜到，试一下其它搜索词~',
    author: 'jinjun', //侧边栏的设置
    email: 'jinjun199403@gmail.com',
    pagination: '5', //每一页显示的文章个数
    avatar: '/avatar.png', //头像地址
    brand: '', //头像背景图片地址
    github: 'https://github.com/jinjun1994', //点击github跳转的地址
    vssue: {
      //评论的配置,
      need: false, //是否需要评论
      development: {
        //开发环境下的配置
        clientId: '',
        clientSecret: '',
        owner: '',
        repo: '',
        locale: 'zh'
      },
      production: {
        //生产环境的配置
        clientId: '',
        clientSecret: '',
        owner: '',
        repo: '',
        locale: 'zh'
      }
    },
    menus: {
      //侧边栏的文字
      tags: '标签分类',
      home: '主页',
      all: '时间归档',
      github: 'Github',
      about: '关于我'
    }
  }
};
