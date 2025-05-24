import * as z from 'zod'
export const LOGIN_FORM_RULES = z.object({
  email: z.string().email({ message: '请输入有效的邮箱账号' }),
  password: z.string().nonempty({ message: '请输入密码' }),
})

export const FORM_RULES_MAP = {
  login_form: LOGIN_FORM_RULES,
}
