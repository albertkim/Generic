import * as randomString from 'randomstring'

export const RandomNumberService = {

  getRandomString: function(length: number): string {
    return randomString.generate({
      length: length,
      charset: 'alphanumeric'
    })
  }

}
