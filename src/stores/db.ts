import { type MediaModel } from '@/models/media.model';
import Dexie, { type EntityTable } from 'dexie';

const db = new Dexie('mediasDatabase') as Dexie & {
  medias: EntityTable<
    MediaModel,
    'id'
  >;
};

db.version(1).stores({
  medias: '++id,title,url,extract,user,tags,categ,action,score,thumbnail,image,description,tagstring,like,attributes,key,createdAt,updatedAt, status'
});

export { db };