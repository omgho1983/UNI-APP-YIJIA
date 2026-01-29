// yijia-base 项目常量定义
import { Institution } from '@/types/yijia'

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: '1',
    name: '泰康之家·燕园',
    brandName: '泰康之家',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
    priceRange: [8000, 25000],
    location: '北京市昌平区科技园区',
    distance: '3.5km',
    rating: 4.9,
    tags: ['全托', '社保', '长护险', '医养结合', 'CCRC社区'],
    careTypes: ['自理', '介助', '介护'],
    features: ['24h呼叫', '智能床位', '适老化家具'],
    description: '泰康之家·燕园位于北京昌平新城核心区，是国内首家大规模、全功能、医养结合、候鸟连锁的中高端养老社区。',
    isVR: true,
    isLive: true
  },
  {
    id: '2',
    name: '远洋·椿萱茂（亦庄）',
    brandName: '椿萱茂',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    priceRange: [12000, 30000],
    location: '北京市大兴区亦庄开发区',
    distance: '12km',
    rating: 4.7,
    tags: ['全托', '长护险', '认知症护理', '美式养老'],
    careTypes: ['介护', '认知症专项'],
    features: ['防滑地砖', '圆角家具', '专业社工'],
    description: '椿萱茂致力于为长辈提供"高品质养老服务"，引入美式先进养老理念，特别是在失智照护领域处于国内领先地位。',
    isVR: true,
    isLive: false
  },
  {
    id: '3',
    name: '万科·随园（房山）',
    brandName: '万科随园',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    priceRange: [7000, 15000],
    location: '北京市房山区良乡',
    distance: '25km',
    rating: 4.8,
    tags: ['半托', '社保', '社区化养老', '大型绿化'],
    careTypes: ['自理', '介助'],
    features: ['厨卫齐全', '共享客厅', '紧急拉绳'],
    description: '万科旗下高品质康养社区，环境优美，配套齐全，倡导"邻里式"养老，让长辈在自然中安享晚年。',
    isVR: false,
    isLive: true
  }
]

export const PRIMARY_COLOR = '#3072F6' // Beike Blue
