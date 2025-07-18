import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).mount('#app')

import {
  Button,
  Form,
  Field,
  CellGroup,
  Cell,
  Icon,
  NavBar,
  Tabbar,
  TabbarItem,
  Search,
  List,
  PullRefresh,
  Empty,
  Popup,
  FloatingBubble,
  Toast,
  Dialog,
  Loading,
  Overlay,
  ActionSheet,
  Picker,
  DatetimePicker,
  Uploader,
  ImagePreview,
  Swipe,
  SwipeItem,
  Tab,
  Tabs,
  Sticky,
  Grid,
  GridItem,
  Card,
  Tag,
  Badge,
  Steps,
  Step,
  Divider,
  NoticeBar,
  CountDown,
  Progress,
  Circle,
  Rate,
  Slider,
  Stepper,
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Calendar,
  Cascader,
  DropdownMenu,
  DropdownItem,
  IndexBar,
  IndexAnchor,
  Sidebar,
  SidebarItem,
  TreeSelect,
  ContactCard,
  ContactList,
  ContactEdit,
  NumberKeyboard,
  PasswordInput,
  AddressEdit,
  AddressList,
  Area,
  Sku,
  BackTop,
  Lazyload,
  InfiniteScroll,
  Locale
} from 'vant'

// 引入 Vant 样式
import 'vant/lib/index.css'

// 移动端适配
import '@vant/touch-emulator'

// 创建 Vue 应用
const app = createApp(App)

// 注册 Vant 组件
app.use(Button)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Cell)
app.use(Icon)
app.use(NavBar)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Search)
app.use(List)
app.use(PullRefresh)
app.use(Empty)
app.use(Popup)
app.use(FloatingBubble)
app.use(Toast)
app.use(Dialog)
app.use(Loading)
app.use(Overlay)
app.use(ActionSheet)
app.use(Picker)
app.use(DatetimePicker)
app.use(Uploader)
app.use(ImagePreview)
app.use(Swipe)
app.use(SwipeItem)
app.use(Tab)
app.use(Tabs)
app.use(Sticky)
app.use(Grid)
app.use(GridItem)
app.use(Card)
app.use(Tag)
app.use(Badge)
app.use(Steps)
app.use(Step)
app.use(Divider)
app.use(NoticeBar)
app.use(CountDown)
app.use(Progress)
app.use(Circle)
app.use(Rate)
app.use(Slider)
app.use(Stepper)
app.use(Switch)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Radio)
app.use(RadioGroup)
app.use(Calendar)
app.use(Cascader)
app.use(DropdownMenu)
app.use(DropdownItem)
app.use(IndexBar)
app.use(IndexAnchor)
app.use(Sidebar)
app.use(SidebarItem)
app.use(TreeSelect)
app.use(ContactCard)
app.use(ContactList)
app.use(ContactEdit)
app.use(NumberKeyboard)
app.use(PasswordInput)
app.use(AddressEdit)
app.use(AddressList)
app.use(Area)
app.use(Sku)
app.use(BackTop)
app.use(Lazyload)
app.use(InfiniteScroll)

// 使用路由和状态管理
app.use(store)
app.use(router)

// 挂载应用
app.mount('#app')

// 全局错误处理
app.config.errorHandler = (error, instance, info) => {
  console.error('全局错误:', error)
  console.error('错误信息:', info)
  
  // 可以在这里上报错误到监控系统
  // errorReporter.report(error, instance, info)
}

// 全局警告处理
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('全局警告:', msg)
  console.warn('警告追踪:', trace)
}

// 设置 Vant 国际化
import zhCN from 'vant/es/locale/lang/zh-CN'
Locale.use('zh-CN', zhCN)

