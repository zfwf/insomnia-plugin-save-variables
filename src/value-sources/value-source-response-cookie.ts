import setCookie from 'set-cookie-parser';
import { RequestHookContext } from '../insomnia/types/request-hook-context'
import { ResponseHookContext } from '../insomnia/types/response-hook-context'
import { LogLevel, log } from '../logger/log'
import { ValueSource } from './value-source'

export const valueSourceResponseCookie: ValueSource = {
  type: 'responseCookie',
  displayName: 'Response Cookie',
  canBeExtracted: false,
  argumentName: 'Cookie Name',
  extract: async (
    argValue: string,
    _request: RequestHookContext,
    response: ResponseHookContext,
  ): Promise<string | null | undefined> => {
    const cookies = response.response.getHeader('set-cookie')

    if (cookies) {
      const parsedCookies = setCookie(cookies, { map:true })

      return parsedCookies[argValue]?.value;
    }
  },
}

