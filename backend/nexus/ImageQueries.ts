// @ts-nocheck
import { stringArg, extendType } from 'nexus'
import { Context } from '../apollo/context'

import slugify from 'slugify'
import cuid from 'cuid'

import { getUserId } from './shield'

import AWS from 'aws-sdk'
const { AWS_ACCESS_KEY, AWS_SECRET, BUCKET_NAME } = process.env
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET,
})

async function getSignedUrl(filepath: String, filetype: String) {
  return new Promise((resolve, reject) => {
    var params = { Bucket: BUCKET_NAME, Key: filepath, ContentType: filetype }
    s3.getSignedUrl('putObject', params, (err, url) => {
      if (err) reject(err)
      resolve(url) // return the presigned url
    })
  })
}

function processFilename(filename) {
  var lines = filename.split(".");   // split all lines into array
  var extension = lines.pop();   // read and remove extension
  var name = lines.join(".");     // re-join the remaining lines
  return [name, extension]
}

export const ImageQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('getPresignedUrl', {
      type: 'PresignedUrl',
      args: {
        filename: stringArg(),
        filetype: stringArg(),
      },
      resolve: async (_parent, args, context: Context) => {
        const user = await context.prisma.user.findUnique({
          where: { id: getUserId(context) }
        })
        const [name, extension] = processFilename(args.filename)
        const filename = `${slugify(name)}-${cuid()}.${extension}`
        const filepath = `${user.username}/images/${filename}` //username/images/filename.jpg
        const url = await getSignedUrl(filepath, args.filetype)
        console.log('Get presigned url for file', url)
        return { url, filepath }
      },
    })
  }
})


