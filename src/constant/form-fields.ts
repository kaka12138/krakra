import { PERMISSION_LIST } from './form.js'

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

export const OC_FORM_FIELDS = [
  {
    comType: 'upload',
    fieldName: 'coverFileId',
    limit: 1,
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
    radioList: PERMISSION_LIST,
  },
  {
    comType: 'radio',
    fieldName: 'createPermission',
    title: '允许来自以下来源的同人扩链作品提交',
    radioList: PERMISSION_LIST,
  },
  {
    comType: 'switch',
    fieldName: 'isNsfw',
    label: '标记为敏感内容',
  },
  {
    comType: 'add-label',
    fieldName: 'tags',
    label: '添加标签',
  },
]

export const AU_FORM_FIELDS = [...OC_FORM_FIELDS]



export const FORM_FIELDS_MAP = {
  oc_form: OC_FORM_FIELDS,
  au_form: AU_FORM_FIELDS,
  login_form: LOGIN_FORM_FIELDS,
}
