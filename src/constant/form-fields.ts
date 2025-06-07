import { PERMISSION_LIST, MANIFESTATION_TYPE_LIST } from './form.js'

export const LOGIN_FORM_FIELDS = [
  {
    comType: 'input',
    fieldName: 'username',
    inputOriginType: 'text',
    placeholder: '请输入用户名',
    label: '登录帐号',
  },
  {
    comType: 'input',
    fieldName: 'password',
    inputOriginType: 'password',
    placeholder: '请输入密码',
  },
]

export const SIGNIN_FORM_FIELDS = [
  {
    comType: 'input',
    fieldName: 'username',
    inputOriginType: 'text',
    placeholder: '请输入用户名',
    label: '用户名',
  },
  {
    comType: 'input',
    fieldName: 'email',
    inputOriginType: 'text',
    placeholder: '请输入邮箱账号',
    label: '邮箱账号',
  },
  {
    comType: 'input',
    fieldName: 'password',
    inputOriginType: 'password',
    placeholder: '请输入密码',
    label: '密码',
  },
  {
    comType: 'input',
    fieldName: 'code',
    inputOriginType: 'code',
    placeholder: '请输入验证码',
    label: '验证码',
  },
]

export const OC_FORM_FIELDS = [
  {
    comType: 'upload',
    fieldName: 'coverUrl',
    limit: 1,
    label: '上传图片',
  },
  {
    comType: 'input',
    fieldName: 'name',
    inputOriginType: 'text',
    placeholder: '请输入角色名称',
    label: '角色名称',
  },
  {
    comType: 'textarea',
    fieldName: 'description',
    label: '介绍',
    placeholder: '请输入介绍',
  },
  {
    comType: 'textarea',
    fieldName: 'motto',
    label: '座右铭',
    placeholder: '请输入座右铭',
  },
  {
    comType: 'input',
    fieldName: 'ocUrl',
    inputOriginType: 'text',
    label: '角色网址*',
    placeholder: '请输入角色网址',
  },
  {
    comType: 'radio',
    fieldName: 'viewPermission',
    label: '高级权限',
    title: '允许展示范围',
    options: PERMISSION_LIST,
    optionsDec: '允许展示范围',
  },
  {
    comType: 'radio',
    fieldName: 'createPermission',
    title: '允许来自以下来源的同人扩链作品提交',
    options: PERMISSION_LIST,
    optionsDec: '允许来自以下来源的同人扩链作品提交',
  },
  {
    comType: 'switch',
    fieldName: 'isNsfw',
    label: '标记为敏感内容',
  },
  {
    comType: 'add-tag',
    fieldName: 'tags',
    label: '添加标签',
  },
]

export const AU_FORM_FIELDS = [...OC_FORM_FIELDS]

export const WORK_FORM_FIELDS = [
  {
    comType: 'upload',
    fieldName: 'coverUrl',
    limit: 1,
    label: '上传封面',
  },
  {
    fieldName: 'content',
    label: '上传作品',
    nestedFields: [
      {
        comType: 'radio',
        fieldName: 'manifestationType',
        label: '作品类型',
        title: '请选择作品类型',
        options: MANIFESTATION_TYPE_LIST,
        optionsDec: '请选择作品类型',
      },
      {
        comType: 'textarea',
        fieldName: 'description',
        label: '简介',
        placeholder: '请输入简介',
      },
      {
        comType: 'upload',
        fieldName: 'value',
        limit: 9,
        label: '作品上传',
      },
    ],
    nestedPath: 'content',
  },
  {
    comType: 'input',
    fieldName: 'name',
    inputOriginType: 'text',
    placeholder: '请输入标题名称',
    label: '标题名称',
  },
  {
    comType: 'add-tag',
    fieldName: 'tags',
    label: '添加标签',
  },
  {
    comType: 'input',
    inputOriginType: 'text',
    placeholder: '请输入卡片名称',
    fieldName: 'associationIds',
    label: '添加卡片',
  },
  {
    comType: 'switch',
    fieldName: 'isNsfw',
    label: '标记为敏感内容',
  },
]

export const GUA_SHI_FORM_FIELDS = [
  {
    comType: 'upload',
    fieldName: 'content',
    limit: 9,
    label: '作品上传',
  },
  {
    comType: 'input',
    fieldName: 'name',
    inputOriginType: 'text',
    placeholder: '请输入标题名称',
    label: '标题名称',
  },
  {
    comType: 'textarea',
    fieldName: 'description',
    label: '简介',
    placeholder: '请输入内容',
  },
  {
    comType: 'add-tag',
    fieldName: 'tags',
    label: '添加标签',
  },
  {
    comType: 'input',
    fieldName: 'card',
    inputOriginType: 'text',
    placeholder: '请输入卡片名称',
    label: '添加卡片',
  },
  {
    comType: 'radio',
    fieldName: 'viewPermission',
    label: '高级权限',
    title: '允许展示范围',
    options: PERMISSION_LIST,
    optionsDec: '允许展示范围',
  },
  {
    comType: 'switch',
    fieldName: 'isNsfw',
    label: '标记为敏感内容',
  },
]


export const FORM_FIELDS_MAP = {
  oc_form: OC_FORM_FIELDS,
  au_form: AU_FORM_FIELDS,
  login_form: LOGIN_FORM_FIELDS,
  signin_form: SIGNIN_FORM_FIELDS,
  work_form: WORK_FORM_FIELDS,
  guashi_form: GUA_SHI_FORM_FIELDS,
}
