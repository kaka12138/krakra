import { PERMISSION_LIST } from './form.js'
export const OC_FORM_FIELDS = [
  {
    comType: 'upload',
    prop: 'coverFileId',
    limit: 1,
  },
  {
    comType: 'input',
    prop: 'name',
    label: '角色名称',
  },
  {
    comType: 'textarea',
    prop: 'description',
    label: '介绍',
  },
  {
    comType: 'textarea',
    prop: 'motto',
    label: '座右铭',
  },
  {
    comType: 'input',
    prop: 'ocUrl',
    label: '角色网址*',
  },
  {
    comType: 'radio',
    prop: 'viewPermission',
    label: '高级权限',
    title: '允许展示范围',
    radioList: PERMISSION_LIST,
  },
  {
    comType: 'radio',
    prop: 'createPermission',
    title: '允许来自以下来源的同人扩链作品提交',
    radioList: PERMISSION_LIST,
  },
  {
    comType: 'switch',
    prop: 'isNsfw',
    label: '标记为敏感内容',
  },
  {
    comType: 'add-label',
    prop: 'tags',
    label: '添加标签',
  },
]

export const AU_FORM_FIELDS = [
  {
    comType: 'upload',
    prop: 'imageFileIds',
    limit: 10,
  },
  {
    comType: 'input',
    prop: 'name',
    label: '标题名称',
  },
  {
    comType: 'textarea',
    prop: 'description',
    label: '简介',
  },
  {
    comType: 'add-label',
    prop: 'tags',
    label: '添加标签',
  },
  {
    comType: 'radio',
    prop: 'viewPermission',
    label: '高级权限',
    title: '允许展示范围',
    radioList: PERMISSION_LIST,
  },
  {
    comType: 'radio',
    prop: 'createPermission',
    title: '允许来自以下来源的同人扩链作品提交',
    radioList: PERMISSION_LIST,
  },
  {
    comType: 'switch',
    prop: 'isNsfw',
    label: '标记为敏感内容',
  },
]


export const LOGIN_FORM_FIELDS = [
  {
    comType: 'input',
    fieldName: 'email',
    inputOriginType: 'text',
    placeholder: '请输入邮箱账号',
  },
  {
    comType: 'input',
    fieldName: 'password',
    inputOriginType: 'password',
    placeholder: '请输入密码',
  },
]

export const FORM_FIELDS_MAP = {
  oc_form: OC_FORM_FIELDS,
  au_form: AU_FORM_FIELDS,
  login_form: LOGIN_FORM_FIELDS,
}
