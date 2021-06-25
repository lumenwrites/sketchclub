import { stringArg, extendType } from 'nexus'
import { Context } from '../apollo/context'

import slugify from 'slugify'
import cuid from 'cuid'

import AWS from 'aws-sdk'
const { AWS_ACCESS_KEY, AWS_SECRET, BUCKET_NAME } = process.env
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
})

async function getSignedUrl(filepath:String, filetype:String) {
  return new Promise((resolve, reject) => {
    var params = { Bucket: BUCKET_NAME, Key: filepath, ContentType: filetype }
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) reject(err)
      resolve(url) // return the presigned url
    })
  })
}

export const ImageQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('getPresignedUrl', {
      type: 'PresignedUrl',
      args: {
        filename: stringArg(),
        extension: stringArg(),
        filetype: stringArg(),
      },
      resolve: async (_parent, args, context: Context) => {
        const username = 'testusername'
        const filename = `${slugify(args.filename)}-${cuid()}.${args.extension}`
        const filepath = `${username}/images/${filename}` //username/images/filename.jpg
        const url = await getSignedUrl(filepath, args.filetype)
        console.log('Get presigned url for file', url)
        return { url, filepath }
      },
    })
  }
})


