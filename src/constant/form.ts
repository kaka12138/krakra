export const PERMISSION_LIST = [
  {
    value: 1,
    desc1: '所有Krakra用户',
    desc2: '需要创建者验证',
  },
  {
    value: 2,
    desc1: '仅限 Krakra 优质创作者',
    desc2: '需要创建者验证',
  },
  {
    value: 3,
    desc1: '仅限 Krakra 已验证艺术家',
    desc2: '无需创建者验证',
  },
  {
    value: 4,
    desc1: '仅限创建者',
    desc2: '包含编辑者和管理员',
  },
]

export const MANIFESTATION_TYPE_LIST = [
  {
    value: 1,
    desc1: '插画',
    desc2: '图片类型',
  },
  {
    value: 2,
    desc1: '文字',
    desc2: '文字类型',
  },
]

export const LOGIN_FORM_INITIAL_VALUES = {
  username: '',
  password: '',
}
export const SIGNIN_FORM_INITIAL_VALUES = {
  username: '',
  email: '',
  password: '',
  code: '',
}

const BASE_FORM_INITIAL_VALUES = {
  coverUrl: [], // 封面
  name: '', // 名称
  description: '', // 介绍,描述
  tags: [], // 标签
}

export const OC_FORM_INITIAL_VALUES = Object.assign({}, BASE_FORM_INITIAL_VALUES, {
  motto: '', // 座右铭
  ocUrl: '', // 角色链接
  viewPermission: 1, // 浏览权限
  createPermission: 1, // 创作权限
  isNsfw: 0, // 0: 否 1: 是 (是否敏感)
  type: 1, // 1: oc 2: au
  isDerivative: 0, // 0: 否 1: 是 (是否二次创作)
})

export const AU_FORM_INITIAL_VALUES = Object.assign({}, OC_FORM_INITIAL_VALUES, {
  type: 2,
})

export const WORK_FORM_INITIAL_VALUES = Object.assign({}, BASE_FORM_INITIAL_VALUES, {
  content: {
    manifestationType: 1, // 1: 插画 2: 文字
    value: [],
  }, // 上传的作品图片
  isNsfw: 0, // 0: 否 1: 是 (是否敏感)
  isDerivative: 0, // 0: 否 1: 是 (是否二次创作)
  type: 0, // 0: 无 1: 原创 2: 同人
  category: 0, // 0: 普通 1: 角色（OC） 2: 世界观（AU）
  associationType: 2, // 0: 无 1: 世界观 2: 卡片
  tags: [],
})

export const GUA_SHI_FORM_INITIAL_VALUES = {
  name: '',
  content: '',
  card: '',
  tags: [],
  viewPermission: 1,
  isNsfw: 0,
  imageFileIds: [],
}


export const FORM_TITLE_MAP = {
  oc_form: '新角色',
  au_form: '新角色',
  work_form: '新作品',
  guashi_form: '呱市',
}

export const FORM_INITIAL_VALUES_MAP = {
  login_form: LOGIN_FORM_INITIAL_VALUES,
  signin_form: SIGNIN_FORM_INITIAL_VALUES,
  oc_form: OC_FORM_INITIAL_VALUES,
  au_form: AU_FORM_INITIAL_VALUES,
  work_form: WORK_FORM_INITIAL_VALUES,
  guashi_form: GUA_SHI_FORM_INITIAL_VALUES,
}
