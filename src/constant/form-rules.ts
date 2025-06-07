import * as z from 'zod'
export const LOGIN_FORM_RULES = z.object({
  username: z.string().nonempty({ message: '请输入用户名' }),
  password: z.string().nonempty({ message: '请输入密码' }),
})

export const SIGNIN_FORM_RULES = z.object({
  username: z.string().nonempty({ message: '请输入用户名' }),
  email: z.string().email({ message: '请输入有效的邮箱账号' }),
  password: z.string().nonempty({ message: '请输入密码' }),
  code: z.string().nonempty({ message: '请输入验证码' }),
})

export const OC_FORM_RULES = z.object({
  coverUrl: z.array(z.object({
    url: z.string().nonempty({ message: '请上传图片' }),
    id: z.string().nonempty({ message: '请上传图片' }),
  })).nonempty({ message: '请上传图片' }),
  name: z.string().nonempty({ message: '请输入角色名称' }),
  motto: z.string().nonempty({ message: '请输入座右铭' }),
  description: z.string().nonempty({ message: '请输入介绍' }),
  ocUrl: z.string().nonempty({ message: '请输入角色网址' }),
  tags: z.array(z.object({
    desc: z.string().nonempty({ message: '请输入标签' }),
  })).nonempty({message: '请添加标签'}),
})

export const WORK_FORM_RULES = z.object({
  coverUrl: z.array(z.object({
    url: z.string().nonempty({ message: '请上传图片' }),
    id: z.string().nonempty({ message: '请上传图片' }),
  })).nonempty({ message: '请上传图片' }),
  name: z.string().nonempty({ message: '请输入标题名称' }),
  description: z.string().nonempty({ message: '请输入简介' }),
  tags: z.array(z.object({
    desc: z.string().nonempty({ message: '请输入标签' }),
  })).nonempty({message: '请添加标签'}),
  card: z.string().nonempty({ message: '请输入卡片' }),
  imageFileIds: z.array(z.object({
    url: z.string().nonempty({ message: '请上传图片' }),
    id: z.string().nonempty({ message: '请上传图片' }),
  })).nonempty({ message: '请上传图片' }),
})

export const GUA_SHI_FORM_RULES = z.object({
  imageFileIds: z.array(z.object({
    url: z.string().nonempty({ message: '请上传图片' }),
    id: z.string().nonempty({ message: '请上传图片' }),
  })).nonempty({ message: '请上传图片' }),
  name: z.string().nonempty({ message: '请输入标题名称' }),
  content: z.string().nonempty({ message: '请输入简介' }),
  tags: z.array(z.object({
    desc: z.string().nonempty({ message: '请输入标签' }),
  })).nonempty({message: '请添加标签'}),
  card: z.string().nonempty({ message: '请输入卡片' }),
})

export const FORM_RULES_MAP = {
  login_form: LOGIN_FORM_RULES,
  signin_form: SIGNIN_FORM_RULES,
  oc_form: OC_FORM_RULES,
  au_form: OC_FORM_RULES,
  work_form: WORK_FORM_RULES,
  guashi_form: GUA_SHI_FORM_RULES,
}
