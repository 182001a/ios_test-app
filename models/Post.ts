import Realm from 'realm'

export class Post extends Realm.Object<Post> {
  _id = new Realm.BSON.ObjectId()
  date!: string
  content!: string
  photos!: string[]
  location?: string

  static schema: Realm.ObjectSchema = {
    name: 'Post',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      date: 'string',
      content: 'string',
      photos: 'string[]',
      location: 'string?',
    },
  }
}

export type PostType = Realm.Object<Post> & Post 