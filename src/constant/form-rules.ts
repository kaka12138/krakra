import * as z from 'zod'
export const LOGIN_FORM_RULES = z.object({
  email: z.string().email({ message: '请输入有效的邮箱账号' }),
  password: z.string().nonempty({ message: '请输入密码' }),
})


export const OC_FORM_RULES = z.object({
  coverFileId: z.string().nonempty({ message: '请上传头像' }),
  name: z.string().nonempty({ message: '请输入角色名称' }),
  motto: z.string().nonempty({ message: '请输入座右铭' }),
  description: z.string().nonempty({ message: '请输入介绍' }),
  ocUrl: z.string().nonempty({ message: '请输入角色网址' }),
  tags: z.array(z.object({
    desc: z.string().nonempty({ message: '请输入标签' }),
  })).nonempty({message: '请添加标签'}),
})

export const FORM_RULES_MAP = {
  login_form: LOGIN_FORM_RULES,
  oc_form: OC_FORM_RULES,
  au_form: OC_FORM_RULES,
}
